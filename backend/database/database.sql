-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2021 at 04:00 AM
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
-- Database: `databasepe`
--

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `idOlla` int(11) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `donationType` varchar(50) DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`idOlla`, `userEmail`, `donationType`, `date`) VALUES
(1, 'email@email.com', 'type', '2021-07-24 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `ollas`
--

CREATE TABLE `ollas` (
  `name` varchar(50) NOT NULL,
  `schedule` varchar(50) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `id` int(11) NOT NULL,
  `desc` varchar(50) NOT NULL DEFAULT 'No description provided.',
  `state` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ollas`
--

INSERT INTO `ollas` (`name`, `schedule`, `lat`, `long`, `id`, `desc`, `state`) VALUES
('olla1', '13:00 - 17:00', -37.9877, 29.1123, 1, 'Olla prueba', 1),
('olla1', '13:00 - 17:00', -37.9877, 29.1123, 2, 'Olla prueba', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `fullName`, `passwd`, `type`) VALUES
('email@email.com', 'Kevin Mora Pais', 'passwd', 'Donor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`idOlla`,`userEmail`,`date`),
  ADD KEY `userEmail` (`userEmail`);

--
-- Indexes for table `ollas`
--
ALTER TABLE `ollas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ollas`
--
ALTER TABLE `ollas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`idOlla`) REFERENCES `ollas` (`id`),
  ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`userEmail`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
