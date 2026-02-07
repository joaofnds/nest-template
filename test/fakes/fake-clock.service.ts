import { ClockService } from "src/lib/clock/clock.service";

export class FakeClockService implements ClockService {
	constructor(private date: Date) {}

	now(): Date {
		return this.date;
	}
}
