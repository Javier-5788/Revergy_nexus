-- CreateTable
CREATE TABLE `empresas` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `codigo_empresa` VARCHAR(50) NOT NULL,
    `tipo_empresa` ENUM('CLIENTE', 'CONTRATISTA') NOT NULL,
    `estado_empresa` ENUM('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO',
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `empresas_codigo_empresa_key`(`codigo_empresa`),
    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(150) NOT NULL,
    `correo_usuario` VARCHAR(150) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `estado_usuario` ENUM('ACTIVO', 'INACTIVO', 'BLOQUEADO') NOT NULL DEFAULT 'ACTIVO',

    UNIQUE INDEX `usuario_correo_usuario_key`(`correo_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    UNIQUE INDEX `rol_nombre_key`(`nombre`),
    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyecto` (
    `id_proyecto` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_cliente_id` INTEGER NOT NULL,
    `empresa_contratista_id` INTEGER NOT NULL,
    `nombre_proyecto` VARCHAR(191) NOT NULL,
    `codigo_proyecto` VARCHAR(191) NOT NULL,
    `especialidad` ENUM('SOLAR', 'EOLICO', 'BESS', 'SETS') NOT NULL,
    `naturaleza_tecnica` ENUM('GESTION', 'INTERVENTORIA_INGENIERIA', 'INTERVENTORIA_CONSTRUCCION', 'INTERVENTORIA_IC') NOT NULL,
    `tamano_mwp` DECIMAL(10, 2) NULL,
    `version_final` VARCHAR(191) NOT NULL,
    `estado_proyecto` ENUM('PLANIFICADO', 'EJECUCION', 'OPERACION', 'CIERRE') NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NULL,

    UNIQUE INDEX `proyecto_codigo_proyecto_key`(`codigo_proyecto`),
    PRIMARY KEY (`id_proyecto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_proyecto` (
    `id_usuario_proyecto` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `proyecto_id` INTEGER NOT NULL,
    `rol_id` INTEGER NOT NULL,

    UNIQUE INDEX `usuario_proyecto_usuario_id_proyecto_id_rol_id_key`(`usuario_id`, `proyecto_id`, `rol_id`),
    PRIMARY KEY (`id_usuario_proyecto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `proyecto` ADD CONSTRAINT `proyecto_empresa_cliente_id_fkey` FOREIGN KEY (`empresa_cliente_id`) REFERENCES `empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyecto` ADD CONSTRAINT `proyecto_empresa_contratista_id_fkey` FOREIGN KEY (`empresa_contratista_id`) REFERENCES `empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_proyecto` ADD CONSTRAINT `usuario_proyecto_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_proyecto` ADD CONSTRAINT `usuario_proyecto_proyecto_id_fkey` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto`(`id_proyecto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_proyecto` ADD CONSTRAINT `usuario_proyecto_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `rol`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;
