import { randomUUID } from "node:crypto";
import { INestApplication } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { DBCleaner } from "test/db-cleaner";
import { NotFoundError as UserNotFoundError } from "./errors/not-found.error";
import { UserCreatedEvent } from "./events/user-created.event";
import { UserService } from "./user.service";

describe(UserService, () => {
	let app: INestApplication;
	let service: UserService;
	let emitter: EventEmitter2;
	let cleaner: DBCleaner;

	beforeAll(async () => {
		const appModule: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = appModule.createNestApplication();

		service = app.get(UserService);
		emitter = app.get(EventEmitter2);
		cleaner = DBCleaner.for(app);

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		await cleaner.clean();
	});

	describe("create", () => {
		it("emits user.created event", async () => {
			const events: unknown[] = [];
			emitter.once(UserCreatedEvent.EventName, (event) => events.push(event));

			const user = await service.create("joao");

			expect(events).toEqual([new UserCreatedEvent(UserService.name, user)]);
		});
	});

	describe("find", () => {
		it("returns the user", async () => {
			const user = await service.create("joao");
			const found = await service.find(user.id);
			expect(found).toEqual(user);
		});

		describe("when not found", () => {
			it("throws user not found", async () => {
				const id = randomUUID();

				await expect(service.find(id)).rejects.toEqual(
					new UserNotFoundError(id),
				);
			});
		});
	});

	describe("all", () => {
		describe("when db is empty", () => {
			it("returns an empty array", async () => {
				await expect(service.all()).resolves.toHaveLength(0);
			});
		});

		it("lists all users", async () => {
			const user = await service.create("joao");
			await expect(service.all()).resolves.toEqual([user]);
		});
	});
});
