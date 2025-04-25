import { Member } from "@/types/index";
import { MembershipActions } from "./MembershipActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  members: Member[];
  groupId: string;
  variant: "pending" | "active";
};

export const GroupMembersTable = ({ members, groupId, variant }: Props) => {
  if (members.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {variant === "pending"
          ? "Nenhuma inscrição pendente."
          : "Nenhum membro no grupo."}
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuário</TableHead>
          {variant === "pending" ? (
            <TableHead>Data de solicitação</TableHead>
          ) : (
            <>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Desde</TableHead>
            </>
          )}
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.userId}>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={member.picture} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              {member.name}
            </TableCell>

            {variant === "pending" ? (
              <TableCell>
                {new Date(member.memberSince).toLocaleDateString()}
              </TableCell>
            ) : (
              <>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  {new Date(member.memberSince).toLocaleDateString()}
                </TableCell>
              </>
            )}

            <TableCell>
              <MembershipActions
                groupId={groupId}
                userId={member.userId}
                currentRole={member.role}
                variant={variant}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
