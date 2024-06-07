import { Schema } from "@effect/schema";

export const PokemonSchema = Schema.Struct({
	id: Schema.Number.pipe(Schema.positive()),
	name: Schema.String.pipe(Schema.nonEmpty()),
	is_default: Schema.Boolean,
	height: Schema.Number.pipe(Schema.positive()),
	weight: Schema.Number.pipe(Schema.positive()),
});
