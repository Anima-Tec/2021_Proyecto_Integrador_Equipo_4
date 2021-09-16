-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2021 at 03:40 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olla_popular`
--

-- --------------------------------------------------------

--
-- Table structure for table `donacion`
--

CREATE TABLE `donacion` (
  `idDonacion` int(11) NOT NULL,
  `idOlla` int(11) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipoDonacion` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donacion`
--

INSERT INTO `donacion` (`idDonacion`, `idOlla`, `email`, `fecha`, `tipoDonacion`) VALUES
(1, 1, 'marcoscapo@gmail.com', '2021-08-31', 'Dinero'),
(2, 1, 'benitogarcia@gmail.com', '2021-09-15', 'Dinero'),
(3, 1, 'benitogarcia@gmail.com', '2021-09-15', 'Dinero');

-- --------------------------------------------------------

--
-- Table structure for table `olla`
--

CREATE TABLE `olla` (
  `idOlla` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `autor` varchar(30) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `latitud` float DEFAULT NULL,
  `longitud` float DEFAULT NULL,
  `horarioApertura` time DEFAULT NULL,
  `horarioCierre` time DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `olla`
--

INSERT INTO `olla` (`idOlla`, `nombre`, `autor`, `descripcion`, `latitud`, `longitud`, `horarioApertura`, `horarioCierre`, `estado`) VALUES
(1, 'Olla Benito]', 'benitogarcia@gmail.com', 'Una olla para toda la familia, ofrecemos un plato de comida para las familias uruguayas del barrio Aguada.', -34.9087, -56.191, '21:00:00', '23:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_account_activation`
--

CREATE TABLE `user_account_activation` (
  `userEmail` varchar(50) NOT NULL,
  `expiration` datetime NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `correo` varchar(30) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellido` varchar(30) DEFAULT NULL,
  `passwd` varchar(30) DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`correo`, `nombre`, `apellido`, `passwd`, `state`) VALUES
('1@gmail.com', 'Kevin', 'Mora Pais', '12345', 0),
('benitogarcia@gmail.com', 'Benito', 'Garcia', '12345', 1),
('marcoscapo@gmail.com', 'Marcos', 'Capo', '12345', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donacion`
--
ALTER TABLE `donacion`
  ADD PRIMARY KEY (`idDonacion`),
  ADD KEY `idOlla` (`idOlla`);

--
-- Indexes for table `olla`
--
ALTER TABLE `olla`
  ADD PRIMARY KEY (`idOlla`),
  ADD KEY `autor` (`autor`);

--
-- Indexes for table `user_account_activation`
--
ALTER TABLE `user_account_activation`
  ADD PRIMARY KEY (`userEmail`,`expiration`,`value`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`correo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donacion`
--
ALTER TABLE `donacion`
  MODIFY `idDonacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `olla`
--
ALTER TABLE `olla`
  MODIFY `idOlla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donacion`
--
ALTER TABLE `donacion`
  ADD CONSTRAINT `donacion_ibfk_1` FOREIGN KEY (`idOlla`) REFERENCES `olla` (`idOlla`);

--
-- Constraints for table `olla`
--
ALTER TABLE `olla`
  ADD CONSTRAINT `olla_ibfk_1` FOREIGN KEY (`autor`) REFERENCES `usuario` (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
