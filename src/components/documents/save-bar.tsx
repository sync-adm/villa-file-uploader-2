"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SaveBarProps = {
  currentIndex: number;
  totalFiles: number;
  onBack: () => void;
  onNext: () => void;
  isLoading: boolean;
  canProceed?: boolean;
};

export function SaveBar({
  currentIndex,
  totalFiles,
  onBack,
  onNext,
  isLoading,
  canProceed = true,
}: SaveBarProps) {
  const isLastFile = currentIndex === totalFiles - 1;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
      <Button variant="outline" onClick={onBack} disabled={isLoading}>
        Voltar
      </Button>

      <Button
        onClick={onNext}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Salvando...
          </>
        ) : isLastFile ? (
          "Salvar"
        ) : (
          "Próximo"
        )}
      </Button>
    </div>
  );
}
