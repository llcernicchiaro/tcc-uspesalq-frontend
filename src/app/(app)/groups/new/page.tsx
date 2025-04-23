"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ImageUpload } from "@/components/ImageInput";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const groupSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  type: z.enum(["open", "closed"]),
  imageUrl: z.string().optional(),
});

type GroupFormData = z.infer<typeof groupSchema>;

export default function CreateGroupPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      type: "open",
    },
  });

  const selectedType = watch("type");

  const handleImage = async (selectedImage: File) => {
    const accessToken = session?.accessToken;

    if (!accessToken) {
      toast.error("Erro ao criar grupo");
      return;
    }

    if (!selectedImage) return;

    const presignRes = await fetch(`${API_URL}/groups/upload-url`, {
      method: "POST",
      body: JSON.stringify({ fileType: selectedImage.type }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { uploadUrl, fileUrl } = await presignRes.json();

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      body: selectedImage,
      headers: { "Content-Type": selectedImage.type },
    });

    if (!uploadRes.ok) throw new Error("Erro ao enviar imagem");

    return fileUrl;
  };

  const onSubmit = async (data: GroupFormData) => {
    setLoading(true);

    const accessToken = session?.accessToken;

    if (!accessToken) {
      setLoading(false);
      toast.error("Erro ao criar grupo");
      return;
    }

    try {
      let imageUrl: string | undefined = undefined;

      if (selectedImage) {
        imageUrl = await handleImage(selectedImage);
      }

      const res = await fetch(`${API_URL}/group`, {
        method: "POST",
        body: JSON.stringify({ ...data, imageUrl }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao criar grupo");

      const { id } = await res.json();
      toast.success("Grupo criado com sucesso!");
      router.push(`/groups/${id}`);
    } catch (err) {
      toast.error("Erro ao criar grupo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/groups">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <h1 className="text-xl font-semibold">Criar novo grupo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ImageUpload onUpload={(file) => setSelectedImage(file)} />

        <div className="space-y-2">
          <Label htmlFor="name">Nome do grupo</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        <div className="space-y-2">
          <Label>Tipo de grupo</Label>
          <RadioGroup
            value={selectedType}
            onValueChange={(value) => setValue("type", value as "open" | "closed")}
            defaultValue="open"
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="open" id="open" />
              <Label htmlFor="open">Aberto</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="closed" id="closed" />
              <Label htmlFor="closed">Fechado</Label>
            </div>
          </RadioGroup>
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar grupo"}
        </Button>
      </form>
    </div>
  );
}
