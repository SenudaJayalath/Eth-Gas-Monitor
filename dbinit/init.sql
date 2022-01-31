CREATE DATABASE IF NOT EXISTS gaspricedb;

USE gaspricedb;

DROP TABLE IF EXISTS gasprice;

CREATE TABLE gasprice (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  time_stamp     BIGINT DEFAULT NULL,
  fast_price     INT DEFAULT NULL,
  average_price  INT DEFAULT NULL,
  low_price      INT DEFAULT NULL,
  mean_price     FLOAT DEFAULT NULL,
  block_number   BIGINT DEFAULT NULL,
  PRIMARY KEY (id)
);
