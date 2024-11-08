import { z } from "zod";

export const PokemonSchema = z.object({
	id: z.number().positive(),
	name: z.string().min(1),
	is_default: z.boolean(),
	height: z.number().positive(),
	weight: z.number().positive(),
});
