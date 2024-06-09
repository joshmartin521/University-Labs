-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 28, 2024 at 06:40 PM
-- Server version: 10.3.31-MariaDB-0+deb10u1
-- PHP Version: 7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs230_u230244`
--

-- --------------------------------------------------------

--
-- Table structure for table `userHomeAddress`
--

CREATE TABLE `userHomeAddress` (
  `id` int(11) NOT NULL,
  `Address Line 1` varchar(50) DEFAULT NULL,
  `Address Line 2` varchar(50) DEFAULT NULL,
  `Town` varchar(50) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `Eircode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userHomeAddress`
--

INSERT INTO `userHomeAddress` (`id`, `Address Line 1`, `Address Line 2`, `Town`, `City`, `Eircode`) VALUES
(1, 'Dundalk', 'Dundalk', 'Louth', 'Ireland', '34656'),
(2, 'Dundalk', 'Dundalk', 'Louth', 'Ireland', '34656'),
(3, 'Gudderstown', 'Ardee', 'Louth', 'Ireland', 'A92K656'),
(4, 'Collon', 'Ardee', 'Louth', 'Ireland', '453667'),
(5, 'Rockfield', 'Ardee', 'Louth', 'Ireland', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `userInfo`
--

CREATE TABLE `userInfo` (
  `id` int(11) NOT NULL,
  `Title` varchar(10) DEFAULT NULL,
  `First Name` varchar(255) DEFAULT NULL,
  `Last Name` varchar(255) DEFAULT NULL,
  `Mobile` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userInfo`
--

INSERT INTO `userInfo` (`id`, `Title`, `First Name`, `Last Name`, `Mobile`, `Email`) VALUES
(1, 'Mr', 'John', 'Doe', '1234567890', 'johnDoe@gmail.com'),
(2, 'Mrs', 'Jane', 'Doe', '9876543210', 'janedoe@gmail.com'),
(3, 'Mx', 'Josh', 'Martin', '0852685650', 'joshMartin@gmail.com'),
(4, 'Mr', 'Hugo', 'Keenan', '0852683456', 'hugoKeenan@gmail.com'),
(5, 'Ms', 'Aoife', 'Murphy', '0852635474', 'aoifeMurphy@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `userShippingAddress`
--

CREATE TABLE `userShippingAddress` (
  `id` int(11) NOT NULL,
  `Address Line 1` varchar(50) DEFAULT NULL,
  `Address Line 2` varchar(50) DEFAULT NULL,
  `Town` varchar(50) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `Eircode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userShippingAddress`
--

INSERT INTO `userShippingAddress` (`id`, `Address Line 1`, `Address Line 2`, `Town`, `City`, `Eircode`) VALUES
(1, 'Dundalk', 'Dundalk', 'Louth', 'Ireland', '34656'),
(2, 'Dundalk', 'Dundalk', 'Louth', 'Ireland', '34656'),
(3, 'Gudderstown', 'Ardee', 'Louth', 'Ireland', 'A92K656'),
(4, 'Collon', 'Ardee', 'Louth', 'Ireland', '453667'),
(5, 'Dockfield', 'Ardee', 'Louth', 'Ireland', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userHomeAddress`
--
ALTER TABLE `userHomeAddress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userInfo`
--
ALTER TABLE `userInfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userShippingAddress`
--
ALTER TABLE `userShippingAddress`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userHomeAddress`
--
ALTER TABLE `userHomeAddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userInfo`
--
ALTER TABLE `userInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userShippingAddress`
--
ALTER TABLE `userShippingAddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
