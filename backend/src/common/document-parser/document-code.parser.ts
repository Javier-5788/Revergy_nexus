export class DocumentCodeParser {
  static parse(fileName: string) {
    const limpio = fileName
      .replace('.pdf', '')
      .replace('.xlsx', '')
      .replace('.dwg', '')
      .replace('.docx', '');

    const partes = limpio.split('-');

    if (partes.length < 8) {
      throw new Error(
        'Formato documental inválido',
      );
    }

    return {
      proyecto: partes[0],
      infraestructura: partes[1],
      fase: partes[2],
      categoria: partes[3],
      tipo_documento: partes[4],
      consecutivo: partes[5],
      version: partes[6].replace('V', ''),
      revision: partes[7],
    };
  }
}