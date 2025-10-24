"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { DocumentFile } from "@/lib/api";

type DocumentMetaFormProps = {
  file: DocumentFile;
  onUpdate: (updates: Partial<DocumentFile>) => void;
};

const CATEGORIES = [
  "Manutenção",
  "Nota Fiscal",
  "Contrato",
  "Plano De Venda",
  "Débitos E Reembolso",
  "Fotos Do Veículo",
  "Outros",
];

export function DocumentMetaForm({ file, onUpdate }: DocumentMetaFormProps) {
  const handleCategorySelect = (category: string) => {
    const newCategories = file.categories.includes(category) ? [] : [category];
    onUpdate({ categories: newCategories });
  };

  return (
    <div className="border-2 border-slate-200 rounded-lg p-6 space-y-6">
      {/* Document Name */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">
          Adicione um nome para o documento
        </h3>
        <Input
          value={file.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Nome do documento"
          className="text-base"
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">
          Selecione uma categoria para o documento
        </h3>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={file.categories.includes(category)}
                onCheckedChange={() => handleCategorySelect(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-base font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
