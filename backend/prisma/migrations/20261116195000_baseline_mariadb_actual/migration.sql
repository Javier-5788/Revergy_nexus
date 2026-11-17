-- CreateTable
CREATE TABLE `auditoria` (
    `id_auditoria` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NULL,
    `modulo` VARCHAR(100) NOT NULL,
    `accion` VARCHAR(50) NOT NULL,
    `registro_id` INTEGER NULL,
    `fecha_auditoria` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ip` VARCHAR(45) NOT NULL,
    `descripcion` TEXT NULL,

    INDEX `idx_auditoria_fecha`(`fecha_auditoria`),
    INDEX `idx_auditoria_modulo`(`modulo`),
    INDEX `idx_auditoria_usuario`(`usuario_id`),
    PRIMARY KEY (`id_auditoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_categoria` VARCHAR(50) NOT NULL,
    `nombre_categoria` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `uk_codigo_categoria`(`codigo_categoria`),
    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentario_documento` (
    `id_com_doc` INTEGER NOT NULL AUTO_INCREMENT,
    `documento_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `mensaje` TEXT NOT NULL,
    `archivo_adjunto` VARCHAR(500) NULL,
    `fecha` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `estado_comentario_id` INTEGER NULL,
    `usuario_atencion` INTEGER NULL,
    `fecha_atencion` DATETIME(0) NULL,
    `usuario_cierre` INTEGER NULL,
    `fecha_cierre` DATETIME(0) NULL,

    INDEX `idx_cd_documento`(`documento_id`),
    INDEX `idx_cd_usuario`(`usuario_id`),
    PRIMARY KEY (`id_com_doc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documento` (
    `id_documento` INTEGER NOT NULL AUTO_INCREMENT,
    `proyecto_id` INTEGER NOT NULL,
    `codigo_documento` VARCHAR(100) NOT NULL,
    `nombre_documento` VARCHAR(255) NOT NULL,
    `tipo_documento_id` INTEGER NOT NULL,
    `categoria_id` INTEGER NOT NULL,
    `infraestructura_id` INTEGER NOT NULL,
    `fase_id` INTEGER NOT NULL,
    `version_id` INTEGER NOT NULL,
    `revision_id` INTEGER NOT NULL,
    `consecutivo` INTEGER NOT NULL,
    `ruta_archivo` VARCHAR(500) NULL,
    `id_est_documento` INTEGER NOT NULL,
    `responsable_actual` INTEGER NULL,
    `fecha_creacion` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_doc_categoria`(`categoria_id`),
    INDEX `idx_doc_estado`(`id_est_documento`),
    INDEX `idx_doc_fase`(`fase_id`),
    INDEX `idx_doc_infraestructura`(`infraestructura_id`),
    INDEX `idx_doc_proyecto`(`proyecto_id`),
    INDEX `idx_doc_responsable`(`responsable_actual`),
    INDEX `idx_doc_revision`(`revision_id`),
    INDEX `idx_doc_tipo`(`tipo_documento_id`),
    INDEX `idx_doc_version`(`version_id`),
    UNIQUE INDEX `uk_proyecto_codigo_doc`(`proyecto_id`, `codigo_documento`),
    PRIMARY KEY (`id_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documento_version` (
    `id_doc_ver` INTEGER NOT NULL AUTO_INCREMENT,
    `documento_id` INTEGER NOT NULL,
    `version_id` INTEGER NOT NULL,
    `revision_id` INTEGER NOT NULL,
    `ruta_archivo` VARCHAR(500) NOT NULL,
    `comentario` TEXT NULL,
    `fecha_carga` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usuario_id` INTEGER NOT NULL,

    INDEX `idx_dv_documento`(`documento_id`),
    INDEX `idx_dv_revision`(`revision_id`),
    INDEX `idx_dv_usuario`(`usuario_id`),
    INDEX `idx_dv_version`(`version_id`),
    PRIMARY KEY (`id_doc_ver`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `codigo_empresa` VARCHAR(50) NOT NULL,
    `tipo_empresa` ENUM('Cliente', 'Contratista') NOT NULL,
    `estado_empresa` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    `fecha_creacion` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uk_codigo_empresa`(`codigo_empresa`),
    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entregable` (
    `id_entregable` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_entregable` VARCHAR(50) NOT NULL,
    `nombre_entregable` VARCHAR(255) NOT NULL,
    `tipo_documento_id` INTEGER NOT NULL,
    `estado_entregable` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',

    UNIQUE INDEX `uk_codigo_entregable`(`codigo_entregable`),
    INDEX `idx_entregable_tipo_doc`(`tipo_documento_id`),
    PRIMARY KEY (`id_entregable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado_comentario` (
    `id_estado_comentario` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_estado` VARCHAR(25) NULL,
    `nombre_estado` VARCHAR(100) NULL,

    PRIMARY KEY (`id_estado_comentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado_documento` (
    `id_est_documento` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_est_documento` VARCHAR(50) NOT NULL,
    `nombre_estado_documento` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `uk_codigo_est_doc`(`codigo_est_documento`),
    PRIMARY KEY (`id_est_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fase` (
    `id_fase` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_fase` VARCHAR(50) NOT NULL,
    `nombre_fase` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `uk_codigo_fase`(`codigo_fase`),
    PRIMARY KEY (`id_fase`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historial_comentario` (
    `id_historial_comentario` INTEGER NOT NULL AUTO_INCREMENT,
    `comentario_id` INTEGER NOT NULL,
    `estado_anterior_id` INTEGER NULL,
    `estado_nuevo_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `fecha_movimiento` DATETIME(0) NOT NULL,
    `observacion` TEXT NULL,

    PRIMARY KEY (`id_historial_comentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historial_responsabilidad` (
    `id_hist_responsabilidad` INTEGER NOT NULL AUTO_INCREMENT,
    `documento_id` INTEGER NOT NULL,
    `responsable_anterior` INTEGER NULL,
    `responsable_nuevo` INTEGER NOT NULL,
    `fecha_modificacion` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `comentario` TEXT NULL,

    INDEX `idx_hr_anterior`(`responsable_anterior`),
    INDEX `idx_hr_documento`(`documento_id`),
    INDEX `idx_hr_nuevo`(`responsable_nuevo`),
    PRIMARY KEY (`id_hist_responsabilidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `infraestructura` (
    `id_infraestructura` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_infraestructura` VARCHAR(50) NOT NULL,
    `nombre_infraestructura` VARCHAR(150) NOT NULL,
    `estado_infraestructura` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',

    UNIQUE INDEX `uk_codigo_infraestructura`(`codigo_infraestructura`),
    PRIMARY KEY (`id_infraestructura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyecto` (
    `id_proyecto` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa_cliente_id` INTEGER NOT NULL,
    `empresa_contratista_id` INTEGER NOT NULL,
    `nombre_proyecto` VARCHAR(255) NOT NULL,
    `codigo_proyecto` VARCHAR(50) NOT NULL,
    `especialidad` ENUM('Solar', 'Eolico', 'Bess', 'Sets') NOT NULL,
    `naturaleza_tecnica` ENUM('Gestion', 'Interventoria Ingenieria', 'Interventoria Construccion', 'Interventoria I+C') NOT NULL,
    `Tamaño` DECIMAL(10, 2) NULL,
    `version_final` VARCHAR(20) NOT NULL DEFAULT '0',
    `estado_proyecto` ENUM('Planificación', 'En Ejecución', 'Suspendido', 'Cerrado') NOT NULL DEFAULT 'Planificación',
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NULL,

    UNIQUE INDEX `uk_codigo_proyecto`(`codigo_proyecto`),
    INDEX `idx_proyecto_cliente`(`empresa_cliente_id`),
    INDEX `idx_proyecto_contratista`(`empresa_contratista_id`),
    PRIMARY KEY (`id_proyecto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyecto_componentes_codigo` (
    `id_pro_comp_cod` INTEGER NOT NULL AUTO_INCREMENT,
    `proyecto_id` INTEGER NOT NULL,
    `componente` VARCHAR(100) NOT NULL,
    `orden_pro_com_cod` INTEGER NOT NULL,
    `estado_pro_com_cod` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',

    INDEX `idx_pcc_proyecto`(`proyecto_id`),
    PRIMARY KEY (`id_pro_comp_cod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyecto_empresa` (
    `id_proyecto_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `proyecto_id` INTEGER NOT NULL,
    `empresa_id` INTEGER NOT NULL,
    `tipo_rol_empresa_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_proyecto_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyectos_entregable` (
    `id_proyecto_entregable` INTEGER NOT NULL AUTO_INCREMENT,
    `proyecto_id` INTEGER NOT NULL,
    `entregable_id` INTEGER NOT NULL,
    `obligatorio` BOOLEAN NOT NULL DEFAULT true,
    `responsable_inicial` VARCHAR(150) NULL,
    `estado` ENUM('Pendiente', 'En Proceso', 'Completado') NOT NULL DEFAULT 'Pendiente',

    INDEX `idx_pe_entregable`(`entregable_id`),
    INDEX `idx_pe_proyecto`(`proyecto_id`),
    UNIQUE INDEX `uk_proyecto_entregable`(`proyecto_id`, `entregable_id`),
    PRIMARY KEY (`id_proyecto_entregable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `revision` (
    `id_revision` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_revision` VARCHAR(20) NOT NULL,
    `orden_revision` INTEGER NOT NULL,

    UNIQUE INDEX `uk_codigo_revision`(`codigo_revision`),
    PRIMARY KEY (`id_revision`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,

    UNIQUE INDEX `uk_nombre_rol`(`nombre`),
    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_documento` (
    `id_tipo_documento` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_documento` VARCHAR(10) NOT NULL,
    `nombre_documento` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `uk_codigo_tipo_doc`(`codigo_documento`),
    PRIMARY KEY (`id_tipo_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_rol_empresa` (
    `id_tipo_rol_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_tipo_rol` VARCHAR(20) NOT NULL,
    `nombre_tipo_rol` VARCHAR(100) NOT NULL,
    `estado` ENUM('ACTIVO', 'INACTIVO') NULL DEFAULT 'ACTIVO',

    UNIQUE INDEX `codigo_tipo_rol`(`codigo_tipo_rol`),
    PRIMARY KEY (`id_tipo_rol_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tmt` (
    `id_tmt` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_tmt` VARCHAR(50) NOT NULL,
    `proyecto_id` INTEGER NOT NULL,
    `empresa_remitente_id` INTEGER NOT NULL,
    `empresa_destinatario_id` INTEGER NOT NULL,
    `usuario_generador_id` INTEGER NOT NULL,
    `fecha_generacion` DATETIME(0) NOT NULL,
    `fecha_recepcion` DATETIME(0) NULL,
    `estado_recepcion` ENUM('PENDIENTE', 'RECIBIDO') NULL DEFAULT 'PENDIENTE',
    `observaciones` TEXT NULL,

    UNIQUE INDEX `uk_codigo_tmt`(`codigo_tmt`),
    PRIMARY KEY (`id_tmt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tmt_detalle` (
    `id_tmt_detalle` INTEGER NOT NULL AUTO_INCREMENT,
    `tmt_id` INTEGER NOT NULL,
    `tipo_registro` ENUM('DOCUMENTO', 'COMENTARIO', 'CAMBIO_ESTADO') NOT NULL,
    `registro_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_tmt_detalle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(150) NOT NULL,
    `correo_usuario` VARCHAR(150) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `estado_usuario` ENUM('Activo', 'Inactivo', 'Bloqueado') NOT NULL DEFAULT 'Activo',

    UNIQUE INDEX `uk_correo_usuario`(`correo_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_proyecto` (
    `id_usuario_proyecto` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `proyecto_id` INTEGER NOT NULL,
    `rol_id` INTEGER NOT NULL,

    INDEX `idx_up_proyecto`(`proyecto_id`),
    INDEX `idx_up_rol`(`rol_id`),
    INDEX `idx_up_usuario`(`usuario_id`),
    UNIQUE INDEX `uk_usuario_proyecto_rol`(`usuario_id`, `proyecto_id`, `rol_id`),
    PRIMARY KEY (`id_usuario_proyecto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `version` (
    `id_version` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_version` VARCHAR(20) NOT NULL,
    `orden_version` INTEGER NOT NULL,
    `es_final` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `uk_codigo_version`(`codigo_version`),
    PRIMARY KEY (`id_version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auditoria` ADD CONSTRAINT `fk_auditoria_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentario_documento` ADD CONSTRAINT `fk_cd_documento` FOREIGN KEY (`documento_id`) REFERENCES `documento`(`id_documento`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentario_documento` ADD CONSTRAINT `fk_cd_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_estado` FOREIGN KEY (`id_est_documento`) REFERENCES `estado_documento`(`id_est_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_fase` FOREIGN KEY (`fase_id`) REFERENCES `fase`(`id_fase`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_infraestructura` FOREIGN KEY (`infraestructura_id`) REFERENCES `infraestructura`(`id_infraestructura`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto`(`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_responsable` FOREIGN KEY (`responsable_actual`) REFERENCES `usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_revision` FOREIGN KEY (`revision_id`) REFERENCES `revision`(`id_revision`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_tipo` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipo_documento`(`id_tipo_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `fk_doc_version` FOREIGN KEY (`version_id`) REFERENCES `version`(`id_version`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento_version` ADD CONSTRAINT `fk_dv_documento` FOREIGN KEY (`documento_id`) REFERENCES `documento`(`id_documento`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento_version` ADD CONSTRAINT `fk_dv_revision` FOREIGN KEY (`revision_id`) REFERENCES `revision`(`id_revision`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento_version` ADD CONSTRAINT `fk_dv_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento_version` ADD CONSTRAINT `fk_dv_version` FOREIGN KEY (`version_id`) REFERENCES `version`(`id_version`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entregable` ADD CONSTRAINT `fk_entregable_tipo_doc` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipo_documento`(`id_tipo_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_responsabilidad` ADD CONSTRAINT `fk_hr_anterior` FOREIGN KEY (`responsable_anterior`) REFERENCES `usuario`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_responsabilidad` ADD CONSTRAINT `fk_hr_documento` FOREIGN KEY (`documento_id`) REFERENCES `documento`(`id_documento`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_responsabilidad` ADD CONSTRAINT `fk_hr_nuevo` FOREIGN KEY (`responsable_nuevo`) REFERENCES `usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyecto` ADD CONSTRAINT `fk_proyecto_cliente` FOREIGN KEY (`empresa_cliente_id`) REFERENCES `empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyecto` ADD CONSTRAINT `fk_proyecto_contratista` FOREIGN KEY (`empresa_contratista_id`) REFERENCES `empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyecto_componentes_codigo` ADD CONSTRAINT `fk_pcc_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto`(`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyectos_entregable` ADD CONSTRAINT `fk_pe_entregable` FOREIGN KEY (`entregable_id`) REFERENCES `entregable`(`id_entregable`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyectos_entregable` ADD CONSTRAINT `fk_pe_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto`(`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_proyecto` ADD CONSTRAINT `fk_up_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyecto`(`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_proyecto` ADD CONSTRAINT `fk_up_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_proyecto` ADD CONSTRAINT `fk_up_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
