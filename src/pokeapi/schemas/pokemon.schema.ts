import { z } from "zod";

export const pokemonSchema = z.object({
	id: z.number().positive(),
	name: z.string().min(1),
	is_default: z.boolean(),
	height: z.number().positive(),
	weight: z.number().positive(),
});
