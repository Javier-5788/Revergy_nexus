import { Module } from '@nestjs/common';
import { DocumentoVersionService } from './documento-version.service';
import { DocumentoVersionController } from './documento-version.controller';

@Module({
  providers: [DocumentoVersionService],
  controllers: [DocumentoVersionController]
})
export class DocumentoVersionModule {}
