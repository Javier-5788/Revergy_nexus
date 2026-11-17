import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacionService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { correo_usuario, password} = loginDto;

    // 1. Buscar el usuario por correo
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo_usuario },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (usuario.estado_usuario !== 'Activo') {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Verificar la contraseña
    const esPasswordValida = await bcrypt.compare(password, usuario.password_hash);

    if (!esPasswordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Generar el token JWT
    const payload = { sub: usuario.id_usuario, correo_usuario: usuario.correo_usuario };
    const token = this.jwtService.sign(payload);

    return {
      mensaje: 'Inicio de sesión exitoso',
      access_token: token,
      usuario: {
        id_usuario: usuario.id_usuario,
        correo_usuario: usuario.correo_usuario,
      },
    };
  }

  async obtenerMisProyectos(usuarioId: number) {
  return this.prisma.usuario_proyecto.findMany({

    where: {
      usuario_id: usuarioId,
    },

    include: {

      proyecto: true,

      rol: true,

    },

    orderBy: {

      proyecto_id: 'asc',

    },

  });

  }

  async seleccionarProyecto(
  usuarioId: number,
  proyectoId: number,
) {

  const relacion =
    await this.prisma.usuario_proyecto.findFirst({

      where: {

        usuario_id: usuarioId,

        proyecto_id: proyectoId,

      },

      include: {

        proyecto: true,

        rol: true,

      },

    });

  if (!relacion) {

    throw new UnauthorizedException(
      'No tiene acceso a este proyecto',
    );

  }

  return {

    proyecto_id:
      relacion.proyecto.id_proyecto,

    codigo_proyecto:
      relacion.proyecto.codigo_proyecto,

    nombre_proyecto:
      relacion.proyecto.nombre_proyecto,

    rol:
      relacion.rol.nombre,

  };

}
}