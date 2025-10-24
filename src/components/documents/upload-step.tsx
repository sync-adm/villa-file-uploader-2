"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { PlateInput } from "@/components/documents/plate-input";
import { MultiFileUpload } from "@/components/documents/multi-file-upload";
import { Button } from "@/components/ui/button";

const uploadSchema = z.object({
  plate: z
    .string()
    .min(1, "Placa é obrigatória")
    .regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i, "Formato de placa inválido"),
});

type UploadFormData = z.infer<typeof uploadSchema>;

type UploadStepProps = {
  initialPlate?: string;
  initialFiles?: File[];
  onContinue: (plate: string, files: File[]) => void;
};

export function UploadStep({
  initialPlate = "",
  initialFiles = [],
  onContinue,
}: UploadStepProps) {
  const [files, setFiles] = useState<File[]>(initialFiles);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      plate: initialPlate,
    },
  });

  const onSubmit = (data: UploadFormData) => {
    if (files.length > 0) {
      onContinue(data.plate.toUpperCase(), files);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto"
    >
      <div>
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4"
          >
            <Car className="w-6 h-6 text-blue-600" />
          </motion.div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Upload de Documentos
          </h1>
          <p className="text-slate-600">
            Adicione documentos vinculados à placa do veículo
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PlateInput {...register("plate")} error={errors.plate?.message} />

          <MultiFileUpload files={files} onFilesChange={setFiles} />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-45"
              size="lg"
              disabled={files.length === 0}
            >
              Continuar
            </Button>
          </div>
        </form>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-6 border-t border-slate-200"
        >
          <p className="text-sm text-slate-500">
            Os documentos serão vinculados à placa informada e ficarão
            disponíveis na Biblioteca de Arquivos
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
