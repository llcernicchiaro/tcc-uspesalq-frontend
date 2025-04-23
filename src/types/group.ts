import { z } from "zod";

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url().optional(),
  membersCount: z.number().optional(),
  role: z.enum(["admin", "member"]).optional(),
  type: z.enum(["open", "closed"]),
});

export type Group = z.infer<typeof GroupSchema>;
