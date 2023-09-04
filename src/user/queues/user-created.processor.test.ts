import { Job } from "bull";
import { PinoLogger } from "nestjs-pino";
import { UserCreatedEvent } from "../events";
import { User } from "../user.entity";
import { UserCreatedProcessor } from "./user-created.processor";

describe(UserCreatedProcessor, () => {
	let processor: UserCreatedProcessor;
	const logger = { setContext: jest.fn(), info: jest.fn() };
	const event = new UserCreatedEvent("UserCreatedQueueTest", new User("test"));

	beforeEach(() => {
		processor = new UserCreatedProcessor(logger as unknown as PinoLogger);
		jest.clearAllMocks();
	});

	it("logs user created", () => {
		processor.update({ data: event } as Job<UserCreatedEvent>);

		expect(logger.info).toHaveBeenCalledWith(
			event,
			expect.stringContaining("user created"),
		);
	});
});
