import { NextRequest, NextResponse } from "next/server";
import { formatFileNamesWithDuplicateHandling, generateFilePath } from "@/lib/file-utils";
import {
  uploadMultipleFilesToFilestash,
  getFilestashConfig,
  FilestashError,
} from "@/lib/filestash";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const plate = formData.get("plate") as string;
    const userName = formData.get("userName") as string;

    if (!plate || !userName) {
      return NextResponse.json(
        { success: false, error: "Placa e nome do usuário são obrigatórios" },
        { status: 400 }
      );
    }

    const config = getFilestashConfig();

    // Primeiro, coletar todos os arquivos
    const documentData: Array<{
      file: File;
      originalName: string;
      customName?: string;
      category: string;
    }> = [];
    
    let fileIndex = 0;
    while (formData.get(`file_${fileIndex}`)) {
      const file = formData.get(`file_${fileIndex}`) as File;
      const fileName = formData.get(`fileName_${fileIndex}`) as string;
      const categoryString = formData.get(`categories_${fileIndex}`) as string;
      
      const categories = categoryString ? categoryString.split(",") : [];
      
      if (categories.length === 0) {
        return NextResponse.json(
          { success: false, error: `Categoria obrigatória para arquivo ${file.name}` },
          { status: 400 }
        );
      }

      documentData.push({
        file,
        originalName: file.name,
        customName: fileName,
        category: categories[0], // usar primeira categoria
      });
      
      fileIndex++;
    }

    // Processar nomes e resolver duplicatas
    const formattedNames = formatFileNamesWithDuplicateHandling(
      documentData.map(d => ({
        originalName: d.originalName,
        customName: d.customName,
        category: d.category,
      })),
      userName
    );

    // Preparar arquivos para upload
    const filesToUpload: Array<{ file: File; path: string }> = documentData.map((doc, index) => {
      const formattedName = formattedNames[index].formattedName;
      const fullPath = generateFilePath(plate, doc.category, formattedName);

      return {
        file: doc.file,
        path: fullPath,
      };
    });

    if (filesToUpload.length === 0) {
      return NextResponse.json(
        { success: false, error: "Nenhum arquivo para upload" },
        { status: 400 }
      );
    }

    const results = await uploadMultipleFilesToFilestash(
      filesToUpload,
      config,
      (completed, total) => {}
    );

    const errors = results
      .filter((result) => !result.success)
      .map((result) => result.error || "Erro desconhecido");

    const successCount = results.filter((result) => result.success).length;

    if (errors.length > 0) {
      return NextResponse.json({
        success: successCount > 0,
        errors,
        successCount,
        totalFiles: results.length,
      });
    }

    return NextResponse.json({
      success: true,
      successCount,
      totalFiles: results.length,
    });

  } catch (error) {
    if (error instanceof FilestashError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}