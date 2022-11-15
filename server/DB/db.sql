drop table if exists `usuarios`;

CREATE TABLE `usuarios` (
	`id_usu` int NOT NULL AUTO_INCREMENT,
  `nombre_usu` varchar(70) NOT NULL,
	`correo_usu` varchar(255) NOT NULL,
	`contra_usu` varchar(45) NOT NULL,
	PRIMARY KEY (`id_usu`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;