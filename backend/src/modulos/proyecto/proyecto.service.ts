import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService }
from '../../prisma/prisma.service';

import { CrearProyectoDto }
from './dto/crear-proyecto.dto';

import { ActualizarProyectoDto }
from './dto/actualizar-proyecto.dto';

@Injectable()
export class ProyectoService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async obtenerResumenProyecto(proyectoId: number, usuarioId: number) {
  const asignacion = await this.prisma.usuario_proyecto.findFirst({
    where: {
      usuario_id: usuarioId,
      proyecto_id: proyectoId,
    },
    select: {
      id_usuario_proyecto: true,
    },
  });

  if (!asignacion) {
    throw new ForbiddenException("No tienes acceso a este proyecto");
  }

  const proyectoFiltro = {
    documento: {
      is: {
        proyecto_id: proyectoId,
      },
    },
  };

  const [totalDocumentos, comentariosAbiertos, comentariosAtendidos, totalTmt] =
    await Promise.all([
      this.prisma.documento.count({
        where: { proyecto_id: proyectoId },
      }),
      this.prisma.comentario_documento.count({
        where: {
          ...proyectoFiltro,
          estado_comentario: { is: { codigo_estado: "ABI" } },
        },
      }),
      this.prisma.comentario_documento.count({
        where: {
          ...proyectoFiltro,
          estado_comentario: { is: { codigo_estado: "ATE" } },
        },
      }),
      this.prisma.tmt.count({
        where: { proyecto_id: proyectoId },
      }),
    ]);

  return {
    totalDocumentos,
    comentariosAbiertos,
    comentariosAtendidos,
    totalTmt,
  };
}

  async obtenerProyectos(usuarioId: number) {
    return this.prisma.proyecto.findMany({
      where: {
        usuario_proyecto: {
          some: {
            usuario_id: usuarioId,
          },
        },
      },
    include: {
      cliente: true,
      contratista: true,
    },
    orderBy: {
      nombre_proyecto: 'asc',
    },
  });
}


  async crearProyecto(
    datos: CrearProyectoDto,
  ) {

    return this.prisma.proyecto.create({
      data: {
        empresa_cliente_id: datos.empresa_cliente_id,
        empresa_contratista_id: datos.empresa_contratista_id,
        nombre_proyecto: datos.nombre_proyecto,
        codigo_proyecto: datos.codigo_proyecto,
        especialidad: datos.especialidad,
        naturaleza_tecnica: datos.naturaleza_tecnica,
        tamano_mwp: datos.tamano_mwp,
        version_final: datos.version_final,
        estado_proyecto: datos.estado_proyecto,
        fecha_inicio: new Date(datos.fecha_inicio),
        fecha_fin: datos.fecha_fin ? new Date(datos.fecha_fin) : undefined,
      },
    });

  }

  async actualizarProyecto(
    id: number,
    datos: ActualizarProyectoDto,
  ) {

    const { fecha_inicio, fecha_fin, ...campos } = datos;

    return this.prisma.proyecto.update({

      where: {
        id_proyecto: id,
      },

      data: {
        ...campos,
        ...(fecha_inicio !== undefined && {
          fecha_inicio: new Date(fecha_inicio),
        }),
        ...(fecha_fin !== undefined && {
          fecha_fin: new Date(fecha_fin),
        }),
      },

    });

  }

}