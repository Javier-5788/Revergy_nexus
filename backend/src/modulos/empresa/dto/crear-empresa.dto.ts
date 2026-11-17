import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { empresas_tipo_empresa } from '@prisma/client';

export class CrearEmpresaDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo_empresa: string;

  @IsEnum(empresas_tipo_empresa)
  tipo_empresa: empresas_tipo_empresa;

}