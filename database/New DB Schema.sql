DROP DATABASE IF EXISTS Matcha;

CREATE DATABASE IF NOT EXISTS Matcha;

USE Matcha;

CREATE TABLE `users` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(32) DEFAULT NULL,
    `password_hash` varchar(60) DEFAULT NULL,
    `email` text,
    `activated` tinyint(1),
    `state` int(11),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE utf8_general_ci;