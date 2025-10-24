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
  const isWord = file.type.includes("word") || file.type.includes("document");
  const isExcel = file.type.includes("sheet") || file.type.includes("excel");
  const isXML =
    file.type.includes("xml") || file.name.toLowerCase().endsWith(".xml");
  const fileUrl = URL.createObjectURL(file.file);

  const getFileTypeDisplay = () => {
    if (isPDF) return "PDF";
    if (isImage) return "Imagem";
    if (isWord) return "Documento Word";
    if (isExcel) return "Planilha Excel";
    if (isXML) return "Arquivo XML";
    return "Documento";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="border-2 border-slate-200 rounded-lg p-6 h-[600px] flex flex-col">
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
          <div className="flex flex-col items-center gap-4 p-4 text-center w-full max-w-md mx-auto">
            <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center">
              <FileText className="w-10 h-10 text-slate-500" />
            </div>
            <div className="space-y-2 w-full">
              <p className="font-medium text-slate-900 text-sm leading-relaxed break-words hyphens-auto">
                {file.name}
              </p>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block">
                  {getFileTypeDisplay()}
                </p>
                <p className="text-sm text-slate-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg w-full">
                <p className="text-sm text-amber-800 font-medium">
                  ⚠️ Visualização indisponível
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Este tipo de arquivo não pode ser visualizado no navegador
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4" asChild>
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
