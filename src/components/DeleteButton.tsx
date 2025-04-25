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
import { useDeleteGroup } from "@/hooks/useDeleteGroup";
import { Trash } from "lucide-react";

type Props = {
  groupId: string;
  className?: string;
};

export const DeleteGroupButton = ({ groupId, className }: Props) => {
  const [open, setOpen] = useState(false);
  const { deleteGroup, isDeleting } = useDeleteGroup();

  const handleConfirmDelete = async () => {
    try {
      await deleteGroup(groupId);
      setOpen(false); // Fecha o modal após sucesso
    } catch {
      // Toast de erro já tratado no hook
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={className} size="sm" variant="destructive">
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir o grupo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente o
            grupo e todos os dados relacionados.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={handleConfirmDelete}
            className="variant-destructive"
          >
            {isDeleting ? "Deletando..." : "Confirmar exclusão"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
