export interface DocumentTreeNode {
  categoria: string;
  tipos: {
    nombre: string;
    documentos: string[];
  }[];
}