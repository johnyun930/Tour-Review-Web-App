-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- 생성 시간: 19-11-07 23:12
-- 서버 버전: 5.7.26
-- PHP 버전: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `tourreview`
--
DROP DATABASE IF EXISTS  `tourreview`;

CREATE DATABASE  `tourreview`;

show databases;

use tourreview;


-- --------------------------------------------------------

--
-- 테이블 구조 `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `adminId` varchar(20) NOT NULL DEFAULT '',
  `adminname` varchar(20) NOT NULL,
  `adminpassword` varchar(20) NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `admin`
--

INSERT INTO `admin` (`adminId`, `adminname`, `adminpassword`) VALUES
('johnyun930', 'johnyun', 'yoowogur');

-- --------------------------------------------------------

--
-- 테이블 구조 `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(20) NOT NULL,
  `createdDate` varchar(20) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `reviewId` int(11) NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `reviewId` (`reviewId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `comment`
--
INSERT INTO `comment` ( `userId`,`createdDate`, `comment`,`reviewId`)
VALUES ('john123', '2019-11-14', 'This is comment 1', '1');

INSERT INTO `comment` ( `userId`,`createdDate`, `comment`,`reviewId`)
VALUES ('Jarrett123', '2019-11-18', 'This is comment 2', '5');

INSERT INTO `comment` ( `userId`,`createdDate`, `comment`,`reviewId`)
VALUES ('john123', '2019-11-14', 'This is comment 3', '4');

INSERT INTO `comment` ( `userId`,`createdDate`, `comment`,`reviewId`)
VALUES ('Linnie123', '2019-11-14', 'This is comment 4', '3');

INSERT INTO `comment` ( `userId`,`createdDate`, `comment`,`reviewId`)
VALUES ('Donn123', '2019-11-14', 'This is comment 5', '2');

INSERT INTO `comment` ( `userId`,`createdDate`, `comment`,`reviewId`)
VALUES ('Jolanda123', '2019-11-14', 'This is comment 5', '3');
-- --------------------------------------------------------

--
-- 테이블 구조 `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `locationId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `location`
--
INSERT INTO `location` ( `name`,`country`, `description`)
VALUES ('Vancouver', 'Canada', 'Vancouver, a bustling west coast seaport in British Columbia.');

INSERT INTO `location` ( `name`,`country`, `description`)
VALUES ('Seoul', 'Korea', 'Seoul, the capital of South Korea, is a huge metropolis where modern skyscrapers');

INSERT INTO `location` ( `name`,`country`, `description`)
VALUES ('Los Angeles', 'USA', 'Los Angeles is a sprawling Southern California city and the center of the nation’s film and television industry.');

INSERT INTO `location` ( `name`,`country`, `description`)
VALUES ('Cancun', 'Mexico', 'Cancún, a Mexican city on the Yucatán Peninsula bordering the Caribbean Sea, is known for its beaches, numerous resorts and nightlife.');

INSERT INTO `location` ( `name`,`country`, `description`)
VALUES ('Paris', 'France', 'Paris, France capital, is a major European city and a global center for art');


-- --------------------------------------------------------

--
-- 테이블 구조 `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `reviewId` int(11) NOT NULL AUTO_INCREMENT,
  `createdDate` varchar(20) DEFAULT NULL,
  `reviewDescription` varchar(255) NOT NULL,
  `rating` int(5) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `locationId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `userId` (`userId`),
  KEY `locationId` (`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `review`
--

INSERT INTO `review` (`reviewDescription`, `rating`,`userId`,`locationId`,`title`)
VALUES ('Description Of Review 1', 1, 'Jolanda123', 1, "Title of Review 1");

INSERT INTO `review` (`reviewDescription`, `rating`,`userId`,`locationId`,`title`)
VALUES ('Description Of Review 2', 2, 'Donn123', 2, "Title of Review 2");

INSERT INTO `review` (`reviewDescription`, `rating`,`userId`,`locationId`,`title`)
VALUES ('Description Of Review 3', 3, 'Linnie123', 4, "Title of Review 3");

INSERT INTO `review` (`reviewDescription`, `rating`,`userId`,`locationId`,`title`)
VALUES ('Description Of Review 4', 4, 'john123', 3, "Title of Review 4");

INSERT INTO `review` (`reviewDescription`, `rating`,`userId`,`locationId`,`title`)
VALUES ('Description Of Review 5', 5, 'Jarrett123', 5, "Title of Review 5");
-- --------------------------------------------------------

--
-- 테이블 구조 `siteuser`
--

DROP TABLE IF EXISTS `siteuser`;
CREATE TABLE IF NOT EXISTS `siteuser` (
  `userId` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `photo` BLOB,
  `profile` varchar(100) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `phoneNum` varchar(20) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 테이블의 덤프 데이터 `siteuser`
--

--INSERT INTO xx_BLOB(ID,IMAGE) VALUES(1,LOAD_FILE('E:/Images/jack.jpg'));
INSERT INTO `siteuser` (`userId`, `username`, `password`, `photo`, `profile`, `firstName`, `lastName`, `email`, `phoneNum`) VALUES
('john123', 'john', 'johnpassword', null, 'profile of john123', 'john', 'yoon', 'john@gmail.com', '778-777-7717');

INSERT INTO `siteuser` (`userId`, `username`, `password`, `photo`, `profile`, `firstName`, `lastName`, `email`, `phoneNum`) VALUES
('Jarrett123', 'Jarrett', 'Jarrettpassword', null, 'profile of Jarrett123', 'Jarrett', 'Gabor', 'Jarrett@gmail.com', '778-123-1234');

INSERT INTO `siteuser` (`userId`, `username`, `password`, `photo`, `profile`, `firstName`, `lastName`, `email`, `phoneNum`) VALUES
('Donn123', 'Donn', 'Donnapassword', null, 'profile of Donn123', 'Donn', 'Catto', 'Donn@gmail.com', '778-754-9547');

INSERT INTO `siteuser` (`userId`, `username`, `password`, `photo`, `profile`, `firstName`, `lastName`, `email`, `phoneNum`) VALUES
('Linnie123', 'Linnie', 'Linniepassword', null, 'profile of Linnie', 'Linnie', 'White', 'Linnie@gmail.com', '778-777-7957');

INSERT INTO `siteuser` (`userId`, `username`, `password`, `photo`, `profile`, `firstName`, `lastName`, `email`, `phoneNum`) VALUES
('Jolanda123', 'Jolanda', 'Jolandapassword', null, 'profile of Jolanda123', 'Jolanda', 'Angel', 'Jolanda@gmail.com', '778-752-5254');
--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`reviewId`) REFERENCES `review` (`reviewId`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `siteuser` (`userId`) ON DELETE CASCADE;

--
-- 테이블의 제약사항 `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `siteuser` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`locationId`) REFERENCES `location` (`locationId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
