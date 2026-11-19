import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { EmpresaService }
from './empresa.service';

import { CrearEmpresaDto }
from './dto/crear-empresa.dto';

import { ActualizarEmpresaDto }
from './dto/actualizar-empresa.dto';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../autenticacion/guards/jwt-auth.guard';

@Controller('empresa')
@UseGuards(JwtAuthGuard)
export class EmpresaController {

  constructor(
    private readonly empresaService:
      EmpresaService,
  ) {}

  @Get()
  obtenerEmpresas() {

    return this.empresaService
      .obtenerEmpresas();

  }

  @Get(':id')
  obtenerEmpresaPorId(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,
  ) {

    return this.empresaService
      .obtenerEmpresaPorId(id);

  }

  @Post()
  crearEmpresa(
    @Body()
    datos: CrearEmpresaDto,
  ) {

    return this.empresaService
      .crearEmpresa(datos);

  }

  @Put(':id')
  actualizarEmpresa(
    @Param(
      'id',
      ParseIntPipe,
    )
    id: number,

    @Body()
    datos: ActualizarEmpresaDto,
  ) {

    return this.empresaService
      .actualizarEmpresa(
        id,
        datos,
      );

  }

}