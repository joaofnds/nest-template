import { randomUUID } from "node:crypto";
import { INestApplication } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { Effect, pipe } from "effect";
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
		it.effect("emits user.created event", function* () {
			const events: unknown[] = [];
			emitter.once(UserCreatedEvent.EventName, (event) => events.push(event));

			const user = yield* service.create("joao");

			expect(events).toEqual([new UserCreatedEvent(UserService.name, user)]);
		});
	});

	describe("find", () => {
		it.effect("returns the user", function* () {
			const user = yield* service.create("joao");
			const found = yield* service.find(user.id);
			expect(found).toEqual(user);
		});

		describe("when not found", () => {
			it.effect("throws user not found", function* () {
				const id = randomUUID();

				const result = yield* Effect.merge(service.find(id));

				expect(result).toEqual(new UserNotFoundError(id));
			});
		});
	});

	describe("all", () => {
		describe("when db is empty", () => {
			it.effect("returns an empty array", function* () {
				expect(yield* service.all()).toHaveLength(0);
			});
		});

		it.effect("lists all users", function* () {
			const user = yield* service.create("joao");
			expect(yield* service.all()).toEqual([user]);
		});
	});
});
