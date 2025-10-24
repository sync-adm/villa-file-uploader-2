"use client";

import { DocumentPreview } from "@/components/documents/document-preview";
import { DocumentMetaForm } from "@/components/documents/document-meta-form";
import { CategorizeNavigator } from "@/components/documents/categorize-navigator";
import type { DocumentFile } from "@/lib/api";
import { SaveBar } from "./save-bar";
import { toast } from "sonner";

type CategorizeStepProps = {
  files: DocumentFile[];
  currentIndex: number;
  onUpdateFile: (index: number, updates: Partial<DocumentFile>) => void;
  onBack: () => void;
  onNext: () => void;
  onNavigate: (index: number) => void;
  isLoading: boolean;
};

export function CategorizeStep({
  files,
  currentIndex,
  onUpdateFile,
  onBack,
  onNext,
  onNavigate,
  isLoading,
}: CategorizeStepProps) {
  const currentFile = files[currentIndex];

  const hasCategory = currentFile.categories.length > 0;

  const handleNext = () => {
    if (!hasCategory) {
      toast.error("Categoria obrigatória", {
        description:
          "Selecione uma categoria para este documento antes de continuar",
        style: {
          background: "#ef4444",
          color: "white",
          border: "1px solid #dc2626",
        },
      });
      return;
    }
    onNext();
  };

  return (
    <div className="p-8 pt-0">
      <CategorizeNavigator
        files={files}
        currentIndex={currentIndex}
        onNavigate={onNavigate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DocumentPreview file={currentFile} />

        <DocumentMetaForm
          file={currentFile}
          onUpdate={(updates) => onUpdateFile(currentIndex, updates)}
        />
      </div>

      <SaveBar
        currentIndex={currentIndex}
        totalFiles={files.length}
        onBack={onBack}
        onNext={handleNext}
        isLoading={isLoading}
        canProceed={hasCategory}
      />
    </div>
  );
}
