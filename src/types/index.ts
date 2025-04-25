import { z } from "zod";

const UserSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url().optional(),
  role: z.enum(["admin", "participant"]),
});

const EventSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  description: z.string(),
  date: z.string().datetime(),
  location: z.string(),
  imageUrl: z.string().url().optional(),
});

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url().optional(),
  membersCount: z.number().optional(),
  role: z.enum(["admin", "participant"]).optional(),
  type: z.enum(["open", "closed"]),
  isMember: z.boolean().optional(),
  members: z.array(UserSchema).optional(),
  events: z.array(EventSchema).optional(),
});

export type Group = z.infer<typeof GroupSchema>;
