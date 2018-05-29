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

CREATE TABLE `login_tokens` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`token` char(64) NOT NULL DEFAULT '',
	`user_id` int(11) unsigned NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE utf8_general_ci;

CREATE TABLE `password_tokens` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	`token` char(64) NOT NULL DEFAULT '',
	`user_id` int(11) unsigned NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE utf8_general_ci;

CREATE TABLE `profiles` (
	`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` varchar(32) DEFAULT NULL,
    `first_name` varchar(32) DEFAULT NULL,
	`last_name` varchar(32) DEFAULT NULL,
    `birthday` date DEFAULT NULL,
    `city` varchar(32) DEFAULT NULL,
    `gender` varchar(32) DEFAULT NULL,
    `preference` varchar(32) DEFAULT NULL,
    `bio` text,
    `interests` text,
    `profileimg` varchar(255) DEFAULT NULL,
    `latitude` varchar(20),
    `longitude` varchar(20),
    `img1` varchar(255) DEFAULT NULL,
    `img2` varchar(255) DEFAULT NULL,
    `img3` varchar(255) DEFAULT NULL,
    `img4` varchar(255) DEFAULT NULL,
    `fame` int DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE utf8_general_ci;

CREATE TABLE `profile_views` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` varchar(32) DEFAULT NULL,
    `viewer_id` varchar(32) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE utf8_general_ci;

CREATE TABLE `likes` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` varchar(32) DEFAULT NULL,
    `liker_id` varchar(32) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE utf8_general_ci;

CREATE TABLE `chats` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `chat_id` varchar(32) DEFAULT NULL,
    `user_id` varchar(32) DEFAULT NULL,
    `recipient_id` varchar(32) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE utf8_general_ci;