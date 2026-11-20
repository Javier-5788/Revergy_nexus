import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  console.log('Iniciando carga de catálogos...');

  //-----------------------------------
  // HITOS
  //-----------------------------------

  await prisma.hito.createMany({
    data: [

      {
        codigo_hito: 'LNTP',
        nombre_hito: 'Aviso limite para proceder',
      },

      {
        codigo_hito: 'NTP',
        nombre_hito: 'Aviso de inicio de obras',
      },

    ],
    skipDuplicates: true,
  });

  //-----------------------------------
  // INFRAESTRUCTURA
  //-----------------------------------

  await prisma.infraestructura.createMany({
    data: [

      {
        codigo_infraestructura: 'PV',
        nombre_infraestructura: 'Fotovoltaico',
      },

      {
        codigo_infraestructura: 'SEE',
        nombre_infraestructura: 'Subestacion Elevadora',
      },

      {
        codigo_infraestructura: 'SE',
        nombre_infraestructura: 'Subestacion Electrica',
      },

      {
        codigo_infraestructura: 'LAT',
        nombre_infraestructura: 'Linea Alta Tension',
      },

    ],
    skipDuplicates: true,
  });

  //-----------------------------------
  // FASE
  //-----------------------------------

  await prisma.fase.createMany({
    data: [

      { codigo_fase: 'CON', nombre_fase: 'Construccion' },

      { codigo_fase: 'COM', nombre_fase: 'Comisionamiento' },

      { codigo_fase: 'GEN', nombre_fase: 'General' },

      { codigo_fase: 'IND', nombre_fase: 'Ingenieria de detalle' },

      { codigo_fase: 'ING', nombre_fase: 'Ingenieria' },

      { codigo_fase: 'OPE', nombre_fase: 'Operacion' },

      { codigo_fase: 'OYM', nombre_fase: 'Operacion y mantenimiento' },

    ],
    skipDuplicates: true,
  });

  //-----------------------------------
  // CATEGORIA
  //-----------------------------------

await prisma.categoria.createMany({
  data: [

    { codigo_categoria: 'E&S', nombre_categoria: 'Ambiental y Social' },

    { codigo_categoria: 'AMB', nombre_categoria: 'Ambiental' },

    { codigo_categoria: 'CAL', nombre_categoria: 'Calidad QA/QC' },

    { codigo_categoria: 'CIV', nombre_categoria: 'Civil' },

    { codigo_categoria: 'CTR', nombre_categoria: 'Control' },

    { codigo_categoria: 'ELE', nombre_categoria: 'Electrico' },

    { codigo_categoria: 'EPR', nombre_categoria: 'Performance' },

    { codigo_categoria: 'FAC', nombre_categoria: 'Facturacion / Compra' },

    { codigo_categoria: 'GDP', nombre_categoria: 'Gestion de Proyecto' },

    { codigo_categoria: 'HSE', nombre_categoria: 'Seguridad y Salud' },

    { codigo_categoria: 'INS', nombre_categoria: 'Instrumentacion' },

    { codigo_categoria: 'ITT', nombre_categoria: 'Informatica' },

    { codigo_categoria: 'LEG', nombre_categoria: 'Legal' },

    { codigo_categoria: 'LOG', nombre_categoria: 'Logistica' },

    { codigo_categoria: 'MEC', nombre_categoria: 'Mecanico' },

    { codigo_categoria: 'MON', nombre_categoria: 'Monitoreo' },

    { codigo_categoria: 'RHT', nombre_categoria: 'Recursos Humanos y Talento' },

    { codigo_categoria: 'RYM', nombre_categoria: 'Regulacion y Mercados' },

  ],
  skipDuplicates: true,
});

  //-----------------------------------
  // TIPO DOCUMENTO
  //-----------------------------------

  await prisma.tipo_documento.createMany({
  data: [

    { codigo_documento: 'AR', nombre_documento: 'Acta de Reunion' },

    { codigo_documento: 'CA', nombre_documento: 'Cantidades BoQ' },

    { codigo_documento: 'CE', nombre_documento: 'Certificado' },

    { codigo_documento: 'CO', nombre_documento: 'Comunicacion' },

    { codigo_documento: 'CR', nombre_documento: 'Cronograma' },

    { codigo_documento: 'DO', nombre_documento: 'Documento Oficial' },

    { codigo_documento: 'ES', nombre_documento: 'Esquema' },

    { codigo_documento: 'ET', nombre_documento: 'Especificacion Tecnica' },

    { codigo_documento: 'FO', nombre_documento: 'Formulario' },

    { codigo_documento: 'HD', nombre_documento: 'Hoja de Datos' },

    { codigo_documento: 'IN', nombre_documento: 'Informe' },

    { codigo_documento: 'IS', nombre_documento: 'Instruccion' },

    { codigo_documento: 'LI', nombre_documento: 'Lista' },

    { codigo_documento: 'MC', nombre_documento: 'Memoria de Calculo' },

    { codigo_documento: 'MN', nombre_documento: 'Manual' },

    { codigo_documento: 'OC', nombre_documento: 'Orden de Cambio' },

    { codigo_documento: 'PG', nombre_documento: 'Plan' },

    { codigo_documento: 'PN', nombre_documento: 'Plano' },

    { codigo_documento: 'PO', nombre_documento: 'Orden de Compra' },

    { codigo_documento: 'PR', nombre_documento: 'Procedimiento' },

    { codigo_documento: 'PT', nombre_documento: 'Protocolo' },

    { codigo_documento: 'RQ', nombre_documento: 'Requerimiento' },

    { codigo_documento: 'SC', nombre_documento: 'Solicitud de Cambio' },

    { codigo_documento: 'TE', nombre_documento: 'Template' },

    { codigo_documento: 'VA', nombre_documento: 'Varios' },

  ],
  skipDuplicates: true,
});

  //-----------------------------------
  // VERSION
  //-----------------------------------
await prisma.version.createMany({
  data: [

    {
      codigo_version: 'DRAFT',
      orden_version: -1,
      es_final: false,
    },

    {
      codigo_version: '00',
      orden_version: 0,
      es_final: false,
    },

    {
      codigo_version: '01',
      orden_version: 1,
      es_final: false,
    },

    {
      codigo_version: '02',
      orden_version: 2,
      es_final: true,
    },

  ],
  skipDuplicates: true,
});


  //-----------------------------------
  // revision
  //-----------------------------------

  await prisma.revision.createMany({
  data: [

    {
      codigo_revision: 'A',
      orden_revision: 1,
    },

    {
      codigo_revision: 'B',
      orden_revision: 2,
    },

    {
      codigo_revision: 'C',
      orden_revision: 3,
    },

    {
      codigo_revision: 'D',
      orden_revision: 4,
    },

  ],
  skipDuplicates: true,
});

  //-----------------------------------
  // ESTADO DOCUMENTO
  //-----------------------------------

  await prisma.estado_documento.createMany({
  data: [

    {
      codigo_est_documento: 'BOR',
      nombre_estado_documento: 'Borrador',
    },

    {
      codigo_est_documento: 'REV',
      nombre_estado_documento: 'En Revision',
    },

    {
      codigo_est_documento: 'APR',
      nombre_estado_documento: 'Aprobado',
    },

    {
      codigo_est_documento: 'OBS',
      nombre_estado_documento: 'Con Observaciones',
    },

  ],
  skipDuplicates: true,
});

  //-----------------------------------
  // ESTADO COMENTARIO
  //-----------------------------------

  await prisma.estado_comentario.createMany({
  data: [

    {
      codigo_estado: 'ABI',
      nombre_estado: 'ABIERTO',
    },

    {
      codigo_estado: 'ATE',
      nombre_estado: 'ATENDIDO',
    },

    {
      codigo_estado: 'CER',
      nombre_estado: 'CERRADO',
    },

  ],
  skipDuplicates: true,
});

  console.log('Catálogos base cargados.');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });