import {
  Controller,
  Get,
} from '@nestjs/common';

import { UsuarioService } from './usuario.service';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../autenticacion/guards/jwt-auth.guard';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuarioController {

  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  obtenerUsuarios() {

    return this.usuarioService.obtenerUsuarios();

  }

}
