import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ProyectoService }
  from './proyecto.service';

import { CrearProyectoDto }
  from './dto/crear-proyecto.dto';

import { ActualizarProyectoDto }
  from './dto/actualizar-proyecto.dto';


import { JwtAuthGuard } from '../autenticacion/guards/jwt-auth.guard';

@Controller('proyecto')
@UseGuards(JwtAuthGuard)
export class ProyectoController {

  constructor(
    private readonly proyectoService:
      ProyectoService,
  ) { }

  @Get()
  obtenerProyectos(@Request() req) {
    return this.proyectoService.obtenerProyectos(
      req.user.userId,
    );
  }

  @Get(":id/resumen")
  obtenerResumenProyecto(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.proyectoService.obtenerResumenProyecto(
      id,
      req.user.userId,
    );
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
      .obtenerProyectos(id);

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