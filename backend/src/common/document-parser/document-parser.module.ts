import { Module } from '@nestjs/common';

import { PrismaModule }
from '../../prisma/prisma.module';

import { DocumentCodeValidatorService }
from './document-code-validator.service';

@Module({

  imports: [
    PrismaModule,
  ],

  providers: [
    DocumentCodeValidatorService,
  ],

  exports: [
    DocumentCodeValidatorService,
  ],

})
export class DocumentParserModule {}