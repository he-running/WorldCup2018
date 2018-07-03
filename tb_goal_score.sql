/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : worldcup_db

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-07-02 11:42:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_goal_score`
-- ----------------------------
DROP TABLE IF EXISTS `tb_goal_score`;
CREATE TABLE `tb_goal_score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '姓名',
  `position` varchar(50) NOT NULL COMMENT '位置',
  `num` varchar(50) NOT NULL COMMENT '球衣号码',
  `team` varchar(50) NOT NULL COMMENT '国家队',
  `score` varchar(2) NOT NULL DEFAULT '0' COMMENT '进球数',
  `imgUrl` varchar(300) DEFAULT NULL COMMENT '头像链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='世界杯射手榜';

-- ----------------------------
-- Records of tb_goal_score
-- ----------------------------
