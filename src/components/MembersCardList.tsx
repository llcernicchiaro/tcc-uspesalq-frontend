import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MembershipActions } from "./MembershipActions";
import { Member } from "@/types";

type Props = {
  members: Member[];
  groupId: string;
  variant: "pending" | "active";
};

export const MembersCardList = ({ members, groupId, variant }: Props) => {
  if (members.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {variant === "pending"
          ? "Nenhuma inscrição pendente."
          : "Nenhum membro ativo no grupo."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <Card key={member.id}>
          <CardContent className="flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.picture} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">{member.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {variant === "active" ? "entrou em: " : "solicitou em: "}
                  {new Date(member.memberSince).toLocaleDateString("pt-BR")}
                </p>
                {variant === "active" && (
                  <p className="text-xs text-muted-foreground">
                    cargo: {member.role}
                  </p>
                )}
              </div>
            </div>

            <MembershipActions
              groupId={groupId}
              userId={member.id}
              currentRole={member.role}
              variant={variant}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
