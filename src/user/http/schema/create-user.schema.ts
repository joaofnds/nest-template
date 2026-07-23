import { z } from "zod";

export const CreateUserSchema = z.object({
	name: z.string().min(3),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;
