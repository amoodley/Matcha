-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: matcha
-- ------------------------------------------------------
-- Server version	5.6.34-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `liker_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,'1','2'),(3,'6','1'),(5,'2','1'),(6,'3','1');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_tokens`
--

DROP TABLE IF EXISTS `login_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `token` char(64) NOT NULL DEFAULT '',
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_tokens`
--

LOCK TABLES `login_tokens` WRITE;
/*!40000 ALTER TABLE `login_tokens` DISABLE KEYS */;
INSERT INTO `login_tokens` VALUES (37,'0654214c43f92b4c904afbac86beacc9af71abc0',1),(39,'20ef191afbf7bc3c60a4bd5334c314cbbdc8b557',1),(40,'18d35af89fcc66c60cbc3d74c16c09c3a7577e80',1),(41,'91190bb9b5f78a898a2e9b32551e49377f547a6f',1),(42,'9d051620711485240648ba2b0f734baacf3d3f48',1);
/*!40000 ALTER TABLE `login_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_tokens`
--

DROP TABLE IF EXISTS `password_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `token` char(64) NOT NULL DEFAULT '',
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_tokens`
--

LOCK TABLES `password_tokens` WRITE;
/*!40000 ALTER TABLE `password_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_views`
--

DROP TABLE IF EXISTS `profile_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_views` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `viewer_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_views`
--

LOCK TABLES `profile_views` WRITE;
/*!40000 ALTER TABLE `profile_views` DISABLE KEYS */;
INSERT INTO `profile_views` VALUES (1,'1','2'),(2,'1','6'),(3,'1','3'),(4,'2','1'),(5,'2','1'),(6,'1','5'),(7,'2','1'),(8,'1','2'),(9,'2','1'),(10,'3','1'),(11,'6','1'),(12,'6','1'),(13,'6','1'),(14,'6','1'),(15,'6','1'),(16,'2','1'),(17,'2','1'),(18,'3','1'),(19,'2','1'),(20,'3','1'),(21,'2','1'),(22,'2','1'),(23,'3','1'),(24,'3','1'),(25,'2','1'),(26,'3','1'),(27,'3','1'),(28,'2','1'),(29,'3','1'),(30,'2','1'),(31,'2','1'),(32,'2','1'),(33,'2','1'),(34,'3','1'),(35,'2','1'),(36,'2','1'),(37,'3','1'),(38,'2','1'),(39,'2','1'),(40,'3','1'),(41,'2','1'),(42,'2','1'),(43,'2','1'),(44,'3','1'),(45,'2','1'),(46,'3','1'),(47,'3','1'),(48,'2','1'),(49,'3','1'),(50,'3','1'),(51,'3','1'),(52,'3','1'),(53,'3','1'),(54,'3','1'),(55,'2','1'),(56,'3','1'),(57,'4','1'),(58,'5','1');
/*!40000 ALTER TABLE `profile_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `first_name` varchar(32) DEFAULT NULL,
  `last_name` varchar(32) DEFAULT NULL,
  `birthday` datetime NOT NULL,
  `city` varchar(32) DEFAULT NULL,
  `gender` varchar(32) DEFAULT NULL,
  `preference` varchar(32) DEFAULT NULL,
  `bio` text,
  `interests` text,
  `profileimg` text,
  `latitude` varchar(20) DEFAULT NULL,
  `longitude` varchar(20) DEFAULT NULL,
  `img1` varchar(255) DEFAULT NULL,
  `img2` varchar(255) DEFAULT NULL,
  `img3` varchar(255) DEFAULT NULL,
  `img4` varchar(255) DEFAULT NULL,
  `fame` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'1','Ashleigh','Moodley','1989-09-26 00:00:00','Johannesburg','male','female','Unable to type with boxing gloves on. Coffee expert. Internet specialist. Twitter nerd. Hardcore zombie trailblazer. Tv ninja','#geek #tattoo','/uploads/profileImg-1526903349829.jpeg','-26.071803','27.968701','/uploads/img1-1526903349833.jpeg','/uploads/img2-1526903349835.jpeg','/uploads/img3-1526903349840.jpeg','/uploads/img4-1526903349848.jpeg',5),(2,'2','Alexis','Ren','1996-11-23 00:00:00','California','female','male','Avid alcohol guru. Analyst. Hipster-friendly gamer. Coffee geek. Reader. General beer junkie.','#modeling','/uploads/profileImg-1526904099766.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904099770.jpeg','/uploads/img2-1526904099771.jpeg','/uploads/img3-1526904099772.jpeg','/uploads/img4-1526904099774.jpeg',25),(3,'3','Janice','Griffith','1995-07-03 00:00:00','New York','female','male','Travel aficionado. Food enthusiast. Entrepreneur. Pop culture geek. Freelance webaholic.','#filming','/uploads/profileImg-1526904266848.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904266849.jpeg','/uploads/img2-1526904266849.jpeg','/uploads/img3-1526904266851.jpeg','/uploads/img4-1526904266852.jpeg',21),(4,'4','Meghan','Markle','1981-08-04 00:00:00','Los Angeles','female','male','Amateur bacon fanatic. Total introvert. Entrepreneur. Hipster-friendly social media guru.','#acting','/uploads/profileImg-1526904575028.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904575029.jpeg','/uploads/img2-1526904575030.jpeg','/uploads/img3-1526904575036.jpeg','/uploads/img4-1526904575041.jpeg',1),(5,'5','Miley','Cyrus','1992-11-23 00:00:00','Tennessee','female','male','Lifelong music fan. Avid social media enthusiast. Internet specialist. General bacon junkie.','#singing','/uploads/profileImg-1526904801785.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904801791.jpeg','/uploads/img2-1526904801792.jpeg','/uploads/img3-1526904801794.jpeg','/uploads/img4-1526904801795.jpeg',1),(6,'6','Remy','LaCroix','1988-06-26 00:00:00','San Francisco','female','male','Social media fan. Hardcore introvert. Freelance music geek. Friend of animals everywhere.','#filming','/uploads/profileImg-1526904978147.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904978148.jpeg','/uploads/img2-1526904978151.jpeg','/uploads/img3-1526904978152.jpeg','/uploads/img4-1526904978155.jpeg',5),(7,'7','Cara','Delevingne','1992-08-12 00:00:00','London','female','female','Organizer. Hardcore thinker. Zombie expert. Creator. Tv maven. Evil coffee buff. Unapologetic introvert.','#birdwatching #',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) DEFAULT NULL,
  `password_hash` varchar(60) DEFAULT NULL,
  `email` text,
  `activated` tinyint(1) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'AshleighM','$2b$10$.vqJde0c/8xniAPWpir1D.OO1I0z/Tv7LhmR5xFEPyuZ3N4K9SPSu','ashleigh.m724@gmail.com',1,4),(2,'AlexisRen','$2b$10$7aNyhmDGt9Rc4x3PsghrM.y8N.IePHgJdujkCBE.HIC9mgLLvp5e.','alexisren@gmail.com',1,4),(3,'Rejaniced','$2b$10$Y0fTGIUI0FomlLkGoyUCd.YkahNYxfY7XSAp7gfUedXQx2TLYUX8e','janicegriffith@gmail.com',1,4),(4,'PrincessMeghan','$2b$10$oendlcZpKtmV1Fw0U9M6LedVYd1/J5CL/20aJjR8O9fd8P2/7sqq6','meghanmarkle@gmail.com',1,4),(5,'Miley@23','$2b$10$b.aBWcNjX94ge0vq1QmkquzIk0aA5OF.NC8FOlRQSW6pFfSWpd69e','mileycyrus@gmail.com',1,4),(6,'Remymeow','$2b$10$qhjBqDCv1tL3.jfK8H45fOLh/iOCuWqYmVNTZx9NrSbQF1m2w3f02','remylacroix@gmail.com',1,4),(7,'Cara','$2b$10$rlKlOMcZMomE6/Sck.fYCuFsbGbKzk/EO/d6iQkkn5S9ZJ3BkHAa6','caradelevingne@gmail.com',1,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-26  9:19:14
