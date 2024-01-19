import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Expose, instanceToPlain, plainToInstance } from "class-transformer";

@Entity({ tableName: "user" })
export class User {
	@PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
	@Expose()
	id!: string;

	@Property()
	@Expose()
	name!: string;

	constructor(name: string) {
		this.name = name;
	}

	static fromString(userString: string): User {
		return User.fromPlain(JSON.parse(userString));
	}

	toPlain() {
		return instanceToPlain(this, { excludeExtraneousValues: true });
	}

	static fromPlain(plain: Record<string, unknown>): User {
		return plainToInstance(User, plain, { excludeExtraneousValues: true });
	}

	toString(): string {
		return JSON.stringify(this.toPlain());
	}
}
