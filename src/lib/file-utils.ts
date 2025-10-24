

/**
 * Gera um nome de arquivo formatado seguindo o padrão:
 * DDMMYYYY_USERFILENAME_USERNAME.EXTENSAO
 */
export function formatFileName(
  originalName: string,
  userName: string,
  customName?: string,
): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const datePrefix = `${day}-${month}-${year}`;

  const lastDotIndex = originalName.lastIndexOf(".");
  const extension = lastDotIndex !== -1 ? originalName.slice(lastDotIndex) : "";

  let fileName = customName || originalName.slice(0, lastDotIndex);

  fileName = fileName
    .replace(/[^a-zA-Z0-9\s\-_]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase();

  const cleanUserName = userName.split(" ")[0]
    .replace(/[^a-zA-Z0-9\s\-_]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase();

  return `${datePrefix}-${cleanUserName}-${fileName}${extension}`;
}

/**
 * Processa múltiplos arquivos e resolve duplicatas adicionando numeração
 */
export function formatFileNamesWithDuplicateHandling(
  documents: Array<{
    originalName: string;
    customName?: string;
    category: string;
  }>,
  userName: string,
): Array<{ formattedName: string; baseName: string }> {
  const nameCount = new Map<string, number>();
  const results: Array<{ formattedName: string; baseName: string }> = [];

  for (const doc of documents) {
    // Gerar nome base sem numeração
    const baseName = formatFileName(doc.originalName, userName, doc.customName);
    
    // Extrair nome sem extensão e extensão
    const lastDotIndex = baseName.lastIndexOf(".");
    const nameWithoutExt = lastDotIndex !== -1 ? baseName.slice(0, lastDotIndex) : baseName;
    const extension = lastDotIndex !== -1 ? baseName.slice(lastDotIndex) : "";
    
    // Criar chave única incluindo categoria para evitar conflitos entre categorias diferentes
    const uniqueKey = `${doc.category}:${nameWithoutExt}${extension}`;
    
    let finalName = baseName;
    
    // Se já existe este nome na mesma categoria, adicionar numeração
    if (nameCount.has(uniqueKey)) {
      const count = nameCount.get(uniqueKey)!;
      nameCount.set(uniqueKey, count + 1);
      finalName = `${nameWithoutExt}_${count}${extension}`;
    } else {
      nameCount.set(uniqueKey, 1);
    }
    
    results.push({
      formattedName: finalName,
      baseName: baseName,
    });
  }

  return results;
}

/**
 * Gera o path completo para o arquivo no Filestash
 * Formato: /PLACA/CATEGORIA/ARQUIVO
 */
export function generateFilePath(
  plate: string,
  category: string,
  fileName: string,
): string {
  const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const cleanCategory = category.trim();

  return `/${cleanPlate}/${cleanCategory}/${fileName}`;
}
