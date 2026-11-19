import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatalogosService } from './catalogos.service';
import { CrearInfraestructuraDto } from './dto/crear-infraestructura.dto';
import { CrearFaseDto } from './dto/crear-fase.dto';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { CrearTipoDocumentoDto } from './dto/crear-tipo-documento.dto';
import { CrearVersionDto } from './dto/crear-version.dto';
import { CrearRevisionDto } from './dto/crear-revision.dto';
import { CrearEstadoDocumentoDto } from './dto/crear-estado-documento.dto';

@Controller('catalogos')
export class CatalogosController {
  constructor(private readonly catalogosService: CatalogosService) {}

  @Get('infraestructuras')
  obtenerInfraestructuras() {
    return this.catalogosService.obtenerInfraestructuras();
  }

  @Get('fases')
  obtenerFases() {
    return this.catalogosService.obtenerFases();
  }

  @Get('categorias')
  obtenerCategorias() {
    return this.catalogosService.obtenerCategorias();
  }

  @Get('tipos-documento')
  obtenerTiposDocumento() {
    return this.catalogosService.obtenerTiposDocumento();
  }

  @Get('versiones')
  obtenerVersiones() {
    return this.catalogosService.obtenerVersiones();
  }

  @Get('revisiones')
  obtenerRevisiones() {
    return this.catalogosService.obtenerRevisiones();
  }

  @Get('estados-documento')
  obtenerEstadosDocumento() {
    return this.catalogosService.obtenerEstadosDocumento();
  }

  @Post('infraestructuras')
  crearInfraestructura(@Body() dto: CrearInfraestructuraDto) {
    return this.catalogosService.crearInfraestructura(dto);
  }

  @Post('fases')
  crearFase(@Body() dto: CrearFaseDto) {
    return this.catalogosService.crearFase(dto);
  }

  @Post('categorias')
  crearCategoria(@Body() dto: CrearCategoriaDto) {
    return this.catalogosService.crearCategoria(dto);
  }

  @Post('tipos-documento')
  crearTipoDocumento(@Body() dto: CrearTipoDocumentoDto) {
    return this.catalogosService.crearTipoDocumento(dto);
  }

  @Post('versiones')
  crearVersion(@Body() dto: CrearVersionDto) {
    return this.catalogosService.crearVersion(dto);
  }

  @Post('revisiones')
  crearRevision(@Body() dto: CrearRevisionDto) {
    return this.catalogosService.crearRevision(dto);
  }

  @Post('estados-documento')
  crearEstadoDocumento(@Body() dto: CrearEstadoDocumentoDto) {
    return this.catalogosService.crearEstadoDocumento(dto);
  }
}