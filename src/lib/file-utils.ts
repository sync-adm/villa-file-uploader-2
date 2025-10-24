

/**
 * Gera um nome de arquivo formatado seguindo o padrão:
 * YEARMMDD_USERFILENAME_USERNAME.EXTENSAO
 */
export function formatFileName(
  originalName: string,
  userName: string,
  customName?: string,
): string {
  // Obter data atual no formato YYYYMMDD
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const datePrefix = `${year}${month}${day}`;

  // Extrair extensão do arquivo original
  const lastDotIndex = originalName.lastIndexOf(".");
  const extension = lastDotIndex !== -1 ? originalName.slice(lastDotIndex) : "";

  // Usar nome customizado se fornecido, senão usar o nome original sem extensão
  let fileName = customName || originalName.slice(0, lastDotIndex);

  // Limpar nome do arquivo (remover caracteres especiais e espaços)
  fileName = fileName
    .replace(/[^a-zA-Z0-9\s\-_]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "_") // Substitui espaços por underscore
    .toUpperCase(); // Converter para maiúsculo

  // Limpar nome do usuário
  const cleanUserName = userName
    .replace(/[^a-zA-Z0-9\s\-_]/g, "")
    .replace(/\s+/g, "_")
    .toUpperCase();

  // Montar nome final
  return `${datePrefix}_${fileName}_${cleanUserName}${extension}`;
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
