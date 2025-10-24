export type DocumentFile = {
  id: string;
  file: File;
  name: string;
  type: string;
  size: number;
  categories: string[];
};

export async function saveDocuments(
  plate: string,
  documents: DocumentFile[],
  userName: string,
): Promise<{ success: boolean; errors?: string[] }> {
  try {
    const formData = new FormData();
    formData.append("plate", plate);
    formData.append("userName", userName);

    const validDocuments = documents.filter((doc) => doc.categories.length > 0);

    if (validDocuments.length === 0) {
      throw new Error(
        "Nenhum documento válido para upload (todos devem ter categoria)",
      );
    }

    validDocuments.forEach((doc, index) => {
      formData.append(`file_${index}`, doc.file);
      formData.append(`fileName_${index}`, doc.name);
      formData.append(`categories_${index}`, doc.categories.join(","));
    });

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Erro desconhecido" }));
      throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      return {
        success: false,
        errors: result.errors || [result.error || "Erro desconhecido"],
      };
    }
  } catch (error) {
    console.error("Erro ao salvar documentos:", error);

    return {
      success: false,
      errors: [error instanceof Error ? error.message : "Erro desconhecido"],
    };
  }
}
