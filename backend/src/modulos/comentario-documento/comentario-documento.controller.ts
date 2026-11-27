import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ComentarioDocumentoService } from './comentario-documento.service';
import { CrearComentarioDto } from './dto/crear-comentariodocumento.dto';

@Controller('comentario-documento')
export class ComentarioDocumentoController {
  constructor(
    private readonly comentarioDocumentoService: ComentarioDocumentoService,
  ) { }

  @Post()
  crearComentario(@Body() dto: CrearComentarioDto) {
    return this.comentarioDocumentoService.crearComentario(dto);
  }

  @Get('documento/:id')
  obtenerComentariosDocumento(@Param('id', ParseIntPipe) id: number) {
    return this.comentarioDocumentoService.obtenerComentariosDocumento(id);
  }

  @Get('proyecto/:id')
  obtenerComentariosProyecto(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.comentarioDocumentoService
      .obtenerComentariosProyecto(id);
  }

  @Patch(':id/atender')
  atenderComentario(
    @Param('id', ParseIntPipe) id: number,
    @Body('usuario_id', ParseIntPipe) usuarioId: number,
  ) {
    return this.comentarioDocumentoService.atenderComentario(id, usuarioId);
  }

  @Patch(':id/cerrar')
  cerrarComentario(
    @Param('id', ParseIntPipe) id: number,
    @Body('usuario_id', ParseIntPipe) usuarioId: number,
  ) {
    return this.comentarioDocumentoService.cerrarComentario(id, usuarioId);
  }

}