"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  onUpload: (file: File, previewUrl: string) => void;
  initialUrl?: string;
};

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const ImageInput = ({ onUpload, initialUrl }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialUrl || null
  );
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectImage = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação de tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Formato inválido. Use JPEG, PNG ou WEBP.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Imagem muito grande. Use uma imagem com no máximo 2MB.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    onUpload(file, preview);
  };

  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium">Imagem do grupo</Label>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={handleSelectImage}
          className="flex items-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          Selecionar imagem
        </Button>

        {previewUrl && (
          <div className="relative w-32 h-20 overflow-hidden rounded-lg border">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
