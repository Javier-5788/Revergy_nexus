import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_categoria!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_categoria!: string;
}