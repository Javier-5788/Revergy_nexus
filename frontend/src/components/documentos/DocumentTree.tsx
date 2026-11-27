import {
  Paper,
} from "@mui/material";

import {
  SimpleTreeView,
  TreeItem,
} from "@mui/x-tree-view";

import type {
  Documento,
} from "../../types/documento.types";

import { construirArbol } from "../../utils/document-tree.util";

type Props = {
  documentos: Documento[];
  onSelectDocumento: (
    documentoId: number,
  ) => void;
};

export default function DocumentTree({
  documentos,
  onSelectDocumento,
}: Props) {

  const estructura =
    construirArbol(
      documentos,
    );

  return (

    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >

      <SimpleTreeView>

        {Object.entries(
          estructura,
        ).map(
          ([categoria,
            tipos]) => (

            <TreeItem
              key={categoria}
              itemId={
                categoria
              }
              label={
                categoria
              }
            >

              {Object.entries(
                tipos,
              ).map(
                ([tipo,
                  docs]) => (

                  <TreeItem
                    key={
                      `${categoria}-${tipo}`
                    }
                    itemId={
                      `${categoria}-${tipo}`
                    }
                    label={tipo}
                  >

                    {docs.map(
                      (
                        documento,
                      ) => (

                        <TreeItem
                          key={
                            documento.id_documento
                          }
                          itemId={
                            documento.id_documento.toString()
                          }
                          label={
                            documento.codigo_documento
                          }
                          onClick={() =>
                            onSelectDocumento(
                              documento.id_documento,
                            )
                          }
                        />

                      ),
                    )}

                  </TreeItem>

                ),
              )}

            </TreeItem>

          ),
        )}

      </SimpleTreeView>

    </Paper>

  );

}