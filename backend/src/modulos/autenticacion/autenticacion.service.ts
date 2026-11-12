import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
public class AutenticacionService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { correo, password } = loginDto;

    // 1. Buscar el usuario por correo
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Verificar la contraseña
    const esPasswordValida = await bcrypt.compare(password, usuario.password);

    if (!esPasswordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Generar el token JWT
    const payload = { sub: usuario.id, correo: usuario.correo };
    const token = this.jwtService.sign(payload);

    return {
      mensaje: 'Inicio de sesión exitoso',
      access_token: token,
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
      },
    };
  }
}