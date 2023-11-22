-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: laboratorio
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `Matricula_A` int NOT NULL,
  `Nombres` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Apellidos` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Correo` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Carrera` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lista` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Matricula_A`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (201908756,'Gustavo','Hernandez Aparicio','gustavo.hernandeza@alumno.buap.mx','Ing. en Ciencias de la Computación',0),(201925870,'Pascual','Bartolo Torres','pascual.bartolo@alumno.buap.mx','Ing. en Ciencias de la Computación',0),(201928696,'David','Cruz Gonzalez','david.cruzgo@alumno.buap.mx','Ing. en Ciencias de la Computación',0),(201930012,'Victor Manuel','Jacobo Perez','victor.jacobo@alumno.buap.mx','Ing. en Ciencias de la Computación',0),(201939962,'Jose Guillermo','Mata Peña','jose.matape@alumno.buap.mx','Ing. en Ciencias de la Computación',0),(201946323,'Victor Hugo','Baez Gonzalez','victor.baezg@alumno.buap.mx','Ing. en Ciencias de la Computación',0),(201957529,'Carmen Citlalli','Tome  Romero','carmen.tome@alumno.buap.mx','Ing. en Ciencias de la Computación',0);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aministradores`
--

DROP TABLE IF EXISTS `aministradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aministradores` (
  `Matricula_Admin` int NOT NULL,
  `Nombres` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Apellidos` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Contraseña` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Matricula_Admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aministradores`
--

LOCK TABLES `aministradores` WRITE;
/*!40000 ALTER TABLE `aministradores` DISABLE KEYS */;
INSERT INTO `aministradores` VALUES (201908756,'Gustavo','Hernandez Aparicio','1234'),(201925870,'Pascual','Bartolo Torres','Quelesimporta.311221.'),(201928696,'David','Cruz Gonzalez','1234'),(201930012,'Victor Manuel','Jacobo Perez','1234'),(201939962,'Jose Gullermo','Mata Peña','1234'),(201946323,'Victor Hugo','Baez Gonzalez','1717'),(201957529,'Carmen Citlalli','Tome Romero','1406');
/*!40000 ALTER TABLE `aministradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipo`
--

DROP TABLE IF EXISTS `equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipo` (
  `idEquipo` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Marca` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Modelo` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `N_serie` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Tipo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Fecha_UP` datetime DEFAULT NULL,
  `Descripcion` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idEquipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES ('ELVI-001','NATIONAL INSTRUMENTS','NI ELVIS II','15F14FE','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-002','NATIONAL INSTRUMENTS','NI ELVIS II','15F151E','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-004','NATIONAL INSTRUMENTS','NI ELVIS II','15F1593','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-005','NATIONAL INSTRUMENTS','NI ELVIS II','15F150D','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-006','NATIONAL INSTRUMENTS','NI ELVIS II','15F1520','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-007','NATIONAL INSTRUMENTS','NI ELVIS II','15F1538','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-008','NATIONAL INSTRUMENTS','NI ELVIS II','1628ED3','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-009','NATIONAL INSTRUMENTS','NI ELVIS II','15F154A','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-010','NATIONAL INSTRUMENTS','NI ELVIS II','15F157B','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-011','NATIONAL INSTRUMENTS','NI ELVIS II','15F1556','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-012','NATIONAL INSTRUMENTS','NI ELVIS II','15F1518','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-013','NATIONAL INSTRUMENTS','NI ELVIS II','15F1831','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-014','NATIONAL INSTRUMENTS','NI ELVIS II','15F14D0','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-015','NATIONAL INSTRUMENTS','NI ELVIS II','15F1500','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-016','NATIONAL INSTRUMENTS','NI ELVIS II','15F14D6','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-017','NATIONAL INSTRUMENTS','NI ELVIS II','15D4C38','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-018','NATIONAL INSTRUMENTS','NI ELVIS II','15D4C60','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('ELVI-019','NATIONAL INSTRUMENTS','NI ELVIS II','15D4C67','Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI',NULL,NULL),('FADC-001','GwINSTEK','GPE-4323','GES894267','Fuente de Alimentacion DC',NULL,NULL),('FADC-002','GwINSTEK','GPE-4323','GES894279','Fuente de Alimentacion DC',NULL,NULL),('FADC-003','GwINSTEK','GPE-4323','GES894280','Fuente de Alimentacion DC',NULL,NULL),('FADC-004','GwINSTEK','GPE-4323','GES894263','Fuente de Alimentacion DC',NULL,NULL),('FADC-005','GwINSTEK','GPE-4323','GES892469','Fuente de Alimentacion DC',NULL,NULL),('FADC-006','GwINSTEK','GPE-4323','GES894260','Fuente de Alimentacion DC',NULL,NULL),('FADC-007','GwINSTEK','GPE-4323','GES894266','Fuente de Alimentacion DC',NULL,NULL),('FADC-008','GwINSTEK','GPD-3303D','GER815092','Fuente de Alimentacion DC',NULL,NULL),('FADC-009','GwINSTEK','GPD-3303D','GER815095','Fuente de Alimentacion DC',NULL,NULL),('FADC-010','GwINSTEK','GPD-3303D','GER815108','Fuente de Alimentacion DC',NULL,NULL),('FPGA-001','DILIGENT','NEXYS 4 DDR','00183E01FB6E','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-002','DILIGENT','NEXYS 4 DDR','00183E023EF1','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-003','DILIGENT','NEXYS 4 DDR','00183E025D9D','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-004','DILIGENT','NEXYS 4 DDR','00183E023FA1','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-005','DILIGENT','NEXYS 4 DDR','00183E0260D0','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-006','DILIGENT','NEXYS 4 DDR','00183E023EDD','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-007','DILIGENT','SPARTAN-3 STARTER KIT','D017455','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-008','DILIGENT','SPARTAN-3 STARTER KIT','D018578','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-009','INTESTC','AVANXE 7 ARTIX7-100T','AVA0120001','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-010','INTESTC','AVANXE 7 ARTIX7-100T','AVA0220001','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-011','INTESTC','AVANXE 7 ARTIX7-100T','AVA0220001','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-012','BUAP FCC ','STARTER KIT 1114',NULL,'Placa de Desarrollo FPGA',NULL,NULL),('FPGA-014','BUAP FCC ','STARTER KIT 1114',NULL,'Placa de Desarrollo FPGA',NULL,NULL),('FPGA-015','BUAP FCC ','STARTER KIT 1114',NULL,'Placa de Desarrollo FPGA',NULL,NULL),('FPGA-016','BUAP FCC ','STARTER KIT 1114',NULL,'Placa de Desarrollo FPGA',NULL,NULL),('FPGA-017','BUAP FCC ','STARTER KIT 1114',NULL,'Placa de Desarrollo FPGA',NULL,NULL),('FPGA-018','DIGILENT','BASYS 3','DB03B70','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-019','DIGILENT','BASYS 3','DB03D9F','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-020','DIGILENT','BASYS 3','DB03CAD','Placa de Desarrollo FPGA',NULL,NULL),('FPGA-021','DIGILENT','BASYS 3','DB03CAE','Placa de Desarrollo FPGA',NULL,NULL),('GDFD-001','TOPWARD','8150','708447','Generador Digital de Funciones Dulces',NULL,NULL),('GDFD-002','TOPWARD','8150','708600','Generador Digital de Funciones Dulces',NULL,NULL),('GDFD-003','TOPWARD','8150','708593','Generador Digital de Funciones Dulces',NULL,NULL),('GDFD-004','TOPWARD','8150','708539','Generador Digital de Funciones Dulces',NULL,NULL),('GDFD-005','BK PRECISION','3020','89-15839','Generador Digital de Funciones Dulces',NULL,NULL),('GEFA-001','GwINSTEK','AFG-2225','GER926857','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-002','GwINSTEK','AFG-2225','GER926855','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-003','GwINSTEK','AFG-2225','GES840683','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-004','GwINSTEK','AFG-2225','GES852802','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-005','GwINSTEK','AFG-2225','GES840684','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-006','GwINSTEK','AFG-2225','GES840654','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-007','GwINSTEK','AFG-2225','GES852794','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-008','GwINSTEK','AFG-2225','GER92860','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-009','GwINSTEK','AFG-2225','GER926852','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-010','GwINSTEK','AFG-2225','GER852796','Generador de Funciones Arbitrarias',NULL,NULL),('GEFA-011','GwINSTEK','AFG-2225','GES840656','Generador de Funciones Arbitrarias',NULL,NULL),('GEFU-001','GwINSTEK','GFG-8215A','CH810904','Generador de Funciones',NULL,NULL),('GEFU-002','GwINSTEK','GFG-8215A','CG820029','Generador de Funciones',NULL,NULL),('GEFU-003','GwINSTEK','GFG-8215A','CCH810822','Generador de Funciones',NULL,NULL),('GEFU-004','MATRIX','MFG-8250A','','Generador de Funciones',NULL,NULL),('GEFU-005','MATRIX','MFG-8250A','','Generador de Funciones',NULL,NULL),('GEFU-006','MATRIX','MFG-8250A','','Generador de Funciones',NULL,NULL),('GEFU-007','WAVETEK','FG2 A','403152','Generador de Funciones',NULL,NULL),('GEFU-008','WAVETEK','FG2 A','403204','Generador de Funciones',NULL,NULL),('GEFU-009','WAVETEK','FG2 A','403182','Generador de Funciones',NULL,NULL),('GEFU-010','WAVETEK','FG2 A','403245','Generador de Funciones',NULL,NULL),('GEFU-011','WAVETEK','FG2 A','403222','Generador de Funciones',NULL,NULL),('GEFU-012','WAVETEK','FG2 A','403201','Generador de Funciones',NULL,NULL),('GEFU-014','WAVETEK','FG2 A','403242','Generador de Funciones',NULL,NULL),('GEFU-015','DIGITAL LAB','IDL-800','10973','Generador de Funciones',NULL,NULL),('GEFU-016','DIGITAL LAB','IDL-800','32700','Generador de Funciones',NULL,NULL),('GEFU-017','DIGITAL LAB','IDL-800','10812','Generador de Funciones',NULL,NULL),('GEFU-018','DIGITAL LAB','IDL-800','10974','Generador de Funciones',NULL,NULL),('GEMU-001','BK PRECISION','4051','8020170','Generador Multifuncional',NULL,NULL),('GEMU-002','BK PRECISION','4051','8020170','Generador Multifuncional',NULL,NULL),('GEMU-003','BK PRECISION','4051','8020173','Generador Multifuncional',NULL,NULL),('MULT-001','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-002','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-003','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-004','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-005','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-006','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-007','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-008','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-009','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-010','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-011','STEREN','MUL-650',NULL,'Multimetro',NULL,NULL),('MULT-012','STEREN','MUL-450',NULL,'Multimetro',NULL,NULL),('MULT-013','STEREN','MUL-450',NULL,'Multimetro',NULL,NULL),('MULT-014','STEREN','MUL-450',NULL,'Multimetro',NULL,NULL),('MULT-015','STEREN','MUL-450',NULL,'Multimetro',NULL,NULL),('MULT-016','STEREN','MUL-450',NULL,'Multimetro',NULL,NULL),('MULT-017','STEREN','MUL-450',NULL,'Multimetro',NULL,NULL),('MULT-018','STEREN','MUL-450',NULL,'Multimetro',NULL,NULL),('MULT-019','STEREN','MUL-450',NULL,'Multimetro',NULL,NULL),('MULT-020','STEREN','MUL-600',NULL,'Multimetro',NULL,NULL),('MULT-021','STEREN','MUL-600',NULL,'Multimetro',NULL,NULL),('MULT-022','STEREN','MUL-600',NULL,'Multimetro',NULL,NULL),('MULT-023','STEREN','MUL-600',NULL,'Multimetro',NULL,NULL),('OSCP-001','RIGOL','DS1052D','DS1EU203100075','Osciloscopio',NULL,NULL),('OSCP-002','RIGOL','DS1052D','DS1EU201300030','Osciloscopio',NULL,NULL),('OSCP-003','RIGOL','DS1052D','DS1EU203100079','Osciloscopio',NULL,NULL),('OSCP-004','RIGOL','DS1052D','DS1EU203100080','Osciloscopio',NULL,NULL),('OSCP-005','TEKTRONIX','TDS 210','B038149','Osciloscopio',NULL,NULL),('OSCP-006','TEKTRONIX','TDS 210','B038148','Osciloscopio',NULL,NULL),('OSCP-007','TEKTRONIX','TDS 210','B038152','Osciloscopio',NULL,NULL),('OSCP-008','TEKTRONIX','TDS 210','BO38146','Osciloscopio',NULL,NULL),('OSCP-009','TEKTRONIX','TDS 210','B038143','Osciloscopio',NULL,NULL),('OSCP-010','TEKTRONIX','TDS 1001B','TDS1001B C051543','Osciloscopio',NULL,NULL),('OSCP-011','TEKTRONIX','2215',NULL,'Osciloscopio',NULL,NULL),('OSCP-012','TEKTRONIX','2215',NULL,'Osciloscopio',NULL,NULL),('PNZA-001','SIN MARCA','SIN MODELO',NULL,'Set de Pinzas',NULL,NULL),('PNZA-002','SIN MARCA','SIN MODELO',NULL,'Set de Pinzas',NULL,NULL),('PNZA-003','SIN MARCA','SIN MODELO',NULL,'Set de Pinzas',NULL,NULL),('PNZA-004','SIN MARCA','SIN MODELO',NULL,'Set de Pinzas',NULL,NULL),('SCPU-001','RASPBERRY PI','3B','524921','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-002','RASPBERRY PI','3B','515792','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-003','RASPBERRY PI','2B','506874','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-004','RASPBERRY PI','2B','507213','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-005','RASPBERRY PI','2B','506909','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-006','BEAGLEBOARD','BEAGLEBONE BLACK','000C1713BBBG1487','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-007','BEAGLEBOARD','BEAGLEBONE BLACK','000C1707BBBG1096','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-008','BEAGLEBOARD','BEAGLEBONE BLACK','000C1707BBBG1097','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-009','BEAGLEBOARD','BEAGLEBONE BLACK','000C1707BBBG1098','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-010','BEAGLEBOARD','BEAGLEBONE BLACK','000C1707BBBG1099','Serie de Computadoras de Placa Unica',NULL,NULL),('SCPU-011','BEAGLEBOARD','BEAGLEBONE BLACK','000C1707BBBG1100','Serie de Computadoras de Placa Unica',NULL,NULL);
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamos`
--

DROP TABLE IF EXISTS `prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamos` (
  `idPrestamos` int NOT NULL,
  `Matricula_A` int NOT NULL,
  `Matricula_Admin` int NOT NULL,
  `idEquipo` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Fecha_P` datetime DEFAULT NULL,
  `Fecha_D` datetime DEFAULT NULL,
  PRIMARY KEY (`idPrestamos`),
  KEY `idEquipo` (`idEquipo`),
  KEY `Matricula_A_idx` (`Matricula_A`),
  KEY `Matricula_Admin_idx` (`Matricula_Admin`),
  CONSTRAINT `idEquipo` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Matricula_A` FOREIGN KEY (`Matricula_A`) REFERENCES `alumnos` (`Matricula_A`),
  CONSTRAINT `Matricula_Admin` FOREIGN KEY (`Matricula_Admin`) REFERENCES `aministradores` (`Matricula_Admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-22 13:20:53
