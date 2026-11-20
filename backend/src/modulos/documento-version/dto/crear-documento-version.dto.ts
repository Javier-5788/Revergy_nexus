import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CrearDocumentoVersionDto {

  @IsInt()
  documento_id!: number;

  @IsInt()
  version_id!: number;

  @IsInt()
  revision_id!: number;

  @IsString()
  ruta_archivo!: string;

  @IsOptional()
  @IsString()
  comentario?: string;

  @IsInt()
  usuario_id!: number;

}