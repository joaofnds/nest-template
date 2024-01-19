import { Module } from "@nestjs/common";
import { makeCounterProvider } from "@willsoto/nestjs-prometheus";
import { MetricsUserListener } from "./listener";
import { UserMetric } from "./metrics.enum";

@Module({
	providers: [
		makeCounterProvider({
			name: UserMetric.UsersCreatedTotal,
			help: "count of users created",
		}),

		MetricsUserListener,
	],
})
export class UserMetricsModule {}
