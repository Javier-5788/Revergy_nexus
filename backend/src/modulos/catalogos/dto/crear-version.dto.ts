import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CrearVersionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_version!: string;

  @IsInt()
  @Min(0)
  orden_version!: number;

  @IsOptional()
  @IsBoolean()
  es_final?: boolean;
}