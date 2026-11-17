import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import {
  proyecto_especialidad,
  proyecto_naturaleza_tecnica,
  proyecto_estado_proyecto,
} from '@prisma/client';

export class CrearProyectoDto {

  @IsNumber()
  empresa_cliente_id: number;

  @IsNumber()
  empresa_contratista_id: number;

  @IsString()
  @IsNotEmpty()
  nombre_proyecto: string;

  @IsString()
  @IsNotEmpty()
  codigo_proyecto: string;

  @IsEnum(proyecto_especialidad)
  especialidad: proyecto_especialidad;

  @IsEnum(proyecto_naturaleza_tecnica)
  naturaleza_tecnica: proyecto_naturaleza_tecnica;

  @IsOptional()
  @IsNumber()
  tamano_mwp?: number;

  @IsString()
  @IsNotEmpty()
  version_final: string;

  @IsEnum(proyecto_estado_proyecto)
  estado_proyecto: proyecto_estado_proyecto;

  @IsDateString()
  fecha_inicio: string;

  @IsOptional()
  @IsDateString()
  fecha_fin?: string;
}