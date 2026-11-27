import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  private async verificarAccesoProyecto(
    proyectoId: number,
    usuarioId: number,
  ) {
    const asignacion = await this.prisma.usuario_proyecto.findFirst({
      where: {
        proyecto_id: proyectoId,
        usuario_id: usuarioId,
      },
      select: {
        id_usuario_proyecto: true,
      },
    });

    if (!asignacion) {
      throw new ForbiddenException("No tienes acceso a este proyecto");
    }
  }

  async obtenerDocumentos(proyectoId: number, usuarioId: number) {
    await this.verificarAccesoProyecto(proyectoId, usuarioId);

    return this.prisma.documento.findMany({
      where: { proyecto_id: proyectoId },
      include: {
        categoria: true,
        fase: true,
        infraestructura: true,
        tipo_documento: true,
        version: true,
        revision: true,
        estado_documento: true,
      },
      orderBy: {
        fecha_creacion: "desc",
      },
    });
  }

  async obtenerDocumentoPorId(
    id: number,
    proyectoId: number,
    usuarioId: number,
  ) {
    const documento = await this.prisma.documento.findUnique({
      where: { id_documento: id },
      select: { proyecto_id: true },
    });

    if (!documento || documento.proyecto_id !== proyectoId) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }

    await this.verificarAccesoProyecto(proyectoId, usuarioId);

    return this.prisma.documento.findUnique({
      where: { id_documento: id },
      include: {
        categoria: true,
        fase: true,
        infraestructura: true,
        tipo_documento: true,
        version: true,
        revision: true,
        estado_documento: true,
        documento_version: {
          orderBy: { fecha_carga: "desc" },
          include: {
            version: true,
            revision: true,
            usuario: {
              select: { nombre_usuario: true },
            },
          },
        },
      },
    });
  }

  async crearDocumento(dto: CrearDocumentoDto, usuarioId: number) {
    await this.verificarAccesoProyecto(dto.proyecto_id, usuarioId);

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

  async obtenerArbol(
    proyectoId: number,
  ) {

    return this.prisma
      .documento
      .findMany({

        where: {
          proyecto_id:
            proyectoId,
        },

        include: {

          categoria: true,

          tipo_documento: true,

        },

        orderBy: {

          codigo_documento:
            "asc",

        },

      });

  }
}