import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearComentarioDto {
  @IsInt()
  documento_id!: number;

  @IsInt()
  usuario_id!: number;

  @IsString()
  @IsNotEmpty()
  mensaje!: string;

  @IsOptional()
  @IsString()
  archivo_adjunto?: string;
}