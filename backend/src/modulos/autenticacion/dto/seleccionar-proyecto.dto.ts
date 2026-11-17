import { IsInt } from 'class-validator';

export class SeleccionarProyectoDto {

  @IsInt()
  proyecto_id!: number;

}