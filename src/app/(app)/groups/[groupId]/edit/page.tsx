"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { ImageInput } from "@/components/ImageInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useGetGroup } from "@/hooks/useGetGroup";
import { useUploadImage } from "@/hooks/useUploadImage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const schema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function EditGroupForm() {
  const { data: session } = useSession();
  const params = useParams();
  const { uploadImage } = useUploadImage();
  const groupId = params.groupId;
  const router = useRouter();
  const { group, isLoading } = useGetGroup(groupId as string);

  const [loadingChange, setLoadingChange] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: group?.name || "",
      description: group?.description || "",
      imageUrl: group?.imageUrl || "",
    },
  });

  useEffect(() => {
    if (group) {
      form.reset({
        name: group.name || "",
        description: group.description || "",
        imageUrl: group.imageUrl || "",
      });
    }
  }, [group, form]);

  const onSubmit = async (data: FormValues) => {
    setLoadingChange(true);

    let imageUrl = data.imageUrl;
    const accessToken = session?.accessToken;

    try {
      if (!accessToken) {
        toast.error("Erro ao editar o grupo");
        return;
      }

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage, "group");
      }

      const response = await fetch(`${API_URL}/groups/${groupId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...data,
          imageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao editar o grupo");

      toast.success("Grupo atualizado com sucesso!");
      router.push(`/groups/${groupId}/events`);
    } catch (err) {
      toast.error("Erro ao editar o grupo");
      console.error(err);
    } finally {
      setLoadingChange(false);
    }
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Editar grupo</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-md"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={() => (
              <FormItem>
                <ImageInput
                  onUpload={(file) => setSelectedImage(file)}
                  initialUrl={group?.imageUrl}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do grupo</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <Textarea {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loadingChange ? "Alterando..." : "Salvar alterações"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
