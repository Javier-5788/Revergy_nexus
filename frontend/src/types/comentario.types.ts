export interface ComentarioDocumento {

  id_com_doc: number;

  mensaje: string;

  fecha: string;

  estado_comentario?: {

    id_estado_comentario: number;

    nombre_estado: string;

    codigo_estado: string;

  };

  usuario?: {

    id_usuario: number;

    nombre_usuario: string;

  };

}

export interface ComentarioProyecto {
  id_com_doc: number;

  mensaje: string;

  fecha: string;

  documento: {
    id_documento: number;
    codigo_documento: string;
    nombre_documento: string;
  };

  usuario: {
    nombre_usuario: string;
  };

  estado_comentario: {
    nombre_estado: string;
    codigo_estado: string;
  };
}
