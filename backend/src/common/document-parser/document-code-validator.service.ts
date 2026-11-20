import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ParsedDocumentCode } from './parsed-document-code.interface';

export interface ValidacionCodigoResultado {
  valido: boolean;
  errores: string[];
}

@Injectable()
export class DocumentCodeValidatorService {
  constructor(private readonly prisma: PrismaService) {}

  async validar(
    codigo: ParsedDocumentCode,
  ): Promise<ValidacionCodigoResultado> {
    const errores: string[] = [];

    const infraestructuraCodigo = codigo.infraestructura.trim().toUpperCase();
    const faseCodigo = codigo.fase.trim().toUpperCase();
    const categoriaCodigo = codigo.categoria.trim().toUpperCase();
    const tipoDocumentoCodigo = codigo.tipo_documento.trim().toUpperCase();
    const versionCodigo = codigo.version.trim().toUpperCase();
    const revisionCodigo = codigo.revision.trim().toUpperCase();

    const [
      infraestructura,
      fase,
      categoria,
      tipoDocumento,
      version,
      revision,
    ] = await Promise.all([
      this.prisma.infraestructura.findFirst({
        where: { codigo_infraestructura: infraestructuraCodigo },
        select: { id_infraestructura: true },
      }),
      this.prisma.fase.findFirst({
        where: { codigo_fase: faseCodigo },
        select: { id_fase: true },
      }),
      this.prisma.categoria.findFirst({
        where: { codigo_categoria: categoriaCodigo },
        select: { id_categoria: true },
      }),
      this.prisma.tipo_documento.findFirst({
        where: { codigo_documento: tipoDocumentoCodigo },
        select: { id_tipo_documento: true },
      }),
      this.prisma.version.findFirst({
        where: { codigo_version: versionCodigo },
        select: { id_version: true },
      }),
      this.prisma.revision.findFirst({
        where: { codigo_revision: revisionCodigo },
        select: { id_revision: true },
      }),
    ]);

    if (!infraestructura) {
      errores.push(`Infraestructura ${infraestructuraCodigo} no existe`);
    }

    if (!fase) {
      errores.push(`Fase ${faseCodigo} no existe`);
    }

    if (!categoria) {
      errores.push(`Categoría ${categoriaCodigo} no existe`);
    }

    if (!tipoDocumento) {
      errores.push(`Tipo documental ${tipoDocumentoCodigo} no existe`);
    }

    if (!version) {
      errores.push(`Versión ${versionCodigo} no existe`);
    }

    if (!revision) {
      errores.push(`Revisión ${revisionCodigo} no existe`);
    }

    return {
      valido: errores.length === 0,
      errores,
    };
  }
}