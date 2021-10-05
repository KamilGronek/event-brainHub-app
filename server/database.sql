CREATE DATABASE IF NOT EXISTS event_brainhub;

CREATE TABLE IF NOT EXISTS `event`  (
 `first_name` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
 `last_name` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
 `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
 `date` date NOT NULL,
 `id` int(11) NOT NULL AUTO_INCREMENT,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci