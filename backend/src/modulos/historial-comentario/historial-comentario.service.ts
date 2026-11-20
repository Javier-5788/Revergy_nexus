import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearHistorialComentarioDto } from './dto/crear-historial-comentario.dto';

@Injectable()
export class HistorialComentarioService {
    constructor(private readonly prisma: PrismaService) { }

    async registrarMovimiento(dto: CrearHistorialComentarioDto) {
        if (
            dto.estado_anterior_id ===
            dto.estado_nuevo_id
        ) {

            throw new BadRequestException(
                'El estado anterior y el nuevo no pueden ser iguales',
            );

        }
        return this.prisma.historial_comentario.create({
            data: {
                comentario_id: dto.comentario_id,
                estado_anterior_id: dto.estado_anterior_id ?? null,
                estado_nuevo_id: dto.estado_nuevo_id,
                usuario_id: dto.usuario_id,
                fecha_movimiento: new Date(),
                observacion: dto.observacion ?? null,
            },
        });
    }

    async obtenerHistorialComentario(comentarioId: number) {
        return this.prisma.historial_comentario.findMany({
            where: {
                comentario_id: comentarioId,
            },
            include: {
                usuario: true,
                estado_comentario_historial_comentario_estado_anterior_idToestado_comentario: true,
                estado_comentario_historial_comentario_estado_nuevo_idToestado_comentario: true,
                comentario_documento: true,
            },
            orderBy: {
                fecha_movimiento: 'asc',
            },
        });
    }
}