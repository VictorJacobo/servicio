-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 22-11-2023 a las 09:23:45
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lab`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `Matricula_A` int(11) NOT NULL,
  `Nombres` varchar(45) NOT NULL,
  `Apellidos` varchar(45) NOT NULL,
  `Correo` varchar(45) NOT NULL,
  `Carrera` varchar(45) NOT NULL,
  `lista` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`Matricula_A`, `Nombres`, `Apellidos`, `Correo`, `Carrera`, `lista`) VALUES
(201930012, 'Victor Manuel', 'Jacobo Perez', 'victor.jacobo@alumno.buap.mx', 'Ing. en Ciencias de la Computación', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aministradores`
--

CREATE TABLE `aministradores` (
  `Matricula_Admin` int(11) NOT NULL,
  `Nombres` varchar(45) NOT NULL,
  `Apellidos` varchar(45) NOT NULL,
  `contrasena` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `aministradores`
--

INSERT INTO `aministradores` (`Matricula_Admin`, `Nombres`, `Apellidos`, `contrasena`) VALUES
(201930012, 'Victor Manuel', 'Jacobo Perez', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `idEquipo` varchar(10) NOT NULL,
  `Marca` varchar(45) NOT NULL,
  `Modelo` varchar(45) NOT NULL,
  `N_serie` varchar(45) DEFAULT NULL,
  `Tipo` varchar(100) NOT NULL,
  `Fecha_UP` datetime DEFAULT NULL,
  `Descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`idEquipo`, `Marca`, `Modelo`, `N_serie`, `Tipo`, `Fecha_UP`, `Descripcion`) VALUES
('ELVI-001', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F14FE', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-002', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F151E', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-004', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F1593', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-005', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F150D', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-006', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F1520', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-007', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F1538', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-008', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '1628ED3', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-009', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F154A', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-010', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F157B', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-011', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F1556', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-012', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F1518', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-013', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F1831', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-014', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F14D0', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-015', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F1500', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-016', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15F14D6', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-017', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15D4C38', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-018', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15D4C60', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('ELVI-019', 'NATIONAL INSTRUMENTS', 'NI ELVIS II', '15D4C67', 'Suite de Instrumentación Virtual del Laboratorio de Ingeniería de NI', NULL, NULL),
('FADC-001', 'GwINSTEK', 'GPE-4323', 'GES894267', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-002', 'GwINSTEK', 'GPE-4323', 'GES894279', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-003', 'GwINSTEK', 'GPE-4323', 'GES894280', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-004', 'GwINSTEK', 'GPE-4323', 'GES894263', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-005', 'GwINSTEK', 'GPE-4323', 'GES892469', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-006', 'GwINSTEK', 'GPE-4323', 'GES894260', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-007', 'GwINSTEK', 'GPE-4323', 'GES894266', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-008', 'GwINSTEK', 'GPD-3303D', 'GER815092', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-009', 'GwINSTEK', 'GPD-3303D', 'GER815095', 'Fuente de Alimentacion DC', NULL, NULL),
('FADC-010', 'GwINSTEK', 'GPD-3303D', 'GER815108', 'Fuente de Alimentacion DC', NULL, NULL),
('FPGA-001', 'DILIGENT', 'NEXYS 4 DDR', '00183E01FB6E', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-002', 'DILIGENT', 'NEXYS 4 DDR', '00183E023EF1', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-003', 'DILIGENT', 'NEXYS 4 DDR', '00183E025D9D', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-004', 'DILIGENT', 'NEXYS 4 DDR', '00183E023FA1', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-005', 'DILIGENT', 'NEXYS 4 DDR', '00183E0260D0', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-006', 'DILIGENT', 'NEXYS 4 DDR', '00183E023EDD', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-007', 'DILIGENT', 'SPARTAN-3 STARTER KIT', 'D017455', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-008', 'DILIGENT', 'SPARTAN-3 STARTER KIT', 'D018578', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-009', 'INTESTC', 'AVANXE 7 ARTIX7-100T', 'AVA0120001', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-010', 'INTESTC', 'AVANXE 7 ARTIX7-100T', 'AVA0220001', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-011', 'INTESTC', 'AVANXE 7 ARTIX7-100T', 'AVA0220001', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-012', 'BUAP FCC ', 'STARTER KIT 1114', NULL, 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-014', 'BUAP FCC ', 'STARTER KIT 1114', NULL, 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-015', 'BUAP FCC ', 'STARTER KIT 1114', NULL, 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-016', 'BUAP FCC ', 'STARTER KIT 1114', NULL, 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-017', 'BUAP FCC ', 'STARTER KIT 1114', NULL, 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-018', 'DIGILENT', 'BASYS 3', 'DB03B70', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-019', 'DIGILENT', 'BASYS 3', 'DB03D9F', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-020', 'DIGILENT', 'BASYS 3', 'DB03CAD', 'Placa de Desarrollo FPGA', NULL, NULL),
('FPGA-021', 'DIGILENT', 'BASYS 3', 'DB03CAE', 'Placa de Desarrollo FPGA', NULL, NULL),
('GDFD-001', 'TOPWARD', '8150', '708447', 'Generador Digital de Funciones Dulces', NULL, NULL),
('GDFD-002', 'TOPWARD', '8150', '708600', 'Generador Digital de Funciones Dulces', NULL, NULL),
('GDFD-003', 'TOPWARD', '8150', '708593', 'Generador Digital de Funciones Dulces', NULL, NULL),
('GDFD-004', 'TOPWARD', '8150', '708539', 'Generador Digital de Funciones Dulces', NULL, NULL),
('GDFD-005', 'BK PRECISION', '3020', '89-15839', 'Generador Digital de Funciones Dulces', NULL, NULL),
('GEFA-001', 'GwINSTEK', 'AFG-2225', 'GER926857', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-002', 'GwINSTEK', 'AFG-2225', 'GER926855', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-003', 'GwINSTEK', 'AFG-2225', 'GES840683', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-004', 'GwINSTEK', 'AFG-2225', 'GES852802', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-005', 'GwINSTEK', 'AFG-2225', 'GES840684', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-006', 'GwINSTEK', 'AFG-2225', 'GES840654', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-007', 'GwINSTEK', 'AFG-2225', 'GES852794', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-008', 'GwINSTEK', 'AFG-2225', 'GER92860', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-009', 'GwINSTEK', 'AFG-2225', 'GER926852', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-010', 'GwINSTEK', 'AFG-2225', 'GER852796', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFA-011', 'GwINSTEK', 'AFG-2225', 'GES840656', 'Generador de Funciones Arbitrarias', NULL, NULL),
('GEFU-001', 'GwINSTEK', 'GFG-8215A', 'CH810904', 'Generador de Funciones', NULL, NULL),
('GEFU-002', 'GwINSTEK', 'GFG-8215A', 'CG820029', 'Generador de Funciones', NULL, NULL),
('GEFU-003', 'GwINSTEK', 'GFG-8215A', 'CCH810822', 'Generador de Funciones', NULL, NULL),
('GEFU-004', 'MATRIX', 'MFG-8250A', '', 'Generador de Funciones', NULL, NULL),
('GEFU-005', 'MATRIX', 'MFG-8250A', '', 'Generador de Funciones', NULL, NULL),
('GEFU-006', 'MATRIX', 'MFG-8250A', '', 'Generador de Funciones', NULL, NULL),
('GEFU-007', 'WAVETEK', 'FG2 A', '403152', 'Generador de Funciones', NULL, NULL),
('GEFU-008', 'WAVETEK', 'FG2 A', '403204', 'Generador de Funciones', NULL, NULL),
('GEFU-009', 'WAVETEK', 'FG2 A', '403182', 'Generador de Funciones', NULL, NULL),
('GEFU-010', 'WAVETEK', 'FG2 A', '403245', 'Generador de Funciones', NULL, NULL),
('GEFU-011', 'WAVETEK', 'FG2 A', '403222', 'Generador de Funciones', NULL, NULL),
('GEFU-012', 'WAVETEK', 'FG2 A', '403201', 'Generador de Funciones', NULL, NULL),
('GEFU-014', 'WAVETEK', 'FG2 A', '403242', 'Generador de Funciones', NULL, NULL),
('GEFU-015', 'DIGITAL LAB', 'IDL-800', '10973', 'Generador de Funciones', NULL, NULL),
('GEFU-016', 'DIGITAL LAB', 'IDL-800', '32700', 'Generador de Funciones', NULL, NULL),
('GEFU-017', 'DIGITAL LAB', 'IDL-800', '10812', 'Generador de Funciones', NULL, NULL),
('GEFU-018', 'DIGITAL LAB', 'IDL-800', '10974', 'Generador de Funciones', NULL, NULL),
('GEMU-001', 'BK PRECISION', '4051', '8020170', 'Generador Multifuncional', NULL, NULL),
('GEMU-002', 'BK PRECISION', '4051', '8020170', 'Generador Multifuncional', NULL, NULL),
('GEMU-003', 'BK PRECISION', '4051', '8020173', 'Generador Multifuncional', NULL, NULL),
('MULT-001', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-002', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-003', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-004', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-005', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-006', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-007', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-008', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-009', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-010', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-011', 'STEREN', 'MUL-650', NULL, 'Multimetro', NULL, NULL),
('MULT-012', 'STEREN', 'MUL-450', NULL, 'Multimetro', NULL, NULL),
('MULT-013', 'STEREN', 'MUL-450', NULL, 'Multimetro', NULL, NULL),
('MULT-014', 'STEREN', 'MUL-450', NULL, 'Multimetro', NULL, NULL),
('MULT-015', 'STEREN', 'MUL-450', NULL, 'Multimetro', NULL, NULL),
('MULT-016', 'STEREN', 'MUL-450', NULL, 'Multimetro', NULL, NULL),
('MULT-017', 'STEREN', 'MUL-450', NULL, 'Multimetro', NULL, NULL),
('MULT-018', 'STEREN', 'MUL-450', NULL, 'Multimetro', NULL, NULL),
('MULT-019', 'STEREN', 'MUL-450', NULL, 'Multimetro', NULL, NULL),
('MULT-020', 'STEREN', 'MUL-600', NULL, 'Multimetro', NULL, NULL),
('MULT-021', 'STEREN', 'MUL-600', NULL, 'Multimetro', NULL, NULL),
('MULT-022', 'STEREN', 'MUL-600', NULL, 'Multimetro', NULL, NULL),
('MULT-023', 'STEREN', 'MUL-600', NULL, 'Multimetro', NULL, NULL),
('OSCP-001', 'RIGOL', 'DS1052D', 'DS1EU203100075', 'Osciloscopio', NULL, NULL),
('OSCP-002', 'RIGOL', 'DS1052D', 'DS1EU201300030', 'Osciloscopio', NULL, NULL),
('OSCP-003', 'RIGOL', 'DS1052D', 'DS1EU203100079', 'Osciloscopio', NULL, NULL),
('OSCP-004', 'RIGOL', 'DS1052D', 'DS1EU203100080', 'Osciloscopio', NULL, NULL),
('OSCP-005', 'TEKTRONIX', 'TDS 210', 'B038149', 'Osciloscopio', NULL, NULL),
('OSCP-006', 'TEKTRONIX', 'TDS 210', 'B038148', 'Osciloscopio', NULL, NULL),
('OSCP-007', 'TEKTRONIX', 'TDS 210', 'B038152', 'Osciloscopio', NULL, NULL),
('OSCP-008', 'TEKTRONIX', 'TDS 210', 'BO38146', 'Osciloscopio', NULL, NULL),
('OSCP-009', 'TEKTRONIX', 'TDS 210', 'B038143', 'Osciloscopio', NULL, NULL),
('OSCP-010', 'TEKTRONIX', 'TDS 1001B', 'TDS1001B C051543', 'Osciloscopio', NULL, NULL),
('OSCP-011', 'TEKTRONIX', '2215', NULL, 'Osciloscopio', NULL, NULL),
('OSCP-012', 'TEKTRONIX', '2215', NULL, 'Osciloscopio', NULL, NULL),
('PNZA-001', 'SIN MARCA', 'SIN MODELO', NULL, 'Set de Pinzas', NULL, NULL),
('PNZA-002', 'SIN MARCA', 'SIN MODELO', NULL, 'Set de Pinzas', NULL, NULL),
('PNZA-003', 'SIN MARCA', 'SIN MODELO', NULL, 'Set de Pinzas', NULL, NULL),
('PNZA-004', 'SIN MARCA', 'SIN MODELO', NULL, 'Set de Pinzas', NULL, NULL),
('SCPU-001', 'RASPBERRY PI', '3B', '524921', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-002', 'RASPBERRY PI', '3B', '515792', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-003', 'RASPBERRY PI', '2B', '506874', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-004', 'RASPBERRY PI', '2B', '507213', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-005', 'RASPBERRY PI', '2B', '506909', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-006', 'BEAGLEBOARD', 'BEAGLEBONE BLACK', '000C1713BBBG1487', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-007', 'BEAGLEBOARD', 'BEAGLEBONE BLACK', '000C1707BBBG1096', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-008', 'BEAGLEBOARD', 'BEAGLEBONE BLACK', '000C1707BBBG1097', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-009', 'BEAGLEBOARD', 'BEAGLEBONE BLACK', '000C1707BBBG1098', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-010', 'BEAGLEBOARD', 'BEAGLEBONE BLACK', '000C1707BBBG1099', 'Serie de Computadoras de Placa Unica', NULL, NULL),
('SCPU-011', 'BEAGLEBOARD', 'BEAGLEBONE BLACK', '000C1707BBBG1100', 'Serie de Computadoras de Placa Unica', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `idPresta` int(11) NOT NULL,
  `Matricula_A` int(11) NOT NULL,
  `Matricula_Admin` int(11) NOT NULL,
  `IdEquipo` varchar(45) NOT NULL,
  `Fecha_P` datetime DEFAULT NULL,
  `Fecha_D` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestamos`
--

INSERT INTO `prestamos` (`idPresta`, `Matricula_A`, `Matricula_Admin`, `IdEquipo`, `Fecha_P`, `Fecha_D`) VALUES
(1, 201930012, 201930012, 'ELVI-001', '2023-11-22 08:22:31', NULL),
(2, 201930012, 201930012, 'ELVI-001', '2023-11-22 08:23:11', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`Matricula_A`);

--
-- Indices de la tabla `aministradores`
--
ALTER TABLE `aministradores`
  ADD PRIMARY KEY (`Matricula_Admin`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`idEquipo`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`idPresta`),
  ADD KEY `Matricula_A` (`Matricula_A`),
  ADD KEY `Matricula_Admin` (`Matricula_Admin`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `idPresta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`Matricula_A`) REFERENCES `alumnos` (`Matricula_A`) ON UPDATE CASCADE,
  ADD CONSTRAINT `prestamos_ibfk_2` FOREIGN KEY (`Matricula_Admin`) REFERENCES `aministradores` (`Matricula_Admin`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
