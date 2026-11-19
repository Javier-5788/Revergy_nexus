import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearInfraestructuraDto } from './dto/crear-infraestructura.dto';
import { CrearFaseDto } from './dto/crear-fase.dto';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { CrearTipoDocumentoDto } from './dto/crear-tipo-documento.dto';
import { CrearVersionDto } from './dto/crear-version.dto';
import { CrearRevisionDto } from './dto/crear-revision.dto';
import { CrearEstadoDocumentoDto } from './dto/crear-estado-documento.dto';

@Injectable()
export class CatalogosService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerInfraestructuras() {
    return this.prisma.infraestructura.findMany({
      orderBy: { nombre_infraestructura: 'asc' },
    });
  }

  async obtenerFases() {
    return this.prisma.fase.findMany({
      orderBy: { nombre_fase: 'asc' },
    });
  }

  async obtenerCategorias() {
    return this.prisma.categoria.findMany({
      orderBy: { nombre_categoria: 'asc' },
    });
  }

  async obtenerTiposDocumento() {
    return this.prisma.tipo_documento.findMany({
      orderBy: { nombre_documento: 'asc' },
    });
  }

  async obtenerVersiones() {
    return this.prisma.version.findMany({
      orderBy: { orden_version: 'asc' },
    });
  }

  async obtenerRevisiones() {
    return this.prisma.revision.findMany({
      orderBy: { orden_revision: 'asc' },
    });
  }

  async obtenerEstadosDocumento() {
    return this.prisma.estado_documento.findMany({
      orderBy: { nombre_estado_documento: 'asc' },
    });
  }

  async crearInfraestructura(dto: CrearInfraestructuraDto) {
    return this.prisma.infraestructura.create({ data: dto });
  }

  async crearFase(dto: CrearFaseDto) {
    return this.prisma.fase.create({ data: dto });
  }

  async crearCategoria(dto: CrearCategoriaDto) {
    return this.prisma.categoria.create({ data: dto });
  }

  async crearTipoDocumento(dto: CrearTipoDocumentoDto) {
    return this.prisma.tipo_documento.create({ data: dto });
  }

  async crearVersion(dto: CrearVersionDto) {
    return this.prisma.version.create({ data: dto });
  }

  async crearRevision(dto: CrearRevisionDto) {
    return this.prisma.revision.create({ data: dto });
  }

  async crearEstadoDocumento(dto: CrearEstadoDocumentoDto) {
    return this.prisma.estado_documento.create({ data: dto });
  }
}