import { IsString } from 'class-validator';

export class ValidarDocumentoDto {

  @IsString()
  nombre_archivo!: string;

}