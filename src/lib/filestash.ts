export interface FilestashConfig {
  instance: string;
  share: string;
  key: string;
}

export class FilestashError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "FilestashError";
  }
}

/**
 * Faz upload de um arquivo para o Filestash
 */
export async function uploadFileToFilestash(
  file: File,
  path: string,
  config: FilestashConfig,
): Promise<{ success: boolean; path: string }> {
  const { instance, share, key } = config;

  try {
    const arrayBuffer = await file.arrayBuffer();

    const uploadUrl = `${instance}/api/files/cat?share=${share}&key=${key}&path=${encodeURIComponent(path)}`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: arrayBuffer,
      headers: {
        "Content-Type": file.type,
        "Content-Length": file.size.toString(),
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new FilestashError(
        `Upload failed: ${response.status} ${response.statusText} - ${errorText}`,
        response.status,
      );
    }

    return {
      success: true,
      path,
    };
  } catch (error) {
    if (error instanceof FilestashError) {
      throw error;
    }

    throw new FilestashError(
      `Upload error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Faz upload de múltiplos arquivos para o Filestash em lotes
 */
export async function uploadMultipleFilesToFilestash(
  files: Array<{ file: File; path: string }>,
  config: FilestashConfig,
  onProgress?: (completed: number, total: number) => void,
): Promise<Array<{ path: string; success: boolean; error?: string }>> {
  const results: Array<{ path: string; success: boolean; error?: string }> = [];

  for (let i = 0; i < files.length; i++) {
    const { file, path } = files[i];

    try {
      await uploadFileToFilestash(file, path, config);
      results.push({ path, success: true });
    } catch (error) {
      const errorMessage =
        error instanceof FilestashError ? error.message : "Unknown error";
      results.push({ path, success: false, error: errorMessage });
    }

    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }

  return results;
}

/**
 * Obtém a configuração do Filestash das variáveis de ambiente
 */
export function getFilestashConfig(): FilestashConfig {
  const instance = process.env.FILESTASH_USER_INSTANCE;
  const share = process.env.FILESTASH_SHARE;
  const key = process.env.FILESTASH_KEY;

  if (!instance || !share || !key) {
    throw new Error(
      "Configuração do Filestash não encontrada. Verifique as variáveis de ambiente FILESTASH_USER_INSTANCE, FILESTASH_SHARE e FILESTASH_KEY.",
    );
  }

  return { instance, share, key };
}
