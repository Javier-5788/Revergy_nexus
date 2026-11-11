# Configuración de Prisma para Revergy Nexus

El backend utiliza Prisma ORM 7 y MariaDB. En Prisma, MariaDB se configura con `provider = "mysql"`.

## Requisitos

- Node.js 20.19 o superior (se recomienda una versión LTS vigente).
- npm.
- Una instancia MariaDB y una base de datos creada, por ejemplo `revergy_nexus`.

## Preparación

1. Abre una terminal en la carpeta `revergy-nexus-backend`.
2. Instala dependencias: `npm install`.
3. Copia `.env.example` como `.env` y configura `DATABASE_URL` con tus credenciales reales.
4. Valida el esquema: `npm run prisma:validate`.
5. Genera el cliente: `npm run prisma:generate`.

## Migraciones

Cuando agregues al menos un modelo a `prisma/schema.prisma`, crea la primera migración con:

```bash
npm run prisma:migrate:dev -- --name init
```

Para aplicar migraciones ya creadas en producción:

```bash
npm run prisma:migrate:deploy
```

Para abrir Prisma Studio:

```bash
npm run prisma:studio
```

## Importante

- El archivo `.env` no debe subirse a Git. Está ignorado por `.gitignore`.
- No compartas contraseñas ni URLs de conexión reales.
- El esquema inicial solo configura el generador y el proveedor de MariaDB; todavía no define tablas del negocio.
- El cliente generado queda en `src/generated/prisma` y no debe editarse manualmente.
