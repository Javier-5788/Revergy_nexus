export interface Documento {
  id_documento: number;

  codigo_documento: string;

  nombre_documento: string;

  fecha_creacion: string;

categoria: {
  id_categoria: number;
  nombre_categoria: string;
};

tipo_documento: {
  id_tipo_documento: number;
  nombre_documento: string;
};

version: {
  codigo_version: string;
};

revision: {
  codigo_revision: string;
};


  estado_documento: {
    nombre_estado_documento: string;
  };
}


export interface DocumentoVersionHistorial {
  id_doc_ver: number;
  fecha_carga: string;
  comentario: string | null;
  version: {
    codigo_version: string;
  };
  revision: {
    codigo_revision: string;
  };
  usuario: {
    nombre_usuario: string;
  };
}

export interface DocumentoDetalle extends Documento {
  categoria: {
    id_categoria: number;
    nombre_categoria: string;
  };
  fase: {
    nombre_fase: string;
  };
  infraestructura: {
    nombre_infraestructura: string;
  };
  version: {
    codigo_version: string;
  };
  revision: {
    codigo_revision: string;
  };
  documento_version: DocumentoVersionHistorial[];
}