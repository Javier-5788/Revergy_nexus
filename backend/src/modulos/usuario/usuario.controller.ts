import {
  Controller,
  Get,
} from '@nestjs/common';

import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {

  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  obtenerUsuarios() {

    return this.usuarioService.obtenerUsuarios();

  }

}
