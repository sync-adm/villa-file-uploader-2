"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { CategorizeStep } from "@/components/documents/categorize-step";
import { type DocumentFile, saveDocuments } from "@/lib/api";
import { WizardStepper } from "./documents/wizard-stepper";
import { UploadStep } from "./documents/upload-step";

export default function UploadVehicleDocuments() {
  const session = useSession();
  const [step, setStep] = useState<1 | 2>(1);
  const [plate, setPlate] = useState("");
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const userName = session.data?.user.name || "Usuário";

  const handleContinue = (plateValue: string, uploadedFiles: File[]) => {
    setPlate(plateValue);
    setFiles(
      uploadedFiles.map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        file,
        name: file.name.replace(/\.[^/.]+$/, ""),
        type: file.type,
        size: file.size,
        categories: [],
      }))
    );
    setCurrentIndex(0);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleUpdateFile = (index: number, updates: Partial<DocumentFile>) => {
    setFiles((prev) =>
      prev.map((file, i) => (i === index ? { ...file, ...updates } : file))
    );
  };

  const handleNext = async () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Save all documents
      setIsLoading(true);
      try {
        const result = await saveDocuments(plate, files, userName);

        if (result.success) {
          const successCount = files.filter(
            (f) => f.categories.length > 0
          ).length;
          toast.success("Documentos salvos com sucesso!", {
            description: `${successCount} documento(s) vinculado(s) à placa ${plate}`,
          });

          // Reset wizard
          setStep(1);
          setPlate("");
          setFiles([]);
          setCurrentIndex(0);
        } else if (result.errors) {
          // Alguns uploads falharam
          toast.error("Alguns documentos não puderam ser salvos", {
            description:
              result.errors[0] +
              (result.errors.length > 1
                ? ` e mais ${result.errors.length - 1} erro(s)`
                : ""),
          });
        }
      } catch (error) {
        toast.error("Erro ao salvar documentos", {
          description:
            error instanceof Error
              ? error.message
              : "Tente novamente mais tarde",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="mx-auto">
        <WizardStepper currentStep={step} />

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UploadStep
                initialPlate={plate}
                initialFiles={files.map((f) => f.file)}
                onContinue={handleContinue}
              />
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CategorizeStep
                files={files}
                currentIndex={currentIndex}
                onUpdateFile={handleUpdateFile}
                onBack={handleBack}
                onNext={handleNext}
                onNavigate={setCurrentIndex}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
