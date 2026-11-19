import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearTipoDocumentoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_documento!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_documento!: string;
}