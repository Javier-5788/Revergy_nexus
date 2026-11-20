import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearDocumentoDto } from './dto/crear-documento.dto';
import { DocumentCodeParser } from '../../common/document-parser/document-code.parser';
import { DocumentCodeValidatorService } from '../../common/document-parser/document-code-validator.service';



@Injectable()
export class DocumentoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentCodeValidator: DocumentCodeValidatorService,
  ) { }

  async obtenerDocumentos() {
    return this.prisma.documento.findMany({
      include: {
        proyecto: true,
        categoria: true,
        fase: true,
        infraestructura: true,
        tipo_documento: true,
        version: true,
        revision: true,
        estado_documento: true,
      },
      orderBy: {
        fecha_creacion: 'desc',
      },
    });
  }

  async obtenerDocumentoPorId(id: number) {
    const documento = await this.prisma.documento.findUnique({
      where: { id_documento: id },
      include: {
        proyecto: true,
        categoria: true,
        fase: true,
        infraestructura: true,
        tipo_documento: true,
        version: true,
        revision: true,
        estado_documento: true,
        comentario_documento: true,
        documento_version: true,
        historial_responsabilidad: true,
      },
    });

    if (!documento) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }

    return documento;
  }

  async crearDocumento(dto: CrearDocumentoDto) {
    const existe = await this.prisma.documento.findFirst({
      where: {
        proyecto_id: dto.proyecto_id,
        codigo_documento: dto.codigo_documento,
      },
    });

    if (existe) {
      throw new ConflictException(
        `Ya existe un documento con el código "${dto.codigo_documento}" en este proyecto.`,
      );
    }

    return this.prisma.documento.create({
      data: {
        proyecto_id: dto.proyecto_id,
        codigo_documento: dto.codigo_documento,
        nombre_documento: dto.nombre_documento,
        tipo_documento_id: dto.tipo_documento_id,
        categoria_id: dto.categoria_id,
        infraestructura_id: dto.infraestructura_id,
        fase_id: dto.fase_id,
        version_id: dto.version_id,
        revision_id: dto.revision_id,
        consecutivo: dto.consecutivo,
        id_est_documento: dto.id_est_documento,
        responsable_actual: dto.responsable_actual,
      },
    });
  }

  async validarNombreArchivo(
    nombreArchivo: string,
  ) {

    const codigo =
      DocumentCodeParser.parse(
        nombreArchivo,
      );

    const resultado =
      await this.documentCodeValidator.validar(
        codigo,
      );

    return {

      codigo,

      ...resultado,

    };

  }
}