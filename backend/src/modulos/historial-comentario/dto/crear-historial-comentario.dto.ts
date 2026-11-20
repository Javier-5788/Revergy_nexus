import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CrearHistorialComentarioDto {
  @IsInt()
  @Min(1)
  comentario_id!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  estado_anterior_id?: number;

  @IsInt()
  @Min(1)
  estado_nuevo_id!: number;

  @IsInt()
  @Min(1)
  usuario_id!: number;

  @IsOptional()
  @IsString()
  observacion?: string;
}