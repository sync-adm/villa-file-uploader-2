"use client";

import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DocumentFile } from "@/lib/api";

type DocumentPreviewProps = {
  file: DocumentFile;
};

export function DocumentPreview({ file }: DocumentPreviewProps) {
  const isPDF = file.type === "application/pdf";
  const isImage = file.type.startsWith("image/");
  const fileUrl = URL.createObjectURL(file.file);

  return (
    <div className="border-2 border-slate-200 rounded-lg p-6 h-[600px] flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Preview do documento
      </h3>

      <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden">
        {isPDF ? (
          <embed
            src={fileUrl}
            type="application/pdf"
            className="w-full h-full"
          />
        ) : isImage ? (
          <img
            src={fileUrl || "/placeholder.svg"}
            alt={file.name}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-slate-500" />
            </div>
            <div>
              <p className="font-medium text-slate-900">{file.name}</p>
              <p className="text-sm text-slate-500 mt-1">
                Preview não disponível
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={fileUrl} download={file.name}>
                <Download className="w-4 h-4 mr-2" />
                Baixar arquivo
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
