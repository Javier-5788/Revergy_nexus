import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DocumentoController } from './documento.controller';
import { DocumentoService } from './documento.service';
import { DocumentParserModule } from '../../common/document-parser/document-parser.module';

@Module({
  imports: [PrismaModule, DocumentParserModule],
  controllers: [DocumentoController],
  providers: [DocumentoService],
})
export class DocumentoModule {}