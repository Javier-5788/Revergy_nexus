import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CrearInfraestructuraDto {

  @IsString()
  @IsNotEmpty()
  codigo_infraestructura!: string;

  @IsString()
  @IsNotEmpty()
  nombre_infraestructura!: string;

}