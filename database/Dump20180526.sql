-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: matcha
-- ------------------------------------------------------
-- Server version	5.6.32

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,'1','2'),(3,'6','1'),(5,'2','1'),(6,'3','1'),(7,'1','25');
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
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_tokens`
--

LOCK TABLES `login_tokens` WRITE;
/*!40000 ALTER TABLE `login_tokens` DISABLE KEYS */;
INSERT INTO `login_tokens` VALUES (37,'0654214c43f92b4c904afbac86beacc9af71abc0',1),(39,'20ef191afbf7bc3c60a4bd5334c314cbbdc8b557',1),(40,'18d35af89fcc66c60cbc3d74c16c09c3a7577e80',1),(41,'91190bb9b5f78a898a2e9b32551e49377f547a6f',1),(42,'9d051620711485240648ba2b0f734baacf3d3f48',1),(77,'7d6212cb4d1fa88534dedec44181400ced66227b',35);
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
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_views`
--

LOCK TABLES `profile_views` WRITE;
/*!40000 ALTER TABLE `profile_views` DISABLE KEYS */;
INSERT INTO `profile_views` VALUES (1,'1','2'),(2,'1','6'),(3,'1','3'),(4,'2','1'),(5,'2','1'),(6,'1','5'),(7,'2','1'),(8,'1','2'),(9,'2','1'),(10,'3','1'),(11,'6','1'),(12,'6','1'),(13,'6','1'),(14,'6','1'),(15,'6','1'),(16,'2','1'),(17,'2','1'),(18,'3','1'),(19,'2','1'),(20,'3','1'),(21,'2','1'),(22,'2','1'),(23,'3','1'),(24,'3','1'),(25,'2','1'),(26,'3','1'),(27,'3','1'),(28,'2','1'),(29,'3','1'),(30,'2','1'),(31,'2','1'),(32,'2','1'),(33,'2','1'),(34,'3','1'),(35,'2','1'),(36,'2','1'),(37,'3','1'),(38,'2','1'),(39,'2','1'),(40,'3','1'),(41,'2','1'),(42,'2','1'),(43,'2','1'),(44,'3','1'),(45,'2','1'),(46,'3','1'),(47,'3','1'),(48,'2','1'),(49,'3','1'),(50,'3','1'),(51,'3','1'),(52,'3','1'),(53,'3','1'),(54,'3','1'),(55,'2','1'),(56,'3','1'),(57,'4','1'),(58,'5','1'),(59,'2','1'),(60,'6','1'),(61,'4','1'),(62,'5','1'),(63,'6','1'),(64,'4','1'),(65,'5','1'),(66,'6','1'),(67,'2','1'),(68,'6','1'),(69,'4','1'),(70,'5','1'),(71,'6','1'),(72,'2','1'),(73,'6','1'),(74,'4','1'),(75,'5','1'),(76,'6','1'),(77,'2','1'),(78,'6','1'),(79,'4','1'),(80,'5','1'),(81,'6','1'),(82,'2','1'),(83,'6','1'),(84,'4','1'),(85,'3','1'),(86,'1','18'),(87,'1','19'),(88,'1','20'),(89,'1','21'),(90,'1','23'),(91,'23','1'),(92,'20','1'),(93,'1','25'),(94,'1','28'),(95,'14','34'),(96,'16','34'),(97,'18','34'),(98,'19','34'),(99,'21','34'),(100,'22','34'),(101,'28','34'),(102,'27','34'),(103,'26','34'),(104,'25','34'),(105,'24','34');
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'1','Ashleigh','Moodley','1989-09-26 00:00:00','Johannesburg','male','female','Unable to type with boxing gloves on. Coffee expert. Internet specialist. Twitter nerd. Hardcore zombie trailblazer. Tv ninja','#geek #tattoo','/uploads/profileImg-1526903349829.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1526903349833.jpeg','/uploads/img2-1526903349835.jpeg','/uploads/img3-1526903349840.jpeg','/uploads/img4-1526903349848.jpeg',12),(2,'2','Alexis','Ren','1996-11-23 00:00:00','California','female','male','Avid alcohol guru. Analyst. Hipster-friendly gamer. Coffee geek. Reader. General beer junkie.','#modeling','/uploads/profileImg-1526904099766.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904099770.jpeg','/uploads/img2-1526904099771.jpeg','/uploads/img3-1526904099772.jpeg','/uploads/img4-1526904099774.jpeg',30),(3,'3','Janice','Griffith','1995-07-03 00:00:00','New York','female','male','Travel aficionado. Food enthusiast. Entrepreneur. Pop culture geek. Freelance webaholic.','#filming','/uploads/profileImg-1526904266848.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904266849.jpeg','/uploads/img2-1526904266849.jpeg','/uploads/img3-1526904266851.jpeg','/uploads/img4-1526904266852.jpeg',22),(4,'4','Meghan','Markle','1981-08-04 00:00:00','Los Angeles','female','male','Amateur bacon fanatic. Total introvert. Entrepreneur. Hipster-friendly social media guru.','#acting','/uploads/profileImg-1526904575028.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904575029.jpeg','/uploads/img2-1526904575030.jpeg','/uploads/img3-1526904575036.jpeg','/uploads/img4-1526904575041.jpeg',7),(5,'5','Miley','Cyrus','1992-11-23 00:00:00','Tennessee','female','male','Lifelong music fan. Avid social media enthusiast. Internet specialist. General bacon junkie.','#singing','/uploads/profileImg-1526904801785.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904801791.jpeg','/uploads/img2-1526904801792.jpeg','/uploads/img3-1526904801794.jpeg','/uploads/img4-1526904801795.jpeg',6),(6,'6','Remy','LaCroix','1988-06-26 00:00:00','San Francisco','female','male','Social media fan. Hardcore introvert. Freelance music geek. Friend of animals everywhere.','#filming','/uploads/profileImg-1526904978147.jpeg','-26.1208186','27.9734809','/uploads/img1-1526904978148.jpeg','/uploads/img2-1526904978151.jpeg','/uploads/img3-1526904978152.jpeg','/uploads/img4-1526904978155.jpeg',15),(7,'7','Cara','Delevingne','1992-08-12 00:00:00','London','female','female','Organizer. Hardcore thinker. Zombie expert. Creator. Tv maven. Evil coffee buff. Unapologetic introvert.','#birdwatching #','/uploads/profileImg-1527321927576.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527321927600.jpeg','/uploads/img2-1527321927600.jpeg','/uploads/img3-1527321927615.jpeg','/uploads/img4-1527321927616.jpeg',NULL),(8,'8','Ellen','DeGeneres','1958-01-26 00:00:00','Los Angeles','female','female','Travel fanatic. Freelance entrepreneur. Creator. Subtly charming communicator. Alcohol lover. Organizer. Food maven.','#tv','/uploads/profileImg-1527322631178.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527322631179.jpeg','/uploads/img2-1527322631179.jpeg','/uploads/img3-1527322631180.jpeg','/uploads/img4-1527322631181.jpeg',NULL),(9,'9','Ruby','Rose','1986-03-20 00:00:00','Melbourne','female','female','Social media ninja. Internet nerd. Prone to fits of apathy. Twitter evangelist. Proud pop culture junkie. Beer fanatic.','#modeling','/uploads/profileImg-1527324480321.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527324480321.jpeg','/uploads/img2-1527324480321.jpeg','/uploads/img3-1527324480322.jpeg','/uploads/img4-1527324480390.jpeg',NULL),(10,'10','Amanda','Moore','1979-09-10 00:00:00','Idaho','female','female','Hardcore beer buff. Devoted travel lover. Award-winning student. Total bacon practitioner.','#modeling','/uploads/profileImg-1527325731214.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527325731214.jpeg','/uploads/img2-1527325731215.jpeg','/uploads/img3-1527325731215.jpeg','/uploads/img4-1527325731216.jpeg',NULL),(11,'11','Alecia Beth','Moore','1979-09-08 00:00:00','Pennsylvania','female','female','Social media geek. Internet advocate. Web specialist. Troublemaker. Explorer. Alcohol evangelist.','#singing','/uploads/profileImg-1527325970521.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527325970521.jpeg','/uploads/img2-1527325970522.jpeg','/uploads/img3-1527325970522.jpeg','/uploads/img4-1527325970527.jpeg',NULL),(12,'12','Jenny','Shimizu','1967-06-17 00:00:00','California','female','female','Alcohol maven. Friendly social media geek. Food guru. Creator. Travel nerd.','#modeling','/uploads/profileImg-1527326488114.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527326488114.jpeg','/uploads/img2-1527326488114.jpeg','/uploads/img3-1527326488115.jpeg','/uploads/img4-1527326488115.jpeg',NULL),(13,'13','Amber','Rose','1983-10-21 00:00:00','Pennsylvania','female','female','Amateur tv ninja. Coffeeaholic. Food expert. Professional web practitioner. Incurable alcohol geek.','#modeling','/uploads/profileImg-1527327116876.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527327116878.jpeg','/uploads/img2-1527327116879.jpeg','/uploads/img3-1527327116880.jpeg','/uploads/img4-1527327116886.jpeg',NULL),(14,'14','Alexis','Texas','1985-05-25 00:00:00','Panama','female','male','Reader. Hipster-friendly food junkie. Friendly pop culture fanatic. Entrepreneur. Certified webaholic.','#modeling #filming','/uploads/profileImg-1527329076170.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527329076170.jpeg','/uploads/img2-1527329076209.jpeg','/uploads/img3-1527329076223.jpeg','/uploads/img4-1527329076223.jpeg',1),(15,'15','Angelina','Jolie','1975-06-04 00:00:00','Los Angeles','female','male','Professional web geek. Alcohol fan. Devoted zombie trailblazer. Certified social media lover. Amateur creator. Friendly food nerd.','#acting','/uploads/profileImg-1527329633255.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527329633255.jpeg','/uploads/img2-1527329633257.jpeg','/uploads/img3-1527329633259.jpeg','/uploads/img4-1527329633259.jpeg',NULL),(16,'16','August','Ames','1994-08-23 00:00:00','Canada','female','male','Troublemaker. Social media aficionado. Organizer. Devoted music maven. Infuriatingly humble alcohol junkie.','#modeling #filming','/uploads/profileImg-1527329945672.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527329945673.jpeg','/uploads/img2-1527329945701.jpeg','/uploads/img3-1527329945701.jpeg','/uploads/img4-1527329945712.jpeg',1),(17,'17','Catherine','Bell','1968-08-14 00:00:00','London','female','male','Devoted alcohol ninja. Communicator. Music practitioner. Zombie evangelist. Thinker. Unapologetic writer. Reader. Entrepreneur. Introvert.','#acting','/uploads/profileImg-1527330246139.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527330246140.jpeg','/uploads/img2-1527330246182.jpeg','/uploads/img3-1527330246191.jpeg','/uploads/img4-1527330246194.jpeg',NULL),(18,'18','Dani','Daniels','1989-09-23 00:00:00','California','female','male','Unapologetic web fanatic. Travel enthusiast. Hipster-friendly social media aficionado. Internet scholar. Lifelong coffee lover. Analyst.','#modeling #filming','/uploads/profileImg-1527336969434.png','-26.205649599999997','28.0361622','/uploads/img1-1527336969467.jpeg','/uploads/img2-1527336969479.jpeg','/uploads/img3-1527336969524.jpeg','/uploads/img4-1527336969524.jpeg',1),(19,'19','Emma','Stone','1988-11-06 00:00:00','Arizona','female','male','Social media scholar. Twitteraholic. Tv fanatic. Beer ninja. Subtly charming communicator.','#acting','/uploads/profileImg-1527337248549.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527337248549.jpeg','/uploads/img2-1527337248550.jpeg','/uploads/img3-1527337248581.jpeg','/uploads/img4-1527337248582.jpeg',1),(20,'20','Jaime','King','1979-04-23 00:00:00','Nebraska','female','male','Zombie trailblazer. Beer maven. Amateur travel fanatic. Typical pop cultureaholic.','#acting','/uploads/profileImg-1527337490203.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527337490254.jpeg','/uploads/img2-1527337490254.jpeg','/uploads/img3-1527337490278.jpeg','/uploads/img4-1527337490282.jpeg',1),(21,'21','Jennifer','Lawrence','1990-08-15 00:00:00','Kentucky','female','male','Web junkie. Social media evangelist. Professional communicator. Amateur explorer. Food practitioner.','#acting','/uploads/profileImg-1527337675393.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527337675393.jpeg','/uploads/img2-1527337675395.jpeg','/uploads/img3-1527337675396.jpeg','/uploads/img4-1527337675401.jpeg',1),(22,'22','Jessica','Biel','1982-03-03 00:00:00','Minnesota','female','male','Music evangelist. Thinker. Tv advocate. Twitter practitioner. Prone to fits of apathy. Avid troublemaker. Unapologetic coffee buff.','#acting','/uploads/profileImg-1527337848303.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527337848303.jpeg','/uploads/img2-1527337848303.jpeg','/uploads/img3-1527337848304.jpeg','/uploads/img4-1527337848304.jpeg',1),(23,'23','Lana','Rhoades','1996-09-06 00:00:00','Chicago','female','male','Food advocate. General coffee trailblazer. Organizer. Music buff. Analyst. Unable to type with boxing gloves on.','#modeling #filming','/uploads/profileImg-1527338035827.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527338035828.jpeg','/uploads/img2-1527338035828.jpeg','/uploads/img3-1527338035828.jpeg','/uploads/img4-1527338035829.jpeg',1),(24,'24','Megan','Fox','1986-05-16 00:00:00','Tennessee','female','male','Incurable troublemaker. General zombie guru. Passionate coffee ninja. Wannabe bacon specialist. Music enthusiast.','#acting','/uploads/profileImg-1527339000648.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527339000682.jpeg','/uploads/img2-1527339000682.jpeg','/uploads/img3-1527339000707.jpeg','/uploads/img4-1527339000707.jpeg',1),(25,'25','Mia','Malkova','1992-07-01 00:00:00','California','female','male','Food advocate. General coffee trailblazer. Organizer. Music buff. Analyst. Unable to type with boxing gloves on.','#modeling #filming','/uploads/profileImg-1527340715338.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527340715373.png','/uploads/img2-1527340715401.png','/uploads/img3-1527340715421.jpeg','/uploads/img4-1527340715425.jpeg',1),(26,'26','Rosie','Huntington-Whiteley','1987-04-17 00:00:00','England','female','male','Incurable troublemaker. General zombie guru. Passionate coffee ninja. Wannabe bacon specialist. Music enthusiast.','#acting','/uploads/profileImg-1527341071683.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527341071684.jpeg','/uploads/img2-1527341071686.jpeg','/uploads/img3-1527341071687.jpeg','/uploads/img4-1527341071688.jpeg',1),(27,'27','Scarlett','Johansson','1984-11-22 00:00:00','New York','female','male','Proud analyst. Evil beer fan. Passionate problem solver. Alcohol expert. Coffee fanatic.','#acting','/uploads/profileImg-1527343334208.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527343334235.jpeg','/uploads/img2-1527343334235.jpeg','/uploads/img3-1527343334262.jpeg','/uploads/img4-1527343334267.jpeg',1),(28,'28','Victoria','Justice','1993-02-19 00:00:00','Florida','female','male','Pop culture nerd. Amateur alcohol advocate. Zombie evangelist. Beer lover. Lifelong tv maven.','#singing #acting','/uploads/profileImg-1527343944849.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527343944871.jpeg','/uploads/img2-1527343944897.jpeg','/uploads/img3-1527343944899.jpeg','/uploads/img4-1527343944902.jpeg',1),(29,'29','Benedict','Cumberbatch','1976-07-19 00:00:00','London','male','female','Internet guru. Proud troublemaker. Student. Creator. Bacon practitioner. Food specialist.','#acting','/uploads/profileImg-1527344267722.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527344267722.jpeg','/uploads/img2-1527344267722.jpeg','/uploads/img3-1527344267723.jpeg','/uploads/img4-1527344267723.jpeg',NULL),(30,'30','Chadwick','Boseman','1977-11-29 00:00:00','South Carolina','male','female','Lifelong travel expert. Extreme coffee specialist. Avid twitter guru. Organizer. Typical introvert. Tvaholic. Friend of animals everywhere. Food nerd.','#acting','/uploads/profileImg-1527344923522.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527344923522.jpeg','/uploads/img2-1527344923523.jpeg','/uploads/img3-1527344923524.jpeg','/uploads/img4-1527344923525.jpeg',NULL),(31,'31','Justin','Bieber','1994-03-01 00:00:00','Canada','male','female','Avid social media lover. Hipster-friendly student. Gamer. Evil explorer. Extreme music aficionado. Problem solver. Analyst. Internet maven.','#singing','/uploads/profileImg-1527345287607.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527345287607.jpeg','/uploads/img2-1527345287647.jpeg','/uploads/img3-1527345287648.jpeg','/uploads/img4-1527345287685.jpeg',NULL),(32,'32','Korg','The Kronan','1990-01-03 00:00:00','Sakaar','male','female','Hey man, We\'re gonna get outta here on that big spaceship. Wanna come?','#fighting #revolutions','/uploads/profileImg-1527345671374.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527345671386.jpeg','/uploads/img2-1527345671387.jpeg','/uploads/img3-1527345671387.jpeg','/uploads/img4-1527345671396.jpeg',NULL),(33,'33','Christopher','Bridges','1977-09-10 00:00:00','Chicago','male','female','Certified pop culture fan. Tv specialist. Coffee aficionado. Professional entrepreneur. Beer practitioner.','#rapping #beingAwesome','/uploads/profileImg-1527347583718.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527347583719.jpeg','/uploads/img2-1527347583719.jpeg','/uploads/img3-1527347583720.jpeg','/uploads/img4-1527347583720.jpeg',NULL),(34,'34','Micheal B','Jordan','1987-02-09 00:00:00','California','male','female','Twitter fanatic. Professional analyst. Incurable communicator. Travel expert. Hipster-friendly troublemaker. Writer.','#acting','/uploads/profileImg-1527347860846.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527347860847.jpeg','/uploads/img2-1527347860848.jpeg','/uploads/img3-1527347860849.jpeg','/uploads/img4-1527347860851.jpeg',NULL),(35,'35','Robert','Downey, jr','1965-04-04 00:00:00','New York','male','female','Alcohol advocate. General music guru. Tv nerd. Extreme beer lover. Infuriatingly humble internet specialist.','#acting','/uploads/profileImg-1527348451696.jpeg','-26.205649599999997','28.0361622','/uploads/img1-1527348451696.jpeg','/uploads/img2-1527348451697.jpeg','/uploads/img3-1527348451698.jpeg','/uploads/img4-1527348451699.png',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'AshleighM','$2b$10$.vqJde0c/8xniAPWpir1D.OO1I0z/Tv7LhmR5xFEPyuZ3N4K9SPSu','ashleigh.m724@gmail.com',1,4),(2,'AlexisRen','$2b$10$7aNyhmDGt9Rc4x3PsghrM.y8N.IePHgJdujkCBE.HIC9mgLLvp5e.','alexisren@gmail.com',1,4),(3,'Rejaniced','$2b$10$Y0fTGIUI0FomlLkGoyUCd.YkahNYxfY7XSAp7gfUedXQx2TLYUX8e','janicegriffith@gmail.com',1,4),(4,'PrincessMeghan','$2b$10$oendlcZpKtmV1Fw0U9M6LedVYd1/J5CL/20aJjR8O9fd8P2/7sqq6','meghanmarkle@gmail.com',1,4),(5,'Miley@23','$2b$10$b.aBWcNjX94ge0vq1QmkquzIk0aA5OF.NC8FOlRQSW6pFfSWpd69e','mileycyrus@gmail.com',1,4),(6,'Remymeow','$2b$10$qhjBqDCv1tL3.jfK8H45fOLh/iOCuWqYmVNTZx9NrSbQF1m2w3f02','remylacroix@gmail.com',1,4),(7,'Cara','$2b$10$rlKlOMcZMomE6/Sck.fYCuFsbGbKzk/EO/d6iQkkn5S9ZJ3BkHAa6','caradelevingne@gmail.com',1,4),(8,'Ellen','$2b$10$UN0g2AX2okVg.oMh1YnkMuSbMfxw.SuL0SsLjkOKs1EfG9QthHPTi','ellendegeneres@gmail.com',1,4),(9,'RubyRose','$2b$10$K.I3dQnEKiern2hIgmfB3.tWWonyCbw/KIK2A4U7f8wRib2atYLu.','rubyrose@gmail.com',1,4),(10,'AmandaMoore','$2b$10$O/1ZRxPSnOPuE64PikpTiOd9DkPuCOIa.TyFzOXvAw.LiTOr6UHeO','amandamoore@gmail.com',1,4),(11,'Pink','$2b$10$1AHmw16KU7R9oBu7uYPvgepA9t95SUUUDZnIZWw.KuzlGgFVP8Up.','pink@gmail.com',1,4),(12,'JennyShimizu','$2b$10$Cn5GjBuH/M2fhbTFBdtvE.9XJbU4me9En7JcdHJJuWHzVDIsbp2ae','jennyshimizu@gmail.com',1,4),(13,'AmberRose','$2b$10$n1pBnKp9Na1vQ90tXsxb5OwMy4NhQ/94w8phxU6K0bNVeh3pfncU6','amberrose@gmail.com',1,4),(14,'AlexisTexas','$2b$10$fUgJc29yZ594s98W5s.GneU2ErZYIrYckLN5oPtnKYxAVsfLTps.K','alexistexas@gmail.com',1,4),(15,'AngelinaJolie','$2b$10$YjptpKWGp.HlLx649SXXnuxlTrnhOTCZweAwN6eWwOvTJc4CB3mUi','angelinajolie@gmail.com',1,4),(16,'AugustAmes','$2b$10$gyGJXa70o0nv.bGKg2Bi5OBEf4gIC1ogUOrPbfNksli9tNtHkimVy','augustames@gmail.com',1,4),(17,'CatherineBell','$2b$10$se5TaisydK7H51tmRuN4NuCfE9wVJN86z1728YZ1IpmTMEoyikOuO','catherinebell@gmail.com',1,4),(18,'DaniD','$2b$10$kno9QCjrzoYZy1GHdAh0K.3fmze08rnfI6YbYcHo8q8WH7O728Ayy','danidaniels@gmail.com',1,4),(19,'EmmaStone','$2b$10$YL0pDdDEO7x3vzxDhEvkm.FWp.WkGbnK6kd9CYERnGkOFoQTw3to.','emmastone@gmail.com',1,4),(20,'JaimeKing','$2b$10$dfFIFxV/kVTx85hDyr1ZrOhG.ysHcTwmcqbGOS2Gz7v77TVaKvcaK','jaimeking@gmail.com',1,4),(21,'JLaw','$2b$10$heiAFIq1pXjbMFDW.4vLbu0UgVzbB2G3YY6SlY14G7uF4yRLEQ/MG','jenniferlawrence@gmail.com',1,4),(22,'JessicaB','$2b$10$C/wO7APgQfTYUjil3jTXm.MHouEvLrpzNmEOXglNWJ4gA12NSKG5i','jessicabiel@gmail.com',1,4),(23,'LanaRhoades','$2b$10$2gstKNv.YTmcAdvVwxFls.U3D3ajoemj1EH7.wjTYY/lgaGMDZ9uW','lanarhoades@gmail.com',1,4),(24,'MeganFox','$2b$10$0NsMkEBiXIrxejs/enH1KOxhPiSvlH0P0QRnKlpcI5A5gVQPyO6QG','meganfox@gmail.com',1,4),(25,'MiaMalkova','$2b$10$c0ReeA5fioQ1p5wlp.0PfuW0YMPsikWzYal3T8CuKwwhXJ15TRey6','miamalkova@gmail.com',1,4),(26,'Rosie','$2b$10$l1r9SvaAZZgnMcknGVs9AuGfC12uzhVMc8jbFVGHl/AR5xcl7xPt.','rosie@gmail.com',1,4),(27,'ScarJo','$2b$10$Pk3vLPnDBC5tU/NCwz0xduEGH7xj1bSQZWQRmyMhkPjcSS4vZGt5C','scarlett@gmail.com',1,4),(28,'VictoriaJ','$2b$10$kxQckGaCe3nKBwzu0vTNTeh5N/lE.zxhwJuGkI46GdUkTLKFaMkz.','victoriajustice@gmail.com',1,4),(29,'Dr Sherlock Strange','$2b$10$csxhETBAL/CzGjqNcayucOP75w7a4xzsQrAPEMeY7elbFVPo0L75y','benedictcumberbatch@gmail.com',1,4),(30,'ChadwickBoseman','$2b$10$H8TCwIpxza5TShgehrtdhOcfkt4u4KfIyZRPwbfCIrZtspQ5XF6Oe','chadwickboseman@gmail.com',1,4),(31,'YungJB','$2b$10$1p01FE1m5zr86ni47IT0cuvXOZGSbfWCfP2GygSuSFFUXiA9ZA6Ia','justinbieber@gmail.com',1,4),(32,'Korg','$2b$10$e6RmABmSl4wsGIdZ1ZKqJOJXIwn2Co63W.7uo33FaTUyLEk1O3ujO','korg@gmail.com',1,4),(33,'Ludacris','$2b$10$dqdhT6dHJDkq93Cs8MdCSOUibxJzI2CovniGRSZ86hhTjCnUXXh42','ludacris@gmail.com',1,4),(34,'MichealBJordan','$2b$10$35HkK1WhFkMxzbZW2fJANuMBlGVAFNS5mMtM9TU7nIdwQXktUCg9C','michealbjordan@gmail.com',1,4),(35,'IronMan','$2b$10$E8XjIlexNGd2Ojc.XVGJs.lkEzzbt3FzcWV7t9pAw0ERT2p37ZDMW','robertdowneyjr@gmail.com',1,4);
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

-- Dump completed on 2018-05-26 17:28:37
