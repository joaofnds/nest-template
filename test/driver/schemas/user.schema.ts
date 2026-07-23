import { z } from "zod";

export const UserResponseSchema = z.object({
	id: z.uuid(),
	name: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const UserListResponseSchema = z.array(UserResponseSchema);
