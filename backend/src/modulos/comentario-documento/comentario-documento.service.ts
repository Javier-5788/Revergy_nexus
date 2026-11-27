import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearComentarioDto } from './dto/crear-comentariodocumento.dto';

@Injectable()
export class ComentarioDocumentoService {
  constructor(private readonly prisma: PrismaService) { }

  async crearComentario(dto: CrearComentarioDto) {
    return this.prisma.comentario_documento.create({
      data: {
        documento_id: dto.documento_id,
        usuario_id: dto.usuario_id,
        mensaje: dto.mensaje,
        archivo_adjunto: dto.archivo_adjunto,
        estado_comentario_id: 1,
      },
    });
  }

  async obtenerComentariosDocumento(documentoId: number) {
    return this.prisma.comentario_documento.findMany({
      where: {
        documento_id: documentoId,
      },
      include: {
        usuario: true,
        estado_comentario: true,
        categoria: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
  }

  async obtenerComentariosProyecto(
  proyectoId: number,
) {
  return this.prisma
    .comentario_documento
    .findMany({
      where: {
        documento: {
          proyecto_id:
            proyectoId,
        },
      },
      include: {
        usuario: true,
        estado_comentario: true,
        documento: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
}

  async atenderComentario(comentarioId: number, usuarioId: number) {
    const comentario = await this.prisma.comentario_documento.findUnique({
      where: {
        id_com_doc: comentarioId,
      },
    });

    if (!comentario) {
      throw new NotFoundException(
        `Comentario con ID ${comentarioId} no encontrado`,
      );
    }

    if (comentario.estado_comentario_id === 2) {
      throw new BadRequestException(
        'El comentario ya se encuentra en ese estado',
      );
    }

    if (comentario.estado_comentario_id !== 1) {
      throw new BadRequestException(
        'Solo comentarios abiertos pueden atenderse',
      );
    }

    const estadoAnterior =
      comentario.estado_comentario_id;

    const comentarioActualizado =
      await this.prisma.comentario_documento.update({
        where: {
          id_com_doc: comentarioId,
        },
        data: {
          estado_comentario_id: 2,
          usuario_atencion: usuarioId,
          fecha_atencion: new Date(),
        },
      });

    await this.prisma.historial_comentario.create({
  data: {

    comentario_id:
      comentario.id_com_doc,

    usuario_id:
      usuarioId,

    estado_anterior_id:
      estadoAnterior,

    estado_nuevo_id: 2,

    observacion:
      "Comentario atendido",

    fecha_movimiento:
      new Date(),

  },
});

    return comentarioActualizado;
  }

  async cerrarComentario(comentarioId: number, usuarioId: number) {
    const comentario = await this.prisma.comentario_documento.findUnique({
      where: {
        id_com_doc: comentarioId,
      },
    });

    if (!comentario) {
      throw new NotFoundException(
        `Comentario con ID ${comentarioId} no encontrado`,
      );
    }

    if (comentario.estado_comentario_id !== 2) {
      throw new BadRequestException(
        'Solo comentarios atendidos pueden cerrarse',
      );
    }

    const estadoAnterior =
      comentario.estado_comentario_id;

    const comentarioActualizado =
      await this.prisma.comentario_documento.update({
        where: {
          id_com_doc: comentarioId,
        },
        data: {
          estado_comentario_id: 3,
          usuario_cierre: usuarioId,
          fecha_cierre: new Date(),
        },
      });

    await this.prisma.historial_comentario.create({
  data: {

    comentario_id:
      comentario.id_com_doc,

    usuario_id:
      usuarioId,

    estado_anterior_id:
      estadoAnterior,

    estado_nuevo_id: 3,

    observacion:
      "Comentario cerrado",

    fecha_movimiento:
      new Date(),

  },
});

    return comentarioActualizado;
  }
}