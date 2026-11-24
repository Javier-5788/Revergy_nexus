import { Injectable, NotFoundException } from "@nestjs/common";
import { relative, resolve } from "node:path";
import { PrismaService } from "../../prisma/prisma.service";
import { CrearDocumentoVersionDto } from "./dto/crear-documento-version.dto";

@Injectable()
export class DocumentoVersionService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerVersionesDocumento(documentoId: number, _usuarioId: number) {
    return this.prisma.documento_version.findMany({
      where: {
        documento_id: documentoId,
      },
      include: {
        version: true,
        revision: true,
        usuario: true,
      },
      orderBy: {
        fecha_carga: "desc",
      },
    });
  }

  async crearVersion(
    documentoId: number,
    dto: CrearDocumentoVersionDto,
    archivo: Express.Multer.File,
    usuarioId: number,
  ) {
    const documento = await this.prisma.documento.findUnique({
      where: { id_documento: documentoId },
    });

    if (!documento) {
      throw new NotFoundException(
        `El documento con ID ${documentoId} no existe.`,
      );
    }

    const rutaArchivo = relative(process.cwd(), archivo.path);

    return this.prisma.documento_version.create({
      data: {
        documento_id: documentoId,
        version_id: dto.version_id,
        revision_id: dto.revision_id,
        ruta_archivo: rutaArchivo,
        comentario: dto.comentario,
        usuario_id: usuarioId,
      },
    });
  }

  async obtenerArchivoVersion(versionId: number, _usuarioId: number) {
    const version = await this.prisma.documento_version.findUnique({
      where: { id_doc_ver: versionId },
    });

    if (!version || !version.ruta_archivo) {
      throw new NotFoundException(
        `No se encontró el archivo de la versión ${versionId}.`,
      );
    }

    const rutaCompleta = resolve(process.cwd(), version.ruta_archivo);
    const nombreDescarga = version.ruta_archivo.split(/[\\/]/).pop() || "archivo";

    return { rutaCompleta, nombreDescarga };
  }
}