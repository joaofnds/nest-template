import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "user" })
export class User {
	@PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
	id: string;

	@Property()
	name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}
