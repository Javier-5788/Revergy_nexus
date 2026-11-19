import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearEstadoDocumentoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_est_documento!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_estado_documento!: string;
}