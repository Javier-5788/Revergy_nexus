import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "node:path";
import type { Request as ExpressRequest, Response } from "express";
import { DocumentoVersionService } from "./documento-version.service";
import { CrearDocumentoVersionDto } from "./dto/crear-documento-version.dto";
import { JwtAuthGuard } from "../autenticacion/guards/jwt-auth.guard";

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: number;
  };
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

const EXTENSIONES_PERMITIDAS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".csv",
  ".dwg",
  ".dxf",
  ".ifc",
  ".rvt",
  ".zip",
]);

@Controller("documento-version")
@UseGuards(JwtAuthGuard)
export class DocumentoVersionController {
  constructor(
    private readonly documentoVersionService: DocumentoVersionService,
  ) {}

  @Get("documento/:id")
  obtenerVersionesDocumento(
    @Param("id", ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.documentoVersionService.obtenerVersionesDocumento(
      id,
      req.user.userId,
    );
  }

  @Post("documento/:id")
  @UseInterceptors(
    FileInterceptor("archivo", {
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (_req, file, callback) => {
        const extension = extname(file.originalname).toLowerCase();

        if (!EXTENSIONES_PERMITIDAS.has(extension)) {
          callback(
            new BadRequestException("Tipo de archivo no permitido"),
            false,
          );
          return;
        }

        callback(null, true);
      },
    }),
  )
  crearVersion(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile() archivo: Express.Multer.File | undefined,
    @Body() dto: CrearDocumentoVersionDto,
    @Request() req: AuthenticatedRequest,
  ) {
    if (!archivo) {
      throw new BadRequestException(
        "Selecciona un archivo válido de máximo 25 MB",
      );
    }

    return this.documentoVersionService.crearVersion(
      id,
      dto,
      archivo,
      req.user.userId,
    );
  }

  @Get(":id/descargar")
  async descargarVersion(
    @Param("id", ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
    @Res() response: Response,
  ) {
    const archivo =
      await this.documentoVersionService.obtenerArchivoVersion(
        id,
        req.user.userId,
      );

    return response.download(archivo.rutaCompleta, archivo.nombreDescarga);
  }
}