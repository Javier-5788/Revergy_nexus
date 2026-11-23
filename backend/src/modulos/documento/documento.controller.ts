import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { DocumentoService } from "./documento.service";
import { CrearDocumentoDto } from "./dto/crear-documento.dto";
import { ValidarDocumentoDto } from "./dto/validar-documento.dto";
import { JwtAuthGuard } from "../autenticacion/guards/jwt-auth.guard";

@Controller("documento")
@UseGuards(JwtAuthGuard)
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) { }

  @Get()
  obtenerDocumentos(
    @Query("proyecto_id", ParseIntPipe) proyectoId: number,
    @Request() req,
  ) {
    return this.documentoService.obtenerDocumentos(
      proyectoId,
      req.user.userId,
    );
  }

  @Get(":id")
  obtenerDocumentoPorId(
    @Param("id", ParseIntPipe) id: number,
    @Query("proyecto_id", ParseIntPipe) proyectoId: number,
    @Request() req,
  ) {
    return this.documentoService.obtenerDocumentoPorId(
      id,
      proyectoId,
      req.user.userId,
    );
  }




  @Post()
  crearDocumento(@Body() dto: CrearDocumentoDto, @Request() req) {
    return this.documentoService.crearDocumento(dto, req.user.userId);
  }

  @Post("validar-codigo")
  validarCodigoDocumento(@Body() dto: ValidarDocumentoDto) {
    return this.documentoService.validarNombreArchivo(dto.nombre_archivo);
  }
}