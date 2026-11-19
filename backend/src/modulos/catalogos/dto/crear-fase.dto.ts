import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearFaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_fase!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_fase!: string;
}