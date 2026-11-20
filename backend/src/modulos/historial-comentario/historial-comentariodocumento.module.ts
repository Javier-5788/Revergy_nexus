import { Module } from '@nestjs/common';
import { HistorialComentarioController } from './historial-comentario.controller';
import { HistorialComentarioService } from './historial-comentario.service';
import { PrismaModule } from '../../prisma/prisma.module';


@Module({
  controllers: [HistorialComentarioController],
  providers: [HistorialComentarioService],
  imports: [PrismaModule],
  exports: [HistorialComentarioService],
})
export class HistorialComentarioModule {}