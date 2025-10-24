"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DocumentFile } from "@/lib/api";

type CategorizeNavigatorProps = {
  files: DocumentFile[];
  currentIndex: number;
  onNavigate: (index: number) => void;
};

export function CategorizeNavigator({
  files,
  currentIndex,
  onNavigate,
}: CategorizeNavigatorProps) {
  return (
    <div className="mb-6 pb-6 border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">
            Documento {currentIndex + 1} de {files.length}
          </p>
        </div>

        {/* <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate(currentIndex + 1)}
            disabled={currentIndex === files.length - 1}
          >
            Próximo
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div> */}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {files.map((file, index) => (
          <button
            type="button"
            key={file.id}
            onClick={() => onNavigate(index)}
            className={cn(
              "flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all overflow-hidden",
              index === currentIndex
                ? "border-blue-600 ring-2 ring-blue-200"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file.file) || "/placeholder.svg"}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-600 font-medium">
                {index + 1}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
