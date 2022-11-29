CREATE DATABASE  IF NOT EXISTS `baro`;
USE `baro`;

DROP TABLE IF EXISTS `cobros_fre`;
DROP TABLE IF EXISTS `frecuentes`;
DROP TABLE IF EXISTS `diarios`;
DROP TABLE IF EXISTS `day`;
DROP TABLE IF EXISTS `semanas`;
DROP TABLE IF EXISTS `data_usuario`;
DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `usuId` int NOT NULL AUTO_INCREMENT,
  `usuEmail` varchar(50) NOT NULL,
  `usuPassword` varchar(300) NOT NULL,
  PRIMARY KEY (`usuId`),
  UNIQUE KEY `usuEmail_UNIQUE` (`usuEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `data_usuario` (
  `datId` int NOT NULL AUTO_INCREMENT,
  `datName` varchar(50) NOT NULL,
  `datPhoto` varchar(50) DEFAULT NULL,
  `datProfile` int DEFAULT 0,
  `datBalance` float DEFAULT 0,
  `usuId` int NOT NULL,
  PRIMARY KEY (`datId`),
  KEY `usuId_idx` (`usuId`),
  CONSTRAINT `usuIdDat` FOREIGN KEY (`usuId`) REFERENCES `usuario` (`usuId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `semanas` (
  `semId` int NOT NULL AUTO_INCREMENT,
  `semStart` date NOT NULL,
  `semEnd` date NOT NULL,
  `usuId` int NOT NULL,
  PRIMARY KEY (`semId`),
  KEY `usuId_idx` (`usuId`),
  CONSTRAINT `usuIdSem` FOREIGN KEY (`usuId`) REFERENCES `usuario` (`usuId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `day` (
  `dayId` int NOT NULL AUTO_INCREMENT,
  `dayDate` date NOT NULL,
  `semId` int NOT NULL,
  PRIMARY KEY (`dayId`),
  KEY `semIdDay_idx` (`semId`),
  CONSTRAINT `semIdDay` FOREIGN KEY (`semId`) REFERENCES `semanas` (`semId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `diarios` (
  `diaId` int NOT NULL AUTO_INCREMENT,
  `diaName` varchar(50) NOT NULL,
  `diaDescription` varchar(150) DEFAULT NULL,
  `diaAmount` float NOT NULL,
  `dayId` int NOT NULL,
  PRIMARY KEY (`diaId`),
  KEY `dayIdDia_idx` (`dayId`),
  CONSTRAINT `dayIdDia` FOREIGN KEY (`dayId`) REFERENCES `day` (`dayId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `frecuentes` (
  `freId` int NOT NULL AUTO_INCREMENT,
  `freName` varchar(50) NOT NULL,
  `freDescription` varchar(150) DEFAULT NULL,
  `freColor` varchar(50) DEFAULT NULL,
  `freAmount` float NOT NULL,
  `freLapse` int NOT NULL,
  `dayId` int NOT NULL,
  PRIMARY KEY (`freId`),
  KEY `dayIdFre_idx` (`dayId`),
  CONSTRAINT `dayIdFre` FOREIGN KEY (`dayId`) REFERENCES `day` (`dayId`) ON DELETE CASCADE
  KEY `usuIdFre_idx` (`usuId`),
  CONSTRAINT `dayIdFre` FOREIGN KEY (`usuId`) REFERENCES `day` (`usuId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `cobros_fre` (
  `cobId` int NOT NULL AUTO_INCREMENT,
  `cobDate` datetime NOT NULL,
  `freId` int NOT NULL,
  PRIMARY KEY (`cobId`),
  KEY `freIdCob_idx` (`freId`),
  CONSTRAINT `freIdCob` FOREIGN KEY (`freId`) REFERENCES `frecuentes` (`freId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;