import { defineEntity } from "@mikro-orm/core";
import { User } from "../user";

export const UserSchema = defineEntity({
	class: User,
	tableName: "user",
	properties: (p) => ({
		id: p.uuid().primary().defaultRaw("uuid_generate_v4()"),
		name: p.string(),
	}),
});
