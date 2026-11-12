import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsuarioService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async obtenerUsuarios() {

    return this.prisma.usuario.findMany();

  }

}
