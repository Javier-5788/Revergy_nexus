import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CrearDocumentoVersionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  version_id!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  revision_id!: number;

  @IsOptional()
  @IsString()
  comentario?: string;
}