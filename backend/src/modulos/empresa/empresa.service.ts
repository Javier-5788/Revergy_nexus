import {
  Injectable,
} from '@nestjs/common';

import { PrismaService }
from '../../prisma/prisma.service';

import { CrearEmpresaDto }
from './dto/crear-empresa.dto';

import { ActualizarEmpresaDto }
from './dto/actualizar-empresa.dto';

@Injectable()
export class EmpresaService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async obtenerEmpresas() {

    return this.prisma.empresas.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });

  }

  async obtenerEmpresaPorId(
    id: number,
  ) {

    return this.prisma.empresas.findUnique({
      where: {
        id_empresa: id,
      },
    });

  }

  async crearEmpresa(
    datos: CrearEmpresaDto,
  ) {

    return this.prisma.empresas.create({
      data: {
        nombre: datos.nombre,
        codigo_empresa:
          datos.codigo_empresa,
        tipo_empresa: datos.tipo_empresa,
      },
    });

  }

  async actualizarEmpresa(
    id: number,
    datos: ActualizarEmpresaDto,
  ) {

    return this.prisma.empresas.update({
        where: { id_empresa: id },
        data: {
            ...datos,
        },
    });

  }

}