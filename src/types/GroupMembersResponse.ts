import { z } from "zod";
import { MemberSchema } from "./index";

export const groupMembersResponseSchema = z.object({
  isClosed: z.boolean(),
  active: z.array(MemberSchema),
  pending: z.array(MemberSchema),
});

export type GroupMembersResponse = z.infer<typeof groupMembersResponseSchema>;
