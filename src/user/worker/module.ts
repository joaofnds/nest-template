import { Module } from "@nestjs/common";
import { UserModule } from "../user.module";
import { UserCreatedWorker } from "./user-created.worker";

@Module({
	imports: [UserModule],
	providers: [UserCreatedWorker],
})
export class UserWorkerModule {}
