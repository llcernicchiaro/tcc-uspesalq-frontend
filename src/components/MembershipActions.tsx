import { Button } from "@/components/ui/button";
import { useUpdateMembership } from "@/hooks/useUpdateMembership";

type Props = {
  groupId: string;
  userId: string;
  currentRole?: "admin" | "participant"; // Apenas para membros ativos
  variant: "pending" | "active";
};

export const MembershipActions = ({
  groupId,
  userId,
  currentRole,
  variant,
}: Props) => {
  const { updateMembership, isUpdating } = useUpdateMembership();

  if (variant === "pending") {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={isUpdating}
          onClick={() =>
            updateMembership({ groupId, userId, status: "active" })
          }
        >
          Aceitar
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={isUpdating}
          onClick={() =>
            updateMembership({ groupId, userId, status: "inactive" })
          }
        >
          Recusar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {currentRole === "participant" ? (
        <Button
          size="sm"
          variant="outline"
          disabled={isUpdating}
          onClick={() => updateMembership({ groupId, userId, role: "admin" })}
        >
          Tornar Admin
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          disabled={isUpdating}
          onClick={() => updateMembership({ groupId, userId, role: "participant" })}
        >
          Remover Admin
        </Button>
      )}
      <Button
        size="sm"
        variant="destructive"
        disabled={isUpdating}
        onClick={() =>
          updateMembership({ groupId, userId, status: "inactive" })
        }
      >
        Remover do grupo
      </Button>
    </div>
  );
};
