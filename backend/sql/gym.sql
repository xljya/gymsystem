-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gymsystem
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coach`
--

DROP TABLE IF EXISTS `coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach` (
  `coach_id` bigint NOT NULL AUTO_INCREMENT COMMENT '教练ID',
  `coach_name` varchar(256) DEFAULT NULL COMMENT '教练姓名',
  `coach_account` varchar(256) NOT NULL COMMENT '教练账号',
  `coach_avatar` varchar(1024) DEFAULT 'https://img.liuyueyue.top//xl19e30fdf18962bc9.jpg' COMMENT '教练头像',
  `gender` tinyint DEFAULT '0' COMMENT '性别(0-未知,1-男,2-女)',
  `coach_age` int DEFAULT NULL COMMENT '教练年龄',
  `entry_date` date DEFAULT NULL COMMENT '入职日期',
  `course_type` varchar(1024) DEFAULT NULL COMMENT '教授课程类型',
  `coach_salary` varchar(64) DEFAULT NULL COMMENT '薪资（如：8000）',
  `coach_address` varchar(512) DEFAULT NULL COMMENT '住址',
  `coach_status` tinyint NOT NULL DEFAULT '0' COMMENT '状态(0-在职,1-休假,2-离职)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  PRIMARY KEY (`coach_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='教练信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coach`
--

LOCK TABLES `coach` WRITE;
/*!40000 ALTER TABLE `coach` DISABLE KEYS */;
INSERT INTO `coach` VALUES (1,'刘渊','liucf1','https://image.liucf.com/images/2025/05/aa95d2cad4cb7c3f713da141daa07e69.jpg',0,18,'2022-01-06','力量训练','10000','湖北',0,'2025-04-12 20:19:54','2025-05-11 18:14:01',0),(2,'丽莎','liucf2','https://image.liucf.com/images/2025/05/386fd710f16c993691c426f7f038c03e.png',0,15,'2025-05-08','普拉提','1','上海',0,'2025-04-12 21:55:43','2025-05-11 17:25:54',0),(3,'艾米丽','liucf3','https://image.liucf.com/images/2025/05/f5d72b762415932c4cd1e3f6c3af4307.jpg',2,15,'1970-01-01','瑜伽','1','广东',0,'2025-04-12 21:55:46','2025-05-11 18:14:01',0),(4,'杰西卡','coach_jie','https://image.liucf.com/images/2025/05/7270f3972f4896823d0de30ec61fa564.jpg',1,32,'2022-06-10','有氧运动','18000','浙江',0,'2025-04-12 22:36:48','2025-05-11 18:14:01',0),(5,'阿曼达','coach_a','https://image.liucf.com/images/2025/05/fde22ed2ff8d3b3597156e4788d98fe1.jpg',2,26,'2023-03-15','格斗','12000','成都',0,'2025-04-12 22:36:51','2025-05-11 18:14:01',0),(6,'莎拉','coach_sha','https://image.liucf.com/images/2025/05/e863d37a3ed789cd8dd75866e6c8a32a.jpg',1,35,'2021-11-20','舞蹈','20000','北京',0,'2025-04-12 22:37:22','2025-05-11 18:14:01',0),(7,'陈教练','coach_chen','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,29,'2023-01-05','团体课教练','15000','浙江',0,'2025-04-12 22:37:33','2025-05-19 00:21:04',1),(8,'周教练','coach_zhou','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,31,'2022-08-15','私人教练','16000','成都',0,'2025-04-12 22:37:46','2025-05-19 00:21:04',1),(9,'刘教练','Test1','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,20,'2025-04-13','Test1','12321','成都',0,'2025-04-13 19:05:56','2025-05-19 00:21:04',1),(10,'刘教练','Test5','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,19,'2025-04-13','Test5','13212','浙江',0,'2025-04-13 19:08:07','2025-05-19 00:21:04',1),(11,'刘教练','Test','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,11,'2025-04-13','Test','1213','北京',0,'2025-04-13 20:11:03','2025-05-19 00:21:04',1),(12,'李明','liming_coach','https://randomuser.me/api/portraits/men/32.jpg',1,30,'2020-01-01','力量训练','12000','北京',0,'2025-05-08 12:00:00','2025-05-11 17:27:07',1),(13,'王芳','wangfang_coach','https://randomuser.me/api/portraits/women/44.jpg',2,32,'2018-06-15','瑜伽','15000','上海',0,'2025-05-08 12:00:00','2025-05-11 17:27:07',1),(14,'张伟','zhangwei_coach','https://randomuser.me/api/portraits/men/22.jpg',1,28,'2021-03-01','有氧运动','10000','广东',0,'2025-05-08 12:00:00','2025-05-11 17:27:07',1),(15,'刘丽','liuli_coach','https://randomuser.me/api/portraits/women/58.jpg',2,29,'2019-09-10','舞蹈','11000','广东',0,'2025-05-08 12:00:00','2025-05-11 17:27:07',1),(16,'陈强','chenqiang_coach','https://randomuser.me/api/portraits/men/42.jpg',1,34,'2016-07-20','格斗','18000','成都',0,'2025-05-08 12:00:00','2025-05-11 17:27:07',1),(17,'赵雪','zhaoxue_coach','https://randomuser.me/api/portraits/women/26.jpg',2,27,'2022-02-01','普拉提','9000','浙江',0,'2025-05-08 12:00:00','2025-05-11 17:27:07',1);
/*!40000 ALTER TABLE `coach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` bigint NOT NULL AUTO_INCREMENT COMMENT '课程ID',
  `course_name` varchar(50) NOT NULL COMMENT '课程名称',
  `coach_id` bigint NOT NULL COMMENT '教练ID（关联 coach 表）',
  `selling_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '课程单价',
  `duration` int NOT NULL DEFAULT '120' COMMENT '课程时长（分钟）默认两小时',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  `category_id` bigint DEFAULT NULL COMMENT '课程类别ID',
  `difficulty_level` varchar(20) DEFAULT 'beginner' COMMENT '难度等级',
  `description` text COMMENT '课程描述',
  `image_url` varchar(255) DEFAULT NULL COMMENT '课程图片URL',
  PRIMARY KEY (`course_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `course_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='课程信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'私人健身',5,300.00,60,'2025-04-13 00:08:16','2025-05-19 00:21:04',1,2,'beginner','一对一的专业健身指导课程，根据您的身体状况和目标定制训练计划，适合所有健身水平。','https://img.28082003.com//xl19e30fdf18962bc9.jpg'),(2,'团体瑜伽课',3,150.00,90,'2025-04-13 00:08:25','2025-05-11 18:24:15',0,1,'beginner','在专业教练指导下进行的团体瑜伽课程，帮助提高柔韧性、平衡感和内心平静，适合初学者。','https://image.liucf.com/images/2025/05/5a0915a6306b1ca38f1584994d5e4385.jpeg'),(3,'拳击训练',5,200.00,45,'2025-04-13 00:08:38','2025-05-11 18:31:18',0,7,'high','高强度拳击训练课程，结合有氧运动和力量训练，提升耐力、协调性和爆发力。','https://image.liucf.com/images/2025/05/db4143bb4e57a36c0b09bb0d802807e1.jpeg'),(4,'普拉提课程',2,180.00,60,'2025-04-13 00:08:49','2025-05-19 00:21:04',1,4,'beginner','专注于核心肌群训练的普拉提课程，改善体态、增强肌肉控制力和身体柔韧性。','https://img.28082003.com//xl19e30fdf18962bc9.jpg'),(5,'动感单车',4,120.00,45,'2025-04-13 00:08:56','2025-05-11 18:37:25',0,3,'beginner','充满活力的室内单车课程，配合音乐节奏进行的有氧运动，高效燃烧卡路里。','https://image.liucf.com/images/2025/05/88df2c5a3bdf0d97871c724390e29d33.jpeg'),(6,'俯卧撑',1,60.00,69,'2025-04-13 19:37:20','2025-05-11 18:46:38',0,3,'high','俯卧撑','https://image.liucf.com/images/2025/05/d932f1ddb191909645940ce09ab2e731.jpeg'),(7,'高强度普拉提',2,12.00,12,'2025-05-04 23:14:53','2025-05-11 18:58:18',0,6,'high','趣味性强的健身课程，通过游戏化训练让运动变得更有趣，适合团体参与。','https://image.liucf.com/images/2025/05/8ae0af03d9f6be58fd5d6ad67dab9c8b.jpeg'),(8,'游泳',4,12.00,12,'2025-05-04 23:27:15','2025-05-11 18:58:56',0,2,'high','综合性的健身课程，结合有氧、力量和柔韧性训练，全面提升身体素质。','https://image.liucf.com/images/2025/05/5eeb74c7f62051e8112d86ff3f43a166.jpeg'),(9,'爵士舞',6,12.00,12,'2025-05-04 23:48:13','2025-05-11 18:59:58',1,3,'high','高强度间歇训练课程(HIIT)，短时间内高效燃烧脂肪，提升代谢率。','https://image.liucf.com/images/2025/05/8d7750f03c2d4bdf717aadebeca83506.jpeg'),(10,'腹肌撕裂训练',1,12.00,12,'2025-05-04 23:50:03','2025-05-19 00:21:04',1,2,'beginner','功能性训练课程，专注于提高日常生活中的运动能力，增强身体功能性力量。','https://img.28082003.com//xl19e30fdf18962bc9.jpg'),(11,'极限力量',1,100.00,60,'2025-05-08 12:00:00','2025-05-11 19:00:24',0,2,'high','全面的力量训练课程，专注于肌肉增长和力量提升。适合各个水平的健身爱好者。','https://image.liucf.com/images/2025/05/8d7750f03c2d4bdf717aadebeca83506.jpeg'),(12,'流瑜伽',3,100.00,75,'2025-05-08 12:00:00','2025-05-11 19:01:47',0,1,'medium','流畅连接的瑜伽动作，改善灵活性，减轻压力，增强核心力量。','https://image.liucf.com/images/2025/05/d529a24b69db472599956535069fde4b.jpeg'),(13,'燃脂有氧',4,100.00,45,'2025-05-08 12:00:00','2025-05-11 19:06:37',0,3,'high','高强度有氧训练，最大限度地燃烧脂肪，提高心肺功能。','https://image.liucf.com/images/2025/05/d195daf78a2b5a29394117c3df558d1a.jpeg'),(14,'街舞健身',6,100.00,60,'2025-05-08 12:00:00','2025-05-11 19:07:57',0,6,'medium','充满活力的街舞课程，融合现代舞步和有氧运动，让健身变得更加有趣。','https://image.liucf.com/images/2025/05/62fbe96cf6c11e5422b7f22a21ea6a0c.jpeg'),(15,'搏击训练',5,100.00,90,'2025-05-08 12:00:00','2025-05-11 19:17:11',0,7,'high','综合搏击技巧训练，提升自信心、协调性和整体健康水平。','https://image.liucf.com/images/2025/05/a6c9628ff1b9c688d95f52303c7f22b8.jpeg'),(16,'核心普拉提',2,100.00,55,'2025-05-08 12:00:00','2025-05-11 19:18:44',0,4,'low','专注于核心肌群的普拉提课程，改善姿势，增强稳定性和灵活性。','https://image.liucf.com/images/2025/05/a5ca58639890c06086fb6ee8b01dbe21.jpeg'),(17,'功能性训练',4,100.00,50,'2025-05-08 12:00:00','2025-05-11 19:22:58',0,2,'medium','专注于日常生活动作的功能性训练，提高整体健康和生活质量。','https://image.liucf.com/images/2025/05/afd17ad0fabddfd06abb96a13e6a6838.jpeg'),(18,'冥想瑜伽',3,100.00,60,'2025-05-08 12:00:00','2025-05-11 19:23:44',0,1,'low','结合瑜伽体位法和冥想技巧，帮助减轻压力，提高专注力和内心平静。','https://image.liucf.com/images/2025/05/926370948509a9f62f5fb98eb5f75289.jpeg'),(19,'耐力自行车',4,100.00,45,'2025-05-08 12:00:00','2025-05-11 19:22:19',0,3,'high','室内自行车课程，提高耐力和心肺功能，同时塑造下半身肌肉。','https://image.liucf.com/images/2025/05/c521e8fffdf6144fe797c421c0fb9cfa.jpeg');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_booking`
--

DROP TABLE IF EXISTS `course_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_booking` (
  `booking_id` bigint NOT NULL AUTO_INCREMENT COMMENT '预约ID',
  `schedule_id` bigint NOT NULL COMMENT '排期ID',
  `member_id` bigint NOT NULL COMMENT '会员ID',
  `booking_status` tinyint DEFAULT '1' COMMENT '预约状态(0-已取消,1-已预约,2-已完成)',
  `attendance_status` tinyint DEFAULT '0' COMMENT '出勤状态(0-未到,1-已到,2-请假,3-爽约)',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  PRIMARY KEY (`booking_id`),
  KEY `schedule_id` (`schedule_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `course_booking_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `course_schedule` (`schedule_id`),
  CONSTRAINT `course_booking_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='课程预约表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_booking`
--

LOCK TABLES `course_booking` WRITE;
/*!40000 ALTER TABLE `course_booking` DISABLE KEYS */;
INSERT INTO `course_booking` VALUES (1,1,1909924784758587393,2,1,'2024-03-18 10:00:00','2025-05-06 00:34:17',0),(2,2,1909924784758587393,0,0,'2024-03-18 11:00:00','2025-05-06 00:34:30',0),(3,3,1909924784758587393,1,0,'2024-03-18 12:00:00','2025-05-04 23:14:14',0),(4,4,1909924784758587393,1,0,'2024-03-18 13:00:00','2025-05-06 00:35:11',1),(6,3,1909924784758587393,1,0,'2025-05-07 01:09:24','2025-05-07 01:10:27',1),(7,3,1909924784758587393,1,0,'2025-05-07 01:10:44','2025-05-07 01:17:23',1),(8,1,1909924784758587393,1,0,'2025-05-07 01:17:38','2025-05-07 01:24:08',1),(9,1,1909924784758587393,2,1,'2025-05-07 01:24:25','2025-05-07 01:24:25',0),(11,29,1910721646705590273,1,0,'2025-05-09 13:30:41','2025-05-09 13:30:41',0),(12,29,1910721646705590273,1,0,'2025-05-09 13:35:10','2025-05-09 13:35:10',0),(13,29,1910721646705590273,1,0,'2025-05-09 13:36:35','2025-05-09 13:36:35',0),(14,128,1910721646705590273,1,0,'2025-05-09 13:36:48','2025-05-09 13:36:48',0),(15,29,1910721646705590273,1,0,'2025-05-09 13:38:10','2025-05-09 13:38:10',0),(16,128,1910721646705590273,1,0,'2025-05-09 13:38:19','2025-05-09 13:38:19',0),(17,29,1910721646705590273,1,0,'2025-05-09 13:43:06','2025-05-09 13:43:06',0),(18,29,1910721646705590273,1,0,'2025-05-09 13:43:18','2025-05-09 13:43:18',0),(19,29,1910721646705590273,1,0,'2025-05-09 13:44:35','2025-05-09 13:44:35',0),(20,29,1910721646705590273,1,0,'2025-05-09 13:44:56','2025-05-09 13:44:56',0),(21,29,1910721646705590273,1,0,'2025-05-09 13:44:58','2025-05-09 13:44:58',0),(22,29,1910721646705590273,1,0,'2025-05-09 13:57:44','2025-05-09 13:57:44',0),(23,29,1910721646705590273,1,0,'2025-05-09 13:58:16','2025-05-09 13:58:16',0),(24,128,1910721646705590273,1,0,'2025-05-09 13:58:17','2025-05-09 13:58:17',0),(25,149,1910721646705590273,1,0,'2025-05-09 13:58:28','2025-05-09 13:58:28',0),(26,149,1910721646705590273,1,0,'2025-05-09 14:01:06','2025-05-09 14:01:06',0),(27,29,1910721646705590273,1,0,'2025-05-09 14:01:17','2025-05-09 14:01:17',0),(28,29,1910721646705590273,1,0,'2025-05-09 14:02:53','2025-05-09 14:02:53',0),(29,14,1910721646705590273,1,0,'2025-05-09 14:03:16','2025-05-09 14:03:16',0),(30,29,1910721646705590273,1,0,'2025-05-09 14:06:25','2025-05-09 14:06:25',0),(31,146,1910721646705590273,1,0,'2025-05-09 16:42:27','2025-05-09 16:42:27',0),(32,25,1910721646705590273,1,0,'2025-05-09 16:52:44','2025-05-09 16:52:44',0),(33,129,1910721646705590273,1,0,'2025-05-13 09:36:22','2025-05-13 09:36:22',0),(34,128,1910721646705590273,1,0,'2025-05-13 16:00:34','2025-05-13 16:00:34',0),(35,29,1910721646705590273,1,0,'2025-05-15 00:32:23','2025-05-15 00:32:23',0),(36,29,1910721646705590273,1,0,'2025-05-15 00:41:01','2025-05-15 00:41:01',0),(37,128,1910721646705590273,1,0,'2025-05-15 00:43:01','2025-05-15 00:43:01',0),(41,14,1911375760909160452,1,0,'2025-05-15 18:13:16','2025-05-15 18:13:16',0);
/*!40000 ALTER TABLE `course_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_category`
--

DROP TABLE IF EXISTS `course_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT COMMENT '类别ID',
  `category_name` varchar(50) NOT NULL COMMENT '类别名称',
  `category_desc` varchar(255) DEFAULT NULL COMMENT '类别描述',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='课程类别表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_category`
--

LOCK TABLES `course_category` WRITE;
/*!40000 ALTER TABLE `course_category` DISABLE KEYS */;
INSERT INTO `course_category` VALUES (1,'瑜伽','提升身心灵活性和平衡感的瑜伽课程','2025-05-04 23:11:31','2025-05-04 23:11:31',0),(2,'力量训练','增强肌肉力量和耐力的专业训练','2025-05-04 23:11:31','2025-05-04 23:11:31',0),(3,'有氧运动','提高心肺功能的有氧运动课程','2025-05-04 23:11:31','2025-05-04 23:11:31',0),(4,'普拉提','加强核心力量的普拉提课程','2025-05-04 23:11:31','2025-05-04 23:11:31',0),(6,'舞蹈','充满活力的舞蹈健身课程','2025-05-04 23:11:31','2025-05-08 00:20:13',0),(7,'格斗','结合格斗技巧的高强度训练','2025-05-08 12:00:00','2025-05-08 00:20:37',0);
/*!40000 ALTER TABLE `course_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_schedule`
--

DROP TABLE IF EXISTS `course_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_schedule` (
  `schedule_id` bigint NOT NULL AUTO_INCREMENT COMMENT '排期ID',
  `course_id` bigint NOT NULL COMMENT '课程ID',
  `coach_id` bigint NOT NULL COMMENT '教练ID',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `max_participants` int DEFAULT '20' COMMENT '最大参与人数',
  `current_participants` int DEFAULT '0' COMMENT '当前参与人数',
  `room_number` varchar(20) DEFAULT NULL COMMENT '教室编号',
  `status` tinyint DEFAULT '1' COMMENT '状态(0-已取消,1-可预约,2-已满)',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  PRIMARY KEY (`schedule_id`),
  KEY `course_id` (`course_id`),
  KEY `coach_id` (`coach_id`),
  CONSTRAINT `course_schedule_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `course_schedule_ibfk_2` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`coach_id`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='课程排期表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_schedule`
--

LOCK TABLES `course_schedule` WRITE;
/*!40000 ALTER TABLE `course_schedule` DISABLE KEYS */;
INSERT INTO `course_schedule` VALUES (1,1,1,'2024-03-20 09:00:00','2024-03-20 10:00:00',20,0,'A101',0,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(2,2,2,'2024-03-20 10:30:00','2024-03-20 12:00:00',15,0,'B201',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(3,3,3,'2024-03-20 14:00:00','2024-03-20 15:00:00',25,0,'A102',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(4,4,1,'2024-03-20 16:00:00','2024-03-20 17:15:00',18,0,'C301',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(5,5,2,'2024-03-20 18:00:00','2024-03-20 19:30:00',15,0,'B202',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(6,6,5,'2024-03-21 07:00:00','2024-03-21 08:00:00',20,0,'A103',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(7,1,1,'2025-05-09 00:00:00','2025-05-29 00:00:00',12,0,'1',1,'2025-05-07 01:08:58','2025-05-07 01:33:47',1),(8,1,1,'2025-05-12 18:00:00','2025-05-12 19:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(9,1,1,'2025-05-14 18:00:00','2025-05-14 19:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(10,1,1,'2025-05-16 18:00:00','2025-05-16 19:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(11,2,2,'2025-05-13 09:00:00','2025-05-13 10:15:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(12,2,2,'2025-05-15 09:00:00','2025-05-15 10:15:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(13,2,2,'2025-05-17 10:00:00','2025-05-17 11:15:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(14,3,3,'2025-05-12 12:30:00','2025-05-12 13:15:00',20,2,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(15,3,3,'2025-05-14 12:30:00','2025-05-14 13:15:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(16,3,3,'2025-05-16 12:30:00','2025-05-16 13:15:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(17,4,4,'2025-05-13 19:00:00','2025-05-13 20:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(18,4,4,'2025-05-15 19:00:00','2025-05-15 20:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(19,4,4,'2025-05-18 16:00:00','2025-05-18 17:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(20,5,5,'2025-05-12 20:00:00','2025-05-12 21:30:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(21,5,5,'2025-05-15 20:00:00','2025-05-15 21:30:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(22,5,5,'2025-05-17 18:00:00','2025-05-17 19:30:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(23,6,6,'2025-05-13 10:30:00','2025-05-13 11:25:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(24,6,6,'2025-05-16 10:30:00','2025-05-16 11:25:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(25,6,6,'2025-05-18 09:30:00','2025-05-18 10:25:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(26,7,1,'2025-05-13 18:00:00','2025-05-13 18:50:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(27,7,1,'2025-05-15 18:00:00','2025-05-15 18:50:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(28,7,1,'2025-05-17 11:00:00','2025-05-17 11:50:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(29,8,2,'2025-05-12 09:00:00','2025-05-12 10:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-15 01:34:56',0),(30,8,2,'2025-05-14 09:00:00','2025-05-14 10:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(31,8,2,'2025-05-16 09:00:00','2025-05-16 10:00:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(32,9,3,'2025-05-13 06:30:00','2025-05-13 07:15:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(33,9,3,'2025-05-15 06:30:00','2025-05-15 07:15:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(34,9,3,'2025-05-17 08:00:00','2025-05-17 08:45:00',20,0,'Gym Room 1',1,'2025-05-08 12:00:00','2025-05-07 21:06:26',0),(128,11,1,'2024-03-18 09:00:00','2024-03-18 10:00:00',20,1,'A101',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(129,11,1,'2024-03-20 09:00:00','2024-03-20 10:00:00',20,0,'A101',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(130,11,1,'2024-03-22 09:00:00','2024-03-22 10:00:00',20,0,'A101',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(131,12,2,'2024-03-19 10:00:00','2024-03-19 11:15:00',15,0,'B201',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(132,12,2,'2024-03-21 10:00:00','2024-03-21 11:15:00',15,0,'B201',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(133,12,2,'2024-03-23 10:00:00','2024-03-23 11:15:00',15,0,'B201',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(134,13,3,'2024-03-18 18:00:00','2024-03-18 18:45:00',25,0,'C301',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(135,13,3,'2024-03-20 18:00:00','2024-03-20 18:45:00',25,0,'C301',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(136,13,3,'2024-03-22 18:00:00','2024-03-22 18:45:00',25,0,'C301',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(137,14,4,'2024-03-19 19:00:00','2024-03-19 20:00:00',20,0,'D401',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(138,14,4,'2024-03-21 19:00:00','2024-03-21 20:00:00',20,0,'D401',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(139,14,4,'2024-03-23 19:00:00','2024-03-23 20:00:00',20,0,'D401',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(140,15,7,'2024-03-18 14:00:00','2024-03-18 15:30:00',15,1,'E501',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(141,15,7,'2024-03-20 14:00:00','2024-03-20 15:30:00',15,0,'E501',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(142,15,7,'2024-03-22 14:00:00','2024-03-22 15:30:00',15,0,'E501',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(143,16,6,'2024-03-19 08:00:00','2024-03-19 08:55:00',12,0,'F601',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(144,16,6,'2024-03-21 08:00:00','2024-03-21 08:55:00',12,0,'F601',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(145,16,6,'2024-03-23 08:00:00','2024-03-23 08:55:00',12,0,'F601',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(146,17,1,'2024-03-18 16:00:00','2024-03-18 16:50:00',20,0,'G701',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(147,17,1,'2024-03-20 16:00:00','2024-03-20 16:50:00',20,0,'G701',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(148,17,1,'2024-03-22 16:00:00','2024-03-22 16:50:00',20,0,'G701',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(149,18,2,'2024-03-19 07:00:00','2024-03-19 08:00:00',15,0,'H801',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(150,18,2,'2024-03-21 07:00:00','2024-03-21 08:00:00',15,0,'H801',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(151,18,2,'2024-03-23 07:00:00','2024-03-23 08:00:00',15,0,'H801',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(152,19,3,'2024-03-18 17:00:00','2024-03-18 17:45:00',20,0,'I901',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(153,19,3,'2024-03-20 17:00:00','2024-03-20 17:45:00',20,0,'I901',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(154,19,3,'2024-03-22 17:00:00','2024-03-22 17:45:00',20,0,'I901',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0);
/*!40000 ALTER TABLE `course_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `eq_id` bigint NOT NULL AUTO_INCREMENT COMMENT '器械ID',
  `eqcategory_id` bigint NOT NULL COMMENT '器械分类ID',
  `eq_name` varchar(1024) DEFAULT NULL COMMENT '器械名称',
  `eq_text` varchar(1024) DEFAULT NULL COMMENT '器械描述/规格',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  `short_description` varchar(1024) DEFAULT NULL COMMENT '简短描述',
  `description` text COMMENT '详细描述',
  `specifications` json DEFAULT NULL COMMENT '器械规格(JSON对象格式，如{"材质":"聚酯纤维"})',
  `features` json DEFAULT NULL COMMENT '器械特征(JSON数组格式，如["防水","耐磨"])',
  `image` varchar(255) DEFAULT NULL COMMENT '主图URL',
  `images` json DEFAULT NULL COMMENT '轮播图URL数组（JSON格式）',
  `featured` tinyint DEFAULT '0' COMMENT '是否首页推荐（0-否，1-是）',
  PRIMARY KEY (`eq_id`),
  KEY `fk_equipment_category` (`eqcategory_id`),
  CONSTRAINT `fk_equipment_category` FOREIGN KEY (`eqcategory_id`) REFERENCES `equipment_category` (`eqcategory_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='健身房器械表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (1,1,'cardio：高级跑步机','专业级跑步机，配备先进的减震系统和智能显示屏','2025-05-11 00:19:48','2025-05-14 04:43:18',0,NULL,NULL,NULL,NULL,NULL,NULL,0),(2,1,'cardio：动感单车','专业级动感单车，提供家庭和健身房级别的骑行体验','2025-05-11 00:19:48','2025-05-14 04:43:18',0,NULL,NULL,NULL,NULL,NULL,NULL,0),(3,1,'cardio：划船机','专业划船机，提供全身性的心肺训练','2025-05-11 00:19:48','2025-05-14 04:43:18',0,NULL,NULL,NULL,NULL,NULL,NULL,0),(4,1,'strength：力量训练框架','全功能力量训练框架，适合多种力量训练','2025-05-11 00:19:48','2025-05-14 04:43:18',0,NULL,NULL,NULL,NULL,NULL,NULL,0),(5,1,'strength：史密斯机','多功能史密斯机，提供安全可靠的力量训练','2025-05-11 00:19:49','2025-05-14 04:43:18',0,NULL,NULL,NULL,NULL,NULL,NULL,0),(6,1,'functional：可调节哑铃套装','一套哑铃满足多种重量需求，节省空间','2025-05-11 00:20:30','2025-05-14 04:43:18',0,NULL,NULL,NULL,NULL,NULL,NULL,0),(7,1,'functional：壶铃套装','专业级壶铃套装，适合功能性训练','2025-05-11 00:20:30','2025-05-14 04:43:18',0,NULL,NULL,NULL,NULL,NULL,NULL,0),(8,1,'accessories：阻力带套装','多种阻力等级的弹力带，适合各种训练需求','2025-05-11 00:20:30','2025-05-14 04:43:18',0,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_category`
--

DROP TABLE IF EXISTS `equipment_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_category` (
  `eqcategory_id` bigint NOT NULL AUTO_INCREMENT COMMENT '器械分类ID',
  `category_name` varchar(255) NOT NULL COMMENT '分类名称',
  `category_description` text COMMENT '分类描述',
  `category_icon` varchar(255) DEFAULT NULL COMMENT '分类图标URL',
  `category_image` varchar(255) DEFAULT NULL COMMENT '分类图片URL',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除（0-未删除，1-已删除）',
  PRIMARY KEY (`eqcategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='器械分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_category`
--

LOCK TABLES `equipment_category` WRITE;
/*!40000 ALTER TABLE `equipment_category` DISABLE KEYS */;
INSERT INTO `equipment_category` VALUES (1,'有氧器械','提升心肺功能，增强耐力','<Bike className=\"w-10 h-10 text-gym-accent\" />','https://image.liucf.com/images/2025/05/715aaff5c48c04e1dd1cca498e8633cb.jpeg','2025-05-14 04:26:02','2025-05-14 04:26:02',0);
/*!40000 ALTER TABLE `equipment_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `goods_id` int NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `goods_name` varchar(50) NOT NULL COMMENT '商品名称',
  `unit` varchar(20) DEFAULT '个' COMMENT '计量单位(瓶/个/根等)',
  `unit_price` decimal(10,2) DEFAULT '0.00' COMMENT '进货单价',
  `sell_price` decimal(10,2) DEFAULT '0.00' COMMENT '销售单价',
  `inventory` int DEFAULT '0' COMMENT '当前库存',
  `remark` varchar(255) DEFAULT NULL COMMENT '商品备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  `gdcategory_id` int DEFAULT NULL COMMENT '商品类别ID',
  `good_avatar` varchar(255) DEFAULT NULL COMMENT '商品主图URL',
  `features` json DEFAULT NULL COMMENT '商品特点（"25g 乳清蛋白/份","添加BCAA 支链氨基酸"）',
  `specifications` json DEFAULT NULL COMMENT '规格参数（JSON格式，如{"颜色":"红色","重量":"500g"}）',
  PRIMARY KEY (`goods_id`),
  KEY `idx_category` (`gdcategory_id`),
  CONSTRAINT `fk_goods_category` FOREIGN KEY (`gdcategory_id`) REFERENCES `goods_category` (`gdcategory_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,'Test','个',198.00,199.00,0,'无需多言','2025-04-14 00:40:48','2025-04-14 19:20:19',0,NULL,NULL,NULL,NULL),(2,'Test2','个',1.00,2.00,1,'11','2025-04-14 00:47:25','2025-04-14 00:50:33',1,NULL,NULL,NULL,NULL),(3,'zbc','人',198.00,199.00,10,'1','2025-04-14 00:50:27','2025-04-14 19:27:17',0,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_category`
--

DROP TABLE IF EXISTS `goods_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods_category` (
  `gdcategory_id` int NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `category_name` varchar(255) NOT NULL COMMENT '分类名称',
  `category_description` varchar(1024) DEFAULT NULL COMMENT '分类描述',
  `category_icon` varchar(255) DEFAULT NULL COMMENT '分类图标URL',
  `category_image` varchar(255) DEFAULT NULL COMMENT '分类图片URL',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除（0-未删除，1-已删除）',
  PRIMARY KEY (`gdcategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_category`
--

LOCK TABLES `goods_category` WRITE;
/*!40000 ALTER TABLE `goods_category` DISABLE KEYS */;
INSERT INTO `goods_category` VALUES (1,'营养补剂','蛋白粉、BCAA 等运动营养补给','<Package className=\"w-10 h-10 text-blue-500\" />','https://images.unsplash.com/photo-1596177582967-a5d143a41237?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&w=800&q=60','2025-05-14 04:11:25','2025-05-14 04:11:25',0);
/*!40000 ALTER TABLE `goods_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_transactions`
--

DROP TABLE IF EXISTS `goods_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods_transactions` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `goods_id` bigint NOT NULL COMMENT '商品ID(关联 goods 表)',
  `member_id` bigint NOT NULL COMMENT '会员ID(关联 members 表)',
  `count` int NOT NULL DEFAULT '1' COMMENT '购买数量',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '成交单价',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品销售记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_transactions`
--

LOCK TABLES `goods_transactions` WRITE;
/*!40000 ALTER TABLE `goods_transactions` DISABLE KEYS */;
INSERT INTO `goods_transactions` VALUES (1,1,1909924202316566530,18,1999.00,'2025-04-14 01:48:03','2025-04-14 02:29:12',0),(2,1,1909924202316566530,4,1.00,'2025-04-14 02:28:37','2025-04-14 02:29:02',1),(3,3,1910364475484536833,1,1.00,'2025-04-14 19:21:59','2025-04-14 19:28:39',0);
/*!40000 ALTER TABLE `goods_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '会员ID',
  `member_name` varchar(256) DEFAULT NULL COMMENT '会员昵称',
  `member_account` varchar(256) NOT NULL COMMENT '会员账号',
  `member_avatar` varchar(1024) DEFAULT 'https://img.liuyueyue.top//xl19e30fdf18962bc9.jpg' COMMENT '会员头像',
  `gender` tinyint DEFAULT '0' COMMENT '性别(0-未知,1-男,2-女)',
  `member_role` varchar(256) NOT NULL DEFAULT 'member' COMMENT '会员角色：member/admin',
  `member_password` varchar(512) NOT NULL COMMENT '密码',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_member_account` (`member_account`)
) ENGINE=InnoDB AUTO_INCREMENT=1911375760909160454 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='会员信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1909924202316566530,'Stargaze','liucf1','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,'admin','d9ca96def632da1163e0f6562168cd31','2025-04-09 18:59:49','2025-05-19 00:21:04',0),(1909924784758587393,'无名','liucf2','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-09 19:02:08','2025-05-19 00:21:04',1),(1910364475484536833,'Stargaze','liucf3','',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-11 00:09:18','2025-04-11 00:09:18',0),(1910721646705590273,'Stargaze','ceshi1','',2,'member','d9ca96def632da1163e0f6562168cd31','2025-04-11 23:48:34','2025-04-12 17:32:11',0),(1910723409839996930,'Stargaze','ceshi2','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-11 23:55:35','2025-05-19 00:21:04',1),(1910724238936457217,'Stargaze','ceshi3','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-11 23:58:52','2025-05-19 00:21:04',1),(1910725213885644801,'Stargaze','ceshi4','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 00:02:45','2025-05-19 00:21:04',1),(1910740245998551041,'Stargaze','liucf5','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 01:02:29','2025-05-19 00:21:04',1),(1910741447796670465,'Stargaze','ceshi5','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 01:07:15','2025-05-19 00:21:04',1),(1910750426916536322,'Stargaze','ceshi6','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 01:42:56','2025-05-19 00:21:04',1),(1910779817625206786,'Stargaze','liucf6','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 03:39:43','2025-05-19 00:21:04',1),(1911368204853727233,'Test','Test','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,'admin','d9ca96def632da1163e0f6562168cd31','2025-04-13 18:37:46','2025-05-19 00:21:04',1),(1911368499855904769,'Test2','Test2','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,'admin','d9ca96def632da1163e0f6562168cd31','2025-04-13 18:38:56','2025-05-19 00:21:04',0),(1911374676723519490,'Test3','Test3','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,'member','d9ca96def632da1163e0f6562168cd31','2025-04-13 19:03:29','2025-05-19 00:21:04',0),(1911374765416271874,'Test4','Test4','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'admin','d9ca96def632da1163e0f6562168cd31','2025-04-13 19:03:50','2025-05-19 00:21:04',0),(1911375760909160450,'Test5','Test5','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,'member','d9ca96def632da1163e0f6562168cd31','2025-04-13 19:07:47','2025-05-19 00:21:04',0),(1911375760909160451,'Stargaze','bishe1','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-05-15 16:35:50','2025-05-19 00:21:04',1),(1911375760909160452,'Stargaze','bisheceshi1','https://img.28082003.com//xl19e30fdf18962bc9.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-05-15 18:12:38','2025-05-19 00:21:04',0),(1911375760909160453,'bisheceshi2','bisheceshi2','https://img.28082003.com//xl19e30fdf18962bc9.jpg',1,'member','d9ca96def632da1163e0f6562168cd31','2025-05-15 18:15:41','2025-05-19 00:21:04',0);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-19  2:31:13
