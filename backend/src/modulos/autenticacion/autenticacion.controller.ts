import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LoginDto } from './dto/login.dto';
import { UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SeleccionarProyectoDto } from './dto/seleccionar-proyecto.dto';

@Controller('auth')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.autenticacionService.login(loginDto);
  }

  @Get('mis-proyectos')
  @UseGuards(JwtAuthGuard)
  async misProyectos(@Request()  req) {
    return this.autenticacionService.obtenerMisProyectos(
      req.user.userId,
    );
  }

  @Post('seleccionar-proyecto')
  @UseGuards(JwtAuthGuard)
  async seleccionarProyecto(@Request()  req,

  @Body()
    dto: SeleccionarProyectoDto,
) {

  return this.autenticacionService
    .seleccionarProyecto(
      req.user.userId,
      dto.proyecto_id,
    );

  }
}



