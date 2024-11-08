import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RandomService {
	uuid() {
		return randomUUID();
	}
}
