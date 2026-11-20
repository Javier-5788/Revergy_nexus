import { Module } from '@nestjs/common';
import { ComentarioDocumentoController } from './comentario-documento.controller';
import { ComentarioDocumentoService } from './comentario-documento.service';

@Module({
  controllers: [ComentarioDocumentoController],
  providers: [ComentarioDocumentoService],
})
export class ComentarioDocumentoModule {}