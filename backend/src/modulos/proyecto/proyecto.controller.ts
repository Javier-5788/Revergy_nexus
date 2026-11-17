import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ProyectoService }
from './proyecto.service';

import { CrearProyectoDto }
from './dto/crear-proyecto.dto';

import { ActualizarProyectoDto }
from './dto/actualizar-proyecto.dto';


@Controller('proyecto')
export class ProyectoController {

  constructor(
    private readonly proyectoService:
      ProyectoService,
  ) {}

  @Get()
  obtenerProyectos() {

    return this.proyectoService
      .obtenerProyectos();

  }

  @Get(':id')
  obtenerProyectoPorId(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {

    return this.proyectoService
      .obtenerProyectoPorId(id);

  }

  @Post()
  crearProyecto(
    @Body()
    datos: CrearProyectoDto,
  ) {

    return this.proyectoService
      .crearProyecto(datos);

  }

  @Put(':id')
  actualizarProyecto(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Body()
    datos: ActualizarProyectoDto,
  ) {

    return this.proyectoService
      .actualizarProyecto(id, datos);

  }

}