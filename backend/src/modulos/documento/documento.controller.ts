import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { CrearDocumentoDto } from './dto/crear-documento.dto';
import { ValidarDocumentoDto } from './dto/validar-documento.dto';


@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Get()
  obtenerDocumentos() {
    return this.documentoService.obtenerDocumentos();
  }

  @Get(':id')
  obtenerDocumentoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.documentoService.obtenerDocumentoPorId(id);
  }

  @Post()
  crearDocumento(@Body() dto: CrearDocumentoDto) {
    return this.documentoService.crearDocumento(dto);
  }

  @Post(
  'validar-codigo',
)
validarCodigoDocumento(

  @Body()
  dto: ValidarDocumentoDto,

) {

  return this.documentoService
    .validarNombreArchivo(
      dto.nombre_archivo,
    );

}
}