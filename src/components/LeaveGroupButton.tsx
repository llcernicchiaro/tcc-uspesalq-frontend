"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";
import { useLeaveGroup } from "@/hooks/useLeaveGroup";

type Props = {
  groupId: string;
};

export const LeaveGroupButton = ({ groupId }: Props) => {
  const [open, setOpen] = useState(false);
  const { leaveGroup, isLeaving } = useLeaveGroup();

  const handleConfirmLeave = async () => {
    try {
      await leaveGroup(groupId);
      setOpen(false); // Fecha o modal após sucesso
    } catch {
      // Toast de erro já tratado no hook
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <LogOut />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja sair do grupo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Você só pode participar dos eventos do grupo se for um membro.
            <br />
            Mas não se preocupe, você pode entrar novamente a qualquer momento.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLeaving}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLeaving}
            onClick={handleConfirmLeave}
            className="variant-destructive"
          >
            {isLeaving ? "Saindo..." : "Confirmar saída"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
