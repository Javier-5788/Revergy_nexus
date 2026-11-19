import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { EmpresaModule } from './modulos/empresa/empresa.module';
import { AutenticacionModule } from './modulos/autenticacion/autenticacion.module';
import { ProyectoModule } from './modulos/proyecto/proyecto.module';
import { CatalogosModule } from './modulos/catalogos/catalogos.module';
import { DocumentoModule } from './modulos/documento/documento.module';

@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    EmpresaModule,
    AutenticacionModule,
    ProyectoModule,
    CatalogosModule,
    DocumentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}