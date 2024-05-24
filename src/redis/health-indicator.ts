import { Inject, Injectable } from "@nestjs/common";
import {
	HealthCheckError,
	HealthIndicator,
	HealthIndicatorResult,
} from "@nestjs/terminus";
import { Redis } from "ioredis";

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
	constructor(private readonly redis: Redis) {
		super();
	}

	async check(key: string): Promise<HealthIndicatorResult> {
		try {
			await this.redis.ping();
			return this.getStatus(key, true);
		} catch (error) {
			throw new HealthCheckError(
				`${RedisHealthIndicator.name} failed`,
				this.getStatus(key, false, error),
			);
		}
	}
}
