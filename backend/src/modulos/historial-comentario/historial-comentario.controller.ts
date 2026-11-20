import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CrearHistorialComentarioDto } from './dto/crear-historial-comentario.dto';
import { HistorialComentarioService } from './historial-comentario.service';

@Controller('historial-comentario')
export class HistorialComentarioController {
  constructor(
    private readonly historialComentarioService: HistorialComentarioService,
  ) {}

  @Post()
  registrarMovimiento(@Body() dto: CrearHistorialComentarioDto) {
    return this.historialComentarioService.registrarMovimiento(dto);
  }

  @Get('comentario/:id')
  obtenerHistorialComentario(@Param('id', ParseIntPipe) id: number) {
    return this.historialComentarioService.obtenerHistorialComentario(id);
  }
}