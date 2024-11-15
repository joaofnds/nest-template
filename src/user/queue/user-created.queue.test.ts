import { randomUUID } from "node:crypto";
import { Queue } from "bullmq";
import { UserCreatedEvent } from "../events/user-created.event";
import { User } from "../user";
import { UserCreatedQueue } from "./user-created.queue";

describe(UserCreatedQueue, () => {
	let queue: UserCreatedQueue;
	const bullQueue = { add: jest.fn() };
	const event = new UserCreatedEvent(
		"UserCreatedQueueTest",
		new User(randomUUID(), "test"),
	);

	beforeAll(async () => {
		queue = new UserCreatedQueue(
			bullQueue as unknown as Queue<UserCreatedEvent>,
		);
	});

	beforeEach(() => jest.clearAllMocks());

	it("enqueues a job with the event", async () => {
		await queue.schedule(event);

		expect(bullQueue.add).toHaveBeenCalledWith(
			"user.created",
			event,
			expect.anything(),
		);
	});

	it.each([
		{ name: "sets job id to user id", spec: { jobId: event.user.id } },
		{ name: "sets attempts to 5", spec: { attempts: 5 } },
		{ name: "removes the job on complete", spec: { removeOnComplete: true } },
		{
			name: "configures backoff",
			spec: { backoff: { type: "fixed", delay: 5000 } },
		},
	])("$name", async ({ spec }) => {
		await queue.schedule(event);

		expect(bullQueue.add).toHaveBeenCalledWith(
			"user.created",
			expect.any(UserCreatedEvent),
			expect.objectContaining(spec),
		);
	});
});
