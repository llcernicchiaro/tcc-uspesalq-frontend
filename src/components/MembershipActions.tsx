import { Button } from "@/components/ui/button";
import { useUpdateMembership } from "@/hooks/useUpdateMembership";
import { ShieldCheck, UserMinus, UserPlus, Shield } from "lucide-react";

type Props = {
  groupId: string;
  userId: string;
  currentRole: "participant" | "admin";
  variant: "pending" | "active";
};

export const MembershipActions = ({
  groupId,
  userId,
  currentRole,
  variant,
}: Props) => {
  const { updateMembership, isUpdating } = useUpdateMembership();

  const handleAccept = () =>
    updateMembership({ groupId, userId, status: "active" });

  const handleRejectOrRemove = () =>
    updateMembership({ groupId, userId, status: "inactive" });

  const handleMakeAdmin = () =>
    updateMembership({ groupId, userId, role: "admin" });

  const handleMakeMember = () =>
    updateMembership({ groupId, userId, role: "participant" });

  return (
    <div className="flex gap-2">
      {variant === "pending" ? (
        <>
          <Button
            className="bg-green-600"
            size="icon"
            onClick={handleAccept}
            disabled={isUpdating}
          >
            <UserPlus className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRejectOrRemove}
            disabled={isUpdating}
          >
            <UserMinus className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          {currentRole === "participant" ? (
            <Button
              variant="default"
              size="icon"
              onClick={handleMakeAdmin}
              disabled={isUpdating}
            >
              <Shield className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="destructive"
              size="icon"
              onClick={handleMakeMember}
              disabled={isUpdating}
            >
              <ShieldCheck className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRejectOrRemove}
            disabled={isUpdating}
          >
            <UserMinus className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};
