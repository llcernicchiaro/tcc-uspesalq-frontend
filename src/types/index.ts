import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url().optional(),
  role: z.enum(["admin", "participant"]),
});

export const MemberSchema = UserSchema.extend({
  memberSince: z.string().datetime(),
});

export const EventSchema = z.object({
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
  status: z.enum(["active", "pending", "inactive"]).optional(),
});

export const GroupMembershipSchema = z.object({
  id: z.string(),
  userId: z.string(),
  groupId: z.string(),
  status: z.enum(["active", "pending", "inactive"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type GroupMembership = z.infer<typeof GroupMembershipSchema>;
export type Group = z.infer<typeof GroupSchema>;
export type User = z.infer<typeof UserSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Member = z.infer<typeof MemberSchema>;
