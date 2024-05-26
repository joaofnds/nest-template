import { randomUUID } from "node:crypto";
import { INestApplication } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { Exit } from "effect";
import { runPromise, runPromiseExit } from "effect/Effect";
import { AppModule } from "src/app.module";
import { DBCleaner } from "test/db-cleaner";
import { waitFor } from "test/wait-for";
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
			const event = waitFor(emitter, UserCreatedEvent.EventName);

			const user = await runPromise(service.create("joao"));

			await expect(event).resolves.toEqual(
				new UserCreatedEvent(UserService.name, user),
			);
		});
	});

	describe("find", () => {
		it("returns the user", async () => {
			const user = await runPromise(service.create("joao"));
			const found = await runPromise(service.find(user.id));
			expect(found).toEqual(user);
		});

		describe("when not found", () => {
			it("throws user not found", () => {
				const id = randomUUID();
				return expect(runPromiseExit(service.find(id))).resolves.toEqual(
					Exit.fail(new UserNotFoundError(id)),
				);
			});
		});
	});

	describe("all", () => {
		describe("when db is empty", () => {
			it("returns an empty array", () => {
				return expect(runPromise(service.all())).resolves.toHaveLength(0);
			});
		});

		it("lists all users", async () => {
			const user = await runPromise(service.create("joao"));
			await expect(runPromise(service.all())).resolves.toEqual([user]);
		});
	});
});
