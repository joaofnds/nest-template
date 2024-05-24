import { randomUUID } from "node:crypto";
import { Job } from "bull";
import { PinoLogger } from "nestjs-pino";
import { UserCreatedEvent } from "../events/user-created.event";
import { User } from "../user";
import { UserCreatedWorker } from "./user-created.worker";

describe(UserCreatedWorker, () => {
	let processor: UserCreatedWorker;
	const logger = { setContext: jest.fn(), info: jest.fn() };
	const event = new UserCreatedEvent(
		"UserCreatedQueueTest",
		new User(randomUUID(), "test"),
	);

	beforeEach(() => {
		processor = new UserCreatedWorker(logger as unknown as PinoLogger);
		jest.clearAllMocks();
	});

	it("logs user created", () => {
		processor.process({ data: event } as Job<UserCreatedEvent>);

		expect(logger.info).toHaveBeenCalledWith(
			event,
			expect.stringContaining("user created"),
		);
	});
});
