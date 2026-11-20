import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DocumentoVersionService } from './documento-version.service';
import { CrearDocumentoVersionDto } from './dto/crear-documento-version.dto';

@Controller('documento-version')
export class DocumentoVersionController {
  constructor(
    private readonly documentoVersionService: DocumentoVersionService,
  ) {}

  @Get('documento/:id')
  obtenerVersionesDocumento(@Param('id', ParseIntPipe) id: number) {
    return this.documentoVersionService.obtenerVersionesDocumento(id);
  }

  @Post()
  crearVersion(@Body() dto: CrearDocumentoVersionDto) {
    return this.documentoVersionService.crearVersion(dto);
  }
}