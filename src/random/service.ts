import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { Effect } from "effect";

@Injectable()
export class RandomService {
	uuid() {
		return Effect.sync(() => randomUUID());
	}
}
