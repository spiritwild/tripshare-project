SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

--
-- table structure for table 'users'
--
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(100) NOT NULL DEFAULT '',
    `bod` VARCHAR(15) NOT NULL DEFAULT '',
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `id_card` VARCHAR(12) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone`   VARCHAR(20) NOT NULL,
    `permission` VARCHAR(20) DEFAULT 'customer',
    PRIMARY KEY (`id`),
    CONSTRAINT email_unique UNIQUE (`email`),
    CONSTRAINT username_unique UNIQUE (`username`)
)ENGINE = MyISAM
   DEFAULT CHARSET = utf8
   AUTO_INCREMENT = 1;