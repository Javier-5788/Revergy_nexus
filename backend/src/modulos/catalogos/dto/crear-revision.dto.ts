import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CrearRevisionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_revision!: string;

  @IsInt()
  @Min(0)
  orden_revision!: number;
}