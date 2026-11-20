import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearDocumentoVersionDto } from './dto/crear-documento-version.dto';

@Injectable()
export class DocumentoVersionService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerVersionesDocumento(documentoId: number) {
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
        fecha_carga: 'desc',
      },
    });
  }

  async crearVersion(dto: CrearDocumentoVersionDto) {
    const documento = await this.prisma.documento.findUnique({
      where: { id_documento: dto.documento_id },
    });

    if (!documento) {
      throw new NotFoundException(
        `El documento con ID ${dto.documento_id} no existe.`,
      );
    }

    return this.prisma.documento_version.create({
      data: {
        documento_id: dto.documento_id,
        version_id: dto.version_id,
        revision_id: dto.revision_id,
        ruta_archivo: dto.ruta_archivo,
        comentario: dto.comentario,
        usuario_id: dto.usuario_id,
      },
    });
  }
}