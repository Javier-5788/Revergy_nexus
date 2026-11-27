import type {
  Documento,
} from "../types/documento.types";

export function construirArbol(
  documentos: Documento[],
) {

  return documentos.reduce(
    (acc, documento) => {

      const categoria =
        documento.categoria
          ?.nombre_categoria ??
        "Sin categoría";

      const tipo =
        documento.tipo_documento
          ?.nombre_documento ??
        "Sin tipo";

      if (
        !acc[categoria]
      ) {
        acc[categoria] = {};
      }

      if (
        !acc[categoria][tipo]
      ) {
        acc[categoria][tipo] = [];
      }

      acc[categoria][tipo]
        .push(documento);

      return acc;

    },
    {} as Record<
      string,
      Record<
        string,
        Documento[]
      >
    >,
  );

}