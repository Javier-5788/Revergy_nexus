export interface ProyectoResumen {
  id_proyecto: number;
  codigo_proyecto: string;
  nombre_proyecto: string;
  especialidad: string;
  estado_proyecto: string;
}

export interface ProyectoAsignado {
  proyecto: ProyectoResumen;
  rol: {
    nombre: string;
  };
}

export interface ProyectoActivo {
  proyecto_id: number;
  codigo_proyecto: string;
  nombre_proyecto: string;
  rol: string;
}