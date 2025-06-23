import { useSession } from "next-auth/react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useUploadImage = () => {
  const { data: session } = useSession();

  const uploadImage = async (
    selectedImage: File,
    resource: "group" | "event"
  ) => {
    const accessToken = session?.accessToken;

    if (!accessToken) {
      toast.error("Erro ao autenticar usuário");
      return;
    }

    if (!selectedImage) return;

    try {
      // Solicita a URL presignada para o upload da imagem
      const presignRes = await fetch(`${API_URL}/${resource}/upload-url`, {
        method: "POST",
        body: JSON.stringify({ fileType: selectedImage.type }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { uploadUrl, fileUrl } = await presignRes.json();

      // Faz o upload da imagem para o S3 usando a URL presignada
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: selectedImage,
        headers: { "Content-Type": selectedImage.type },
      });

      if (!uploadRes.ok) {
        toast.error("Erro ao enviar imagem");
        return;
      }

      return fileUrl; // Retorna a URL do arquivo após o upload
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar o upload da imagem");
    }
  };

  return { uploadImage };
};
