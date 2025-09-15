-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 21:26:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vcm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `nivel` varchar(50) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id`, `nombre`, `nivel`, `fecha_creacion`) VALUES
(1, 'Vikingos', 'Oro', '2025-06-19 19:05:33'),
(2, 'Bichotas', 'Plata', '2025-06-19 19:05:33'),
(3, 'Apaches', 'Bronce', '2025-06-19 19:05:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `posicion` enum('opuesto','ala','central','colocador','libero') NOT NULL,
  `edad` int(11) NOT NULL,
  `estatura` int(11) NOT NULL,
  `peso` int(11) NOT NULL,
  `experiencia` int(11) NOT NULL,
  `lateralidad` enum('diestro','zurdo') NOT NULL DEFAULT 'diestro',
  `equipo_id` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `jugadores_por_equipo`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `jugadores_por_equipo` (
`id` int(11)
,`jugador_nombre` varchar(100)
,`posicion` enum('opuesto','ala','central','colocador','libero')
,`edad` int(11)
,`estatura` int(11)
,`peso` int(11)
,`experiencia` int(11)
,`lateralidad` enum('diestro','zurdo')
,`equipo_id` int(11)
,`equipo_nombre` varchar(100)
,`equipo_nivel` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `jugadores_por_equipo`
--
DROP TABLE IF EXISTS `jugadores_por_equipo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `jugadores_por_equipo`  AS SELECT `j`.`id` AS `id`, `j`.`nombre` AS `jugador_nombre`, `j`.`posicion` AS `posicion`, `j`.`edad` AS `edad`, `j`.`estatura` AS `estatura`, `j`.`peso` AS `peso`, `j`.`experiencia` AS `experiencia`, `j`.`lateralidad` AS `lateralidad`, `e`.`id` AS `equipo_id`, `e`.`nombre` AS `equipo_nombre`, `e`.`nivel` AS `equipo_nivel` FROM (`jugadores` `j` join `equipos` `e` on(`j`.`equipo_id` = `e`.`id`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD CONSTRAINT `jugadores_ibfk_1` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
