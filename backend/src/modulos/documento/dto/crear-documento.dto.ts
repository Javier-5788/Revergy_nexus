import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CrearDocumentoDto {

  @IsInt()
  proyecto_id!: number;

  @IsString()
  @IsNotEmpty()
  codigo_documento!: string;

  @IsString()
  @IsNotEmpty()
  nombre_documento!: string;

  @IsInt()
  tipo_documento_id!: number;

  @IsInt()
  categoria_id!: number;

  @IsInt()
  infraestructura_id!: number;

  @IsInt()
  fase_id!: number;

  @IsInt()
  version_id!: number;

  @IsInt()
  revision_id!: number;

  @IsInt()
  consecutivo!: number;

  @IsInt()
  id_est_documento!: number;

  @IsOptional()
  @IsInt()
  responsable_actual?: number;

}
