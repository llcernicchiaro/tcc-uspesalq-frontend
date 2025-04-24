import { z } from "zod";

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url().optional(),
  membersCount: z.number().optional(),
  role: z.enum(["admin", "member"]).optional(),
  type: z.enum(["open", "closed"]),
  isMember: z.boolean().optional(),
  members: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        imageUrl: z.string().url().optional(),
        role: z.enum(["admin", "member"]),
      })
    )
    .optional(),
  events: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        date: z.string().datetime(),
        location: z.string(),
        imageUrl: z.string().url().optional(),
      })
    )
    .optional(),
});

export type Group = z.infer<typeof GroupSchema>;
