-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gymsystem
-- ------------------------------------------------------
-- Server version	8.0.42

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
  `coach_avatar` varchar(1024) DEFAULT 'https://cdn.jsdelivr.net/gh/xljya/image/post/xl19e30fdf18962bc9.jpg' COMMENT '教练头像',
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
INSERT INTO `coach` VALUES (1,'刘渊','liucf1','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247676_0.jpg',0,18,'2022-01-06','力量训练','10000','湖北',0,'2025-04-12 20:19:54','2025-06-11 01:24:25',0),(2,'丽莎','liucf2','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247706_1.png',0,15,'2025-05-08','普拉提','1','上海',0,'2025-04-12 21:55:43','2025-06-11 01:24:25',0),(3,'艾米丽','liucf3','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247708_2.jpg',2,15,'1970-01-01','瑜伽','1','广东',0,'2025-04-12 21:55:46','2025-06-11 01:24:25',0),(4,'杰西卡','coach_jie','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247708_3.jpg',1,32,'2022-06-10','有氧运动','18000','浙江',0,'2025-04-12 22:36:48','2025-06-11 01:24:25',0),(5,'阿曼达','coach_a','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247709_4.jpg',2,26,'2023-03-15','格斗','12000','成都',0,'2025-04-12 22:36:51','2025-06-11 01:24:25',0),(6,'莎拉','coach_sha','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247710_5.jpg',1,35,'2021-11-20','舞蹈','20000','北京',0,'2025-04-12 22:37:22','2025-06-11 01:24:25',0),(7,'陈教练','coach_chen','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247710_6.jpg',0,29,'2023-01-05','团体课教练','15000','浙江',0,'2025-04-12 22:37:33','2025-06-11 01:24:25',1),(8,'周教练','coach_zhou','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247711_7.jpg',1,31,'2022-08-15','私人教练','16000','成都',0,'2025-04-12 22:37:46','2025-06-11 01:24:25',1),(9,'刘教练','Test1','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247711_8.jpg',1,20,'2025-04-13','Test1','12321','成都',0,'2025-04-13 19:05:56','2025-06-11 01:24:25',1),(10,'刘教练','Test5','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247712_9.jpg',1,19,'2025-04-13','Test5','13212','浙江',0,'2025-04-13 19:08:07','2025-06-11 01:24:25',1),(11,'刘教练','Test','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576247712_10.jpg',1,11,'2025-04-13','Test','1213','北京',0,'2025-04-13 20:11:03','2025-06-11 01:24:25',1);
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
INSERT INTO `course` VALUES (1,'私人健身',5,300.00,60,'2025-04-13 00:08:16','2025-06-11 02:03:39',1,2,'beginner','一对一的专业健身指导课程，根据您的身体状况和目标定制训练计划，适合所有健身水平。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg'),(2,'团体瑜伽课',3,150.00,90,'2025-04-13 00:08:25','2025-06-11 01:25:03',0,1,'beginner','在专业教练指导下进行的团体瑜伽课程，帮助提高柔韧性、平衡感和内心平静，适合初学者。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265622_0.jpeg'),(3,'拳击训练',5,200.00,45,'2025-04-13 00:08:38','2025-06-11 01:25:03',0,7,'high','高强度拳击训练课程，结合有氧运动和力量训练，提升耐力、协调性和爆发力。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265624_1.jpeg'),(4,'普拉提课程',2,180.00,60,'2025-04-13 00:08:49','2025-06-11 02:03:39',1,4,'beginner','专注于核心肌群训练的普拉提课程，改善体态、增强肌肉控制力和身体柔韧性。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg'),(5,'动感单车',4,120.00,45,'2025-04-13 00:08:56','2025-06-11 01:25:03',0,3,'beginner','充满活力的室内单车课程，配合音乐节奏进行的有氧运动，高效燃烧卡路里。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265625_2.jpeg'),(6,'俯卧撑',1,60.00,69,'2025-04-13 19:37:20','2025-06-11 01:25:03',0,3,'high','俯卧撑','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265626_3.jpeg'),(7,'高强度普拉提',2,12.00,12,'2025-05-04 23:14:53','2025-06-11 01:25:03',0,6,'high','趣味性强的健身课程，通过游戏化训练让运动变得更有趣，适合团体参与。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265627_4.jpeg'),(8,'游泳',4,12.00,12,'2025-05-04 23:27:15','2025-06-11 01:25:03',0,2,'high','综合性的健身课程，结合有氧、力量和柔韧性训练，全面提升身体素质。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265628_5.jpeg'),(9,'爵士舞',6,12.00,12,'2025-05-04 23:48:13','2025-06-11 01:25:03',1,3,'high','高强度间歇训练课程(HIIT)，短时间内高效燃烧脂肪，提升代谢率。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265628_6.jpeg'),(10,'腹肌撕裂训练',1,12.00,12,'2025-05-04 23:50:03','2025-06-11 02:03:39',1,2,'beginner','功能性训练课程，专注于提高日常生活中的运动能力，增强身体功能性力量。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg'),(11,'极限力量',1,100.00,60,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,2,'high','全面的力量训练课程，专注于肌肉增长和力量提升。适合各个水平的健身爱好者。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265629_7.jpeg'),(12,'流瑜伽',3,100.00,75,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,1,'medium','流畅连接的瑜伽动作，改善灵活性，减轻压力，增强核心力量。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265630_8.jpeg'),(13,'燃脂有氧',4,100.00,45,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,3,'high','高强度有氧训练，最大限度地燃烧脂肪，提高心肺功能。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265631_9.jpeg'),(14,'街舞健身',6,100.00,60,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,6,'medium','充满活力的街舞课程，融合现代舞步和有氧运动，让健身变得更加有趣。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265631_10.jpeg'),(15,'搏击训练',5,100.00,90,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,7,'high','综合搏击技巧训练，提升自信心、协调性和整体健康水平。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265632_11.jpeg'),(16,'核心普拉提',2,100.00,55,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,4,'low','专注于核心肌群的普拉提课程，改善姿势，增强稳定性和灵活性。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265633_12.jpeg'),(17,'功能性训练',4,100.00,50,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,2,'medium','专注于日常生活动作的功能性训练，提高整体健康和生活质量。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265633_13.jpeg'),(18,'冥想瑜伽',3,100.00,60,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,1,'low','结合瑜伽体位法和冥想技巧，帮助减轻压力，提高专注力和内心平静。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265634_14.jpeg'),(19,'耐力自行车',4,100.00,45,'2025-05-08 12:00:00','2025-06-11 01:25:03',0,3,'high','室内自行车课程，提高耐力和心肺功能，同时塑造下半身肌肉。','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576265635_15.jpeg');
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='课程预约表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_booking`
--

LOCK TABLES `course_booking` WRITE;
/*!40000 ALTER TABLE `course_booking` DISABLE KEYS */;
INSERT INTO `course_booking` VALUES (1,1,1909924784758587393,2,1,'2024-03-18 10:00:00','2025-05-06 00:34:17',0),(2,2,1909924784758587393,0,0,'2024-03-18 11:00:00','2025-05-06 00:34:30',0),(3,3,1909924784758587393,1,0,'2024-03-18 12:00:00','2025-05-04 23:14:14',0),(4,4,1909924784758587393,1,0,'2024-03-18 13:00:00','2025-05-06 00:35:11',1),(6,3,1909924784758587393,1,0,'2025-05-07 01:09:24','2025-05-07 01:10:27',1),(7,3,1909924784758587393,1,0,'2025-05-07 01:10:44','2025-05-07 01:17:23',1),(8,1,1909924784758587393,1,0,'2025-05-07 01:17:38','2025-05-07 01:24:08',1),(9,1,1909924784758587393,2,1,'2025-05-07 01:24:25','2025-05-07 01:24:25',0),(41,14,1911375760909160452,1,0,'2025-05-15 18:13:16','2025-05-15 18:13:16',0),(42,29,1910721646705590273,0,0,'2025-05-20 18:01:22','2025-06-10 03:23:36',0);
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
INSERT INTO `course_schedule` VALUES (1,1,1,'2024-03-20 09:00:00','2024-03-20 10:00:00',20,0,'A101',0,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(2,2,2,'2024-03-20 10:30:00','2024-03-20 12:00:00',15,0,'B201',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(3,3,3,'2024-03-20 14:00:00','2024-03-20 15:00:00',25,0,'A102',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(4,4,1,'2024-03-20 16:00:00','2024-03-20 17:15:00',18,0,'C301',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(5,5,2,'2024-03-20 18:00:00','2024-03-20 19:30:00',15,0,'B202',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(6,6,5,'2024-03-21 07:00:00','2024-03-21 08:00:00',20,0,'A103',1,'2025-05-04 23:11:04','2025-05-15 00:42:47',0),(7,1,1,'2025-05-09 00:00:00','2025-05-29 00:00:00',12,0,'A104',1,'2025-05-07 01:08:58','2025-05-20 17:21:26',1),(8,1,1,'2025-05-12 18:00:00','2025-05-12 19:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:21:26',0),(9,1,1,'2025-05-14 18:00:00','2025-05-14 19:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:21:26',0),(10,1,1,'2025-05-16 18:00:00','2025-05-16 19:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:21:26',0),(11,2,2,'2025-05-13 09:00:00','2025-05-13 10:15:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:21:26',0),(12,2,2,'2025-05-15 09:00:00','2025-05-15 10:15:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:21:26',0),(13,2,2,'2025-05-17 10:00:00','2025-05-17 11:15:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:21:26',0),(14,3,3,'2025-05-12 12:30:00','2025-05-12 13:15:00',20,2,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:21:26',0),(15,3,3,'2025-05-14 12:30:00','2025-05-14 13:15:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(16,3,3,'2025-05-16 12:30:00','2025-05-16 13:15:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(17,4,4,'2025-05-13 19:00:00','2025-05-13 20:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(18,4,4,'2025-05-15 19:00:00','2025-05-15 20:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(19,4,4,'2025-05-18 16:00:00','2025-05-18 17:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(20,5,5,'2025-05-12 20:00:00','2025-05-12 21:30:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(21,5,5,'2025-05-15 20:00:00','2025-05-15 21:30:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(22,5,5,'2025-05-17 18:00:00','2025-05-17 19:30:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(23,6,6,'2025-05-13 10:30:00','2025-05-13 11:25:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(24,6,6,'2025-05-16 10:30:00','2025-05-16 11:25:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(25,6,6,'2025-05-18 09:30:00','2025-05-18 10:25:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(26,7,1,'2025-05-13 18:00:00','2025-05-13 18:50:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(27,7,1,'2025-05-15 18:00:00','2025-05-15 18:50:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(28,7,1,'2025-05-17 11:00:00','2025-05-17 11:50:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(29,8,2,'2025-05-12 09:00:00','2025-05-12 10:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(30,8,2,'2025-05-14 09:00:00','2025-05-14 10:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(31,8,2,'2025-05-16 09:00:00','2025-05-16 10:00:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(32,9,3,'2025-05-13 06:30:00','2025-05-13 07:15:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(33,9,3,'2025-05-15 06:30:00','2025-05-15 07:15:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(34,9,3,'2025-05-17 08:00:00','2025-05-17 08:45:00',20,0,'C414',1,'2025-05-08 12:00:00','2025-05-20 17:33:36',0),(128,11,1,'2024-03-18 09:00:00','2024-03-18 10:00:00',20,1,'A101',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(129,11,1,'2024-03-20 09:00:00','2024-03-20 10:00:00',20,0,'A101',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(130,11,1,'2024-03-22 09:00:00','2024-03-22 10:00:00',20,0,'A101',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(131,12,2,'2024-03-19 10:00:00','2024-03-19 11:15:00',15,0,'B201',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(132,12,2,'2024-03-21 10:00:00','2024-03-21 11:15:00',15,0,'B201',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(133,12,2,'2024-03-23 10:00:00','2024-03-23 11:15:00',15,0,'B201',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(134,13,3,'2024-03-18 18:00:00','2024-03-18 18:45:00',25,0,'C301',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(135,13,3,'2024-03-20 18:00:00','2024-03-20 18:45:00',25,0,'C301',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(136,13,3,'2024-03-22 18:00:00','2024-03-22 18:45:00',25,0,'C301',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(137,14,4,'2024-03-19 19:00:00','2024-03-19 20:00:00',20,0,'D401',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(138,14,4,'2024-03-21 19:00:00','2024-03-21 20:00:00',20,0,'D401',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(139,14,4,'2024-03-23 19:00:00','2024-03-23 20:00:00',20,0,'D401',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(140,15,7,'2024-03-18 14:00:00','2024-03-18 15:30:00',15,1,'E501',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(141,15,7,'2024-03-20 14:00:00','2024-03-20 15:30:00',15,0,'E501',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(142,15,7,'2024-03-22 14:00:00','2024-03-22 15:30:00',15,0,'E501',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(143,16,6,'2024-03-19 08:00:00','2024-03-19 08:55:00',12,0,'F601',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(144,16,6,'2024-03-21 08:00:00','2024-03-21 08:55:00',12,0,'F601',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(145,16,6,'2024-03-23 08:00:00','2024-03-23 08:55:00',12,0,'F601',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(146,17,1,'2024-03-18 16:00:00','2024-03-18 16:50:00',20,0,'G701',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(147,17,1,'2024-03-20 16:00:00','2024-03-20 16:50:00',20,0,'G701',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(148,17,1,'2024-03-22 16:00:00','2024-03-22 16:50:00',20,0,'G701',1,'2025-05-09 01:13:58','2025-05-09 01:13:58',0),(149,18,2,'2024-03-19 07:00:00','2024-03-19 08:00:00',15,0,'H801',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(150,18,2,'2024-03-21 07:00:00','2024-03-21 08:00:00',15,0,'H801',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(151,18,2,'2024-03-23 07:00:00','2024-03-23 08:00:00',15,0,'H801',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(152,19,3,'2024-03-18 17:00:00','2024-03-18 17:45:00',20,0,'I901',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(153,19,3,'2024-03-20 17:00:00','2024-03-20 17:45:00',20,0,'I901',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0),(154,19,3,'2024-03-22 17:00:00','2024-03-22 17:45:00',20,0,'I901',1,'2025-05-09 01:13:59','2025-05-09 01:13:59',0);
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
INSERT INTO `equipment` VALUES (1,1,'高级跑步机 Pro 2000','专业级跑步机，配备先进的减震系统和智能显示屏','2025-05-11 00:19:48','2025-06-11 02:39:30',0,'专业级跑步机，配备先进的减震系统和智能显示屏','高级跑步机 Pro 2000是一款专为健身爱好者设计的高端跑步机。它配备了先进的减震系统，可以有效减少对关节的冲击，让您的跑步体验更加舒适。智能显示屏可以实时监控您的心率、速度、距离和卡路里消耗，帮助您更好地掌握训练情况。强大的马达可以提供稳定的动力，支持高达20公里每小时的速度，满足不同强度的训练需求。','{\"功率\": \"3.0 HP\", \"坡度\": \"0-15%\", \"尺寸\": \"200 x 90 x 130 cm\", \"最大承重\": \"150 公斤\", \"最大速度\": \"20 公里/小时\", \"跑步带尺寸\": \"50 x 150 cm\"}','[\"先进的减震系统，保护关节\", \"15寸智能触控显示屏\", \"内置多种训练课程\", \"心率监测功能\", \"可折叠设计，节省空间\", \"静音设计，降低噪音\"]','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351887_0.jpg','[\"https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351887_0.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592080_1.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592082_2.jpg\"]',1),(2,1,'动感单车 Spinner','专业级动感单车，提供家庭和健身房级别的骑行体验','2025-05-11 00:19:48','2025-06-11 02:39:30',0,'专业级动感单车，提供家庭和健身房级别的骑行体验','动感单车 Spinner是一款专业级的室内骑行器材，为爱好者提供真实的骑行体验。采用重型飞轮设计，可以模拟真实骑行的惯性感觉。座椅和把手均可多方向调节，适应不同身高的用户。液晶显示屏可以实时显示骑行时间、距离、速度、心率等数据，帮助您掌握训练情况。无级阻力调节系统可以模拟不同坡度的骑行环境，满足从初学者到专业骑行爱好者的各种训练需求。','{\"尺寸\": \"120 x 50 x 120 cm\", \"调节\": \"座椅高度、前后位置，把手高度、前后位置\", \"重量\": \"45 公斤\", \"显示功能\": \"时间，距离，速度，心率，卡路里\", \"最大承重\": \"150 公斤\", \"飞轮重量\": \"20 公斤\"}','[\"重型飞轮，提供真实骑行体验\", \"多方向调节座椅和把手，适应不同身高\", \"无级阻力调节，模拟不同骑行环境\", \"液晶显示屏，实时监控训练数据\", \"静音设计，不打扰他人\", \"运输轮，方便移动\"]','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351890_1.jpeg','[\"https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351890_1.jpeg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592087_7.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592087_8.jpg\"]',1),(3,1,'划船机','专业划船机，提供全身性的心肺训练','2025-05-11 00:19:48','2025-06-11 02:39:30',0,'专业划船机，提供全身性的心肺训练','划船机是一种提供全身性锻炼的有氧器材，可以同时锻炼上肢、下肢和核心肌群。采用磁阻力系统，提供平稳的阻力，训练过程安静无噪音。液晶显示屏可以实时显示划行距离、时间、速度和消耗的卡路里，帮助您掌握训练情况。人体工学座椅设计，确保长时间训练的舒适性。可折叠设计，便于存储，节省空间。适合各种健身水平的用户，是家庭健身的理想选择。','{\"尺寸\": \"240 x 60 x 80 cm\", \"重量\": \"35 公斤\", \"折叠尺寸\": \"120 x 60 x 150 cm\", \"显示功能\": \"时间，距离，速度，卡路里，心率\", \"最大承重\": \"150 公斤\", \"阻力系统\": \"磁阻力，10级调节\"}','[\"全身性锻炼，高效燃烧卡路里\", \"磁阻力系统，平稳安静\", \"多功能显示屏，监控训练数据\", \"人体工学设计，舒适操作\", \"可折叠存储，节省空间\", \"适合各种健身水平的用户\"]','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351892_2.jpg','[\"https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351892_2.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592095_15.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592096_16.jpg\"]',0),(4,2,'力量训练框架 Elite','全功能力量训练框架，适合多种力量训练','2025-05-11 00:19:48','2025-06-11 02:39:30',0,'全功能力量训练框架，适合多种力量训练','力量训练框架 Elite是一款多功能的力量训练设备，适合健身房和家庭使用。它采用高强度钢材制造，坚固耐用，可以承受高强度的训练。框架设计包括多个杠铃挂钩位置，可以调整高度以适应不同的训练需求。内置的引体向上杠和平行杠可以进行多种上肢训练。附带的安全杠可以保证您在无人协助的情况下安全地进行训练。','{\"尺寸\": \"140 x 120 x 220 cm\", \"材质\": \"高强度钢材\", \"颜色\": \"黑色/红色\", \"最大承重\": \"500 公斤\", \"杠铃挂钩位置\": \"12个可调位置\"}','[\"高强度钢材制造，坚固耐用\", \"多位置杠铃挂钩，适应不同训练需求\", \"内置引体向上杠和平行杠\", \"安全保护杠，确保训练安全\", \"可拆卸设计，方便安装和移动\"]','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578612514_0.7275459995170444.jpg','[\"https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578612514_0.7275459995170444.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592084_4.jpg\"]',1),(5,2,'史密斯机','多功能史密斯机，提供安全可靠的力量训练','2025-05-11 00:19:49','2025-06-11 02:39:30',0,'多功能史密斯机，提供安全可靠的力量训练','史密斯机是一种多功能的力量训练设备，提供安全可靠的训练环境。导轨系统确保杠铃只能垂直移动，减少训练中的风险。多个安全挂钩位置可以在任何时刻锁定杠铃，保障训练安全。可调节的起始位置适应不同身高的用户和不同的训练动作。标准奥林匹克杠铃尺寸，兼容大多数重量片。附带引体向上杠和深蹲架，可以进行多种训练动作。','{\"尺寸\": \"200 x 140 x 210 cm\", \"材质\": \"优质钢材\", \"安全挂钩\": \"16个位置\", \"最大承重\": \"300 公斤\", \"杠铃重量\": \"20 公斤\", \"杠铃长度\": \"220 cm\"}','[\"导轨系统，确保杠铃垂直移动\", \"多位置安全挂钩，保障训练安全\", \"可调节起始位置，适应不同训练需求\", \"标准奥林匹克杠铃尺寸\", \"附带引体向上杠和深蹲架\"]','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351893_3.jpg','[\"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592092_12.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592093_13.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578612514_0.7275459995170444.jpg\"]',0),(6,3,'可调节哑铃套装','一套哑铃满足多种重量需求，节省空间','2025-05-11 00:20:30','2025-06-11 02:39:30',0,'一套哑铃满足多种重量需求，节省空间','可调节哑铃套装是一种革命性的训练器材，它可以替代传统的多套哑铃，大大节省空间。通过简单的调节机制，您可以在2.5公斤到25公斤之间快速切换重量，满足不同训练需求。哑铃采用优质金属和耐用的塑料材质，确保长久使用不会损坏。人体工学手柄设计，握感舒适，防滑处理确保训练安全。这套哑铃非常适合家庭健身房使用，不仅节省空间，还能满足从初学者到专业健身爱好者的各种训练需求。','{\"尺寸\": \"40 x 20 x 20 cm (每只)\", \"材质\": \"铸铁配橡胶涂层\", \"手柄材质\": \"铬合金钢\", \"手柄直径\": \"28 mm\", \"重量范围\": \"2.5 - 25 公斤/只\", \"重量调节增量\": \"2.5 公斤\"}','[\"快速调节重量，替代多套哑铃\", \"人体工学手柄设计，握感舒适\", \"优质材质，坚固耐用\", \"节省空间，适合家庭健身房\", \"安全锁定机制，防止训练中滑落\"]','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351894_4.jpeg','[\"https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351894_4.jpeg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592085_5.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592086_6.jpg\"]',1),(7,3,'壶铃套装','专业级壶铃套装，适合功能性训练','2025-05-11 00:20:30','2025-06-11 02:39:30',0,'专业级壶铃套装，适合功能性训练','壶铃套装包含多种重量等级的壶铃，从4公斤到24公斤不等，适合不同训练需求。壶铃采用优质铸铁制造，表面覆盖防滑材质，确保训练安全。人体工学手柄设计，握感舒适，适合各种训练动作。壶铃锻炼是一种高效的全身性训练方式，可以同时增强力量、耐力和灵活性。这套壶铃非常适合功能性训练、HIIT训练和力量训练，是家庭和商业健身房的理想选择。','{\"材质\": \"铸铁配防滑涂层\", \"颜色\": \"根据重量不同有色彩编码\", \"套装内容\": \"6个不同重量的壶铃\", \"手柄直径\": \"33 mm\", \"重量等级\": \"4公斤，8公斤，12公斤，16公斤，20公斤，24公斤\"}','[\"多种重量等级，满足不同训练需求\", \"优质铸铁制造，坚固耐用\", \"防滑表面处理，确保训练安全\", \"人体工学手柄设计，握感舒适\", \"适合全身性功能训练\"]','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351894_5.jpg','[\"https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576351894_5.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592098_18.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592099_19.jpg\"]',0),(8,4,'阻力带套装','多种阻力等级的弹力带，适合各种训练需求','2025-05-11 00:20:30','2025-06-11 02:39:30',0,'多种阻力等级的弹力带，适合各种训练需求','阻力带套装包含5条不同阻力等级的弹力带，从轻度到重度不等，适合不同训练强度的需求。这些阻力带采用天然乳胶制成，具有优异的弹性和耐用性。每条阻力带均采用色彩编码，方便识别不同的阻力等级。阻力带可用于全身多种肌群的训练，非常适合家庭健身、旅行锻炼和康复训练。配有便携收纳袋和训练指南，让您随时随地进行有效的训练。','{\"材质\": \"天然乳胶\", \"长度\": \"每条150厘米\", \"颜色\": \"黄(轻)，红(中轻)，蓝(中)，绿(中重)，黑(重)\", \"套装内容\": \"5条不同阻力等级的弹力带\", \"阻力等级\": \"轻(5-10磅)，中轻(10-15磅)，中(15-20磅)，中重(20-25磅)，重(25-30磅)\"}','[\"多种阻力等级，满足不同训练需求\", \"天然乳胶材质，弹性好，耐用\", \"色彩编码，易于识别\", \"便携设计，随时随地锻炼\", \"附带训练指南和收纳袋\"]','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578616536_0.4350896320824762.jpg','[\"https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578616536_0.4350896320824762.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592090_10.jpg\", \"https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592091_11.jpg\"]',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='器械分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_category`
--

LOCK TABLES `equipment_category` WRITE;
/*!40000 ALTER TABLE `equipment_category` DISABLE KEYS */;
INSERT INTO `equipment_category` VALUES (1,'有氧器械','提升心肺功能，增强耐力','<Bike className=\"w-10 h-10 text-gym-accent\" />','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576303378_0.jpeg','2025-05-14 04:26:02','2025-06-11 01:25:51',0),(2,'力量器械','增强肌肉力量，塑造身体线条','<Dumbbell className=\"w-10 h-10 text-gym-accent\" />','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576303380_1.jpg','2025-05-29 22:22:45','2025-06-11 01:25:51',0),(3,'功能性训练器械','提高身体协调性和灵活性','<Dumbbell className=\"w-10 h-10 text-gym-accent\" />','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576303381_2.jpg','2025-05-29 22:22:45','2025-06-11 01:25:51',0),(4,'健身配件','辅助训练，提高健身效果','<Bike className=\"w-10 h-10 text-gym-accent\" />','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749577087148_3.jpg','2025-05-29 22:22:45','2025-06-11 01:38:24',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,'高效乳清蛋白粉（巧克力味）','桶',250.00,299.00,112,'每份含25g优质乳清蛋白，促进肌肉增长与修复，低脂低糖，口感顺滑易溶解。','2025-04-14 00:40:48','2025-06-11 01:27:44',0,1,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398684_0.png','[\"25g 乳清蛋白/份\", \"添加BCAA 支链氨基酸\", \"低脂低糖配方\", \"易溶解不结块\"]','{\"产地\": \"美国\", \"口味\": \"巧克力\", \"保质期\": \"24个月\", \"净含量\": \"908g/桶\"}'),(2,'BCAA 支链氨基酸粉（西瓜味）','罐',200.00,229.00,87,'2:1:1黄金比例BCAA，缓解运动疲劳，加速肌肉恢复，0糖0脂，清爽西瓜味。','2025-04-14 00:47:25','2025-06-11 01:27:44',0,1,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398686_1.jpg','[\"2:1:1 黄金比例\", \"0糖0脂\", \"添加电解质配方\", \"快速溶解\"]','{\"口味\": \"西瓜\", \"净含量\": \"400g/罐\", \"每份含量\": \"7g BCAA\", \"适用人群\": \"力量与耐力训练者\"}'),(3,'能量蛋白棒（巧克力焦糖）','根',20.00,25.00,300,'即食高蛋白能量棒，每根含20g蛋白质，外出携带方便，随时补充能量。','2025-04-14 00:50:27','2025-06-11 01:27:44',0,1,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398687_2.jpg','[\"20g 蛋白质/根\", \"高纤维低糖\", \"无麸质配方\", \"口感香浓\"]','{\"产地\": \"中国\", \"口味\": \"巧克力焦糖\", \"保存方式\": \"阴凉干燥处\", \"单根质量\": \"60g\"}'),(4,'速干运动T恤（男款）','件',120.00,149.00,200,'高性能速干面料，排汗透气，保持运动干爽，剪裁贴合展现身形。','2025-05-29 23:10:16','2025-06-11 01:39:13',0,2,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749577134903_3.jpg','[\"排汗速干面料\", \"四向弹力\", \"轻盈透气\", \"多色可选\"]','{\"尺码\": \"S-XXL\", \"洗涤\": \"30℃ 机洗\", \"面料\": \"聚酯纤维+氨纶\", \"颜色\": \"黑/灰/蓝\"}'),(5,'透气运动短裤（女款）','件',100.00,129.00,178,'轻盈速干面料配合内置安全短裤，运动更自如，适合跑步、训练及日常穿搭。','2025-05-29 23:10:16','2025-06-11 01:27:44',0,2,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398689_4.jpg','[\"两层设计防走光\", \"速干透气\", \"高腰收腹\", \"弹力舒适\"]','{\"尺码\": \"XS-L\", \"洗涤\": \"手洗或轻柔机洗\", \"面料\": \"锦纶+氨纶\", \"颜色\": \"黑/粉/军绿\"}'),(6,'高腰瑜伽紧身裤','条',160.00,199.00,150,'无缝针织技术，高弹贴合，塑形显瘦，适合瑜伽、普拉提与力量训练。','2025-05-30 00:02:57','2025-06-11 01:27:44',0,2,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398689_5.jpg','[\"无缝一体织\", \"高腰设计\", \"四向弹力\", \"不透光材质\"]','{\"尺码\": \"S-XL\", \"洗涤\": \"与同色衣物冷水洗\", \"面料\": \"锦纶+氨纶\", \"颜色\": \"深灰/紫/湖蓝\"}'),(7,'专业泡沫轴','个',80.00,99.00,110,'EVA 高密度泡沫轴，帮助筋膜放松，缓解肌肉紧张，提升运动表现。','2025-05-30 00:02:57','2025-06-11 01:27:44',0,3,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398690_6.jpg','[\"高密度 EVA\", \"耐压不易变形\", \"防滑纹理\", \"重量轻便携\"]','{\"材质\": \"EVA\", \"直径\": \"14cm\", \"长度\": \"45cm\", \"颜色\": \"黑/蓝/粉\"}'),(8,'多功能弹力带套装','套',130.00,159.00,140,'五档阻力等级，天然乳胶，满足力量训练、康复训练等多种需求，附便携收纳袋。','2025-05-30 00:02:57','2025-06-11 01:27:44',0,3,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398691_7.jpg','[\"5 档阻力\", \"天然乳胶\", \"附训练手册\", \"轻巧好收纳\"]','{\"套装\": \"5 条 + 收纳袋\", \"材质\": \"乳胶\", \"颜色\": \"多色\", \"阻力范围\": \"5-40kg\"}'),(9,'防滑健身手套','双',70.00,89.00,90,'透气网眼设计与硅胶防滑掌垫，提供抓握力并减少茧子，魔术贴方便调节松紧。','2025-05-30 00:02:57','2025-06-11 01:27:44',0,3,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398691_8.jpg','[\"硅胶防滑\", \"透气速干\", \"掌心加厚\", \"魔术贴固定\"]','{\"产地\": \"中国\", \"尺码\": \"S-XL\", \"材质\": \"合成革+网眼布\", \"颜色\": \"黑/红\"}'),(10,'专业调速钢丝跳绳','根',60.00,79.00,100,'轴承连接旋转顺畅，长度可调，适合高强度间歇训练与燃脂。','2025-05-30 00:02:57','2025-06-11 01:27:44',0,4,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398692_9.jpg','[\"钢丝绳体\", \"轴承360°旋转\", \"长度可调\", \"轻量手柄\"]','{\"材质\": \"钢丝+铝合金\", \"重量\": \"280g\", \"长度\": \"2.8-3.2m 可调\", \"颜色\": \"黑/银\"}'),(11,'环保TPE瑜伽垫','张',110.00,139.00,120,'6mm 双层结构，防滑纹理，提供优异支撑与缓冲，附便携背带。','2025-05-30 00:02:57','2025-06-11 01:27:44',0,4,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398693_10.jpg','[\"环保 TPE\", \"双层加厚\", \"防滑纹理\", \"配背带\"]','{\"厚度\": \"6mm\", \"尺寸\": \"183×61cm\", \"重量\": \"1.1kg\", \"颜色\": \"紫/蓝/黑\"}'),(12,'8KG 涂层壶铃','个',200.00,249.00,60,'铸铁材质外覆彩色乙烯基涂层，保护地面，人体工学把手舒适易握。','2025-05-30 00:02:58','2025-06-11 01:27:44',0,4,'https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576398693_11.png','[\"铸铁一体成型\", \"乙烯基涂层防锈\", \"把手舒适防滑\", \"重量精准\"]','{\"材质\": \"铸铁+乙烯基\", \"重量\": \"8kg ±3%\", \"颜色\": \"蓝\", \"手柄直径\": \"33mm\"}');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_category`
--

LOCK TABLES `goods_category` WRITE;
/*!40000 ALTER TABLE `goods_category` DISABLE KEYS */;
INSERT INTO `goods_category` VALUES (1,'营养补剂','蛋白粉、BCAA 等运动营养补给','<Package className=\"w-10 h-10 text-blue-500\" />','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576380014_0.jpg','2025-05-14 04:11:25','2025-06-11 01:26:38',0),(2,'运动服饰','速干 T 恤、运动短裤、瑜伽裤等专业服饰','<ShoppingBag className=\"w-10 h-10 text-blue-500\" />','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576380015_1.jpg','2025-05-29 22:36:53','2025-06-11 01:26:38',0),(3,'健身配件','泡沫轴、弹力带、护具手套等辅助配件','<Box className=\"w-10 h-10 text-blue-500\" />','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576380015_2.jpg','2025-05-29 22:36:53','2025-06-11 01:26:38',0),(4,'训练装备','跳绳、壶铃、瑜伽垫等小型器械','<Gift className=\"w-10 h-10 text-blue-500\" />','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749576380016_3.jpg','2025-05-29 22:36:53','2025-06-11 01:26:38',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品销售记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_transactions`
--

LOCK TABLES `goods_transactions` WRITE;
/*!40000 ALTER TABLE `goods_transactions` DISABLE KEYS */;
INSERT INTO `goods_transactions` VALUES (1,1,1909924202316566530,18,1999.00,'2025-04-14 01:48:03','2025-04-14 02:29:12',0),(2,1,1909924202316566530,4,1.00,'2025-04-14 02:28:37','2025-04-14 02:29:02',1),(3,3,1910364475484536833,1,1.00,'2025-04-14 19:21:59','2025-04-14 19:28:39',0),(4,5,1910721646705590273,1,129.00,'2025-05-30 03:50:40','2025-05-30 03:50:40',0),(5,1,1910721646705590273,1,299.00,'2025-06-01 20:52:39','2025-06-01 20:52:39',0),(6,1,1910721646705590273,1,299.00,'2025-06-01 22:01:09','2025-06-01 22:01:09',0),(7,1,1910721646705590273,1,299.00,'2025-06-01 22:01:27','2025-06-01 22:01:27',0),(8,1,1910721646705590273,1,299.00,'2025-06-01 22:07:45','2025-06-01 22:07:45',0),(9,1,1910721646705590273,1,299.00,'2025-06-01 22:10:34','2025-06-01 22:10:34',0),(10,1,1910721646705590273,1,299.00,'2025-06-01 22:13:49','2025-06-01 22:13:49',0),(11,1,1910721646705590273,1,299.00,'2025-06-01 22:14:40','2025-06-01 22:14:40',0),(12,1,1910721646705590273,1,299.00,'2025-06-01 22:16:32','2025-06-01 22:16:32',0),(13,5,1910721646705590273,1,129.00,'2025-06-10 21:29:33','2025-06-10 21:29:33',0),(14,2,1910721646705590273,1,229.00,'2025-06-10 21:29:45','2025-06-10 21:29:45',0),(15,2,1910721646705590273,1,229.00,'2025-06-10 21:29:49','2025-06-10 21:29:49',0),(16,2,1910721646705590273,1,229.00,'2025-06-11 20:27:36','2025-06-11 20:27:36',0);
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
  `member_avatar` varchar(1024) DEFAULT 'https://img.28082003.com//xl19e30fdf18962bc9.jpg' COMMENT '会员头像',
  `gender` tinyint DEFAULT '0' COMMENT '性别(0-未知,1-男,2-女)',
  `member_role` varchar(256) NOT NULL DEFAULT 'member' COMMENT '会员角色：member/admin',
  `member_password` varchar(512) NOT NULL COMMENT '密码',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_member_account` (`member_account`)
) ENGINE=InnoDB AUTO_INCREMENT=1911375760909160455 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='会员信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1909924202316566530,'Stargaze','liucf1','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',1,'admin','d9ca96def632da1163e0f6562168cd31','2025-04-09 18:59:49','2025-06-11 02:13:55',0),(1909924784758587393,'无名','liucf2','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-09 19:02:08','2025-06-11 02:13:55',1),(1910364475484536833,'Stargaze','liucf3','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-11 00:09:18','2025-06-11 02:13:55',0),(1910721646705590273,'Stargaze','ceshi1','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',1,'member','d9ca96def632da1163e0f6562168cd31','2025-04-11 23:48:34','2025-06-11 02:13:55',0),(1910723409839996930,'Stargaze','ceshi2','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-11 23:55:35','2025-06-11 02:13:55',1),(1910724238936457217,'Stargaze','ceshi3','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-11 23:58:52','2025-06-11 02:13:55',1),(1910725213885644801,'Stargaze','ceshi4','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 00:02:45','2025-06-11 02:13:55',1),(1910740245998551041,'Stargaze','liucf5','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 01:02:29','2025-06-11 02:13:55',1),(1910741447796670465,'Stargaze','ceshi5','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 01:07:15','2025-06-11 02:13:55',1),(1910750426916536322,'Stargaze','ceshi6','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 01:42:56','2025-06-11 02:13:55',1),(1910779817625206786,'Stargaze','liucf6','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-12 03:39:43','2025-06-11 02:13:55',1),(1911368204853727233,'Test','Test','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',1,'admin','d9ca96def632da1163e0f6562168cd31','2025-04-13 18:37:46','2025-06-11 02:13:55',1),(1911368499855904769,'Test2','Test2','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',1,'admin','d9ca96def632da1163e0f6562168cd31','2025-04-13 18:38:56','2025-06-11 02:13:55',0),(1911374676723519490,'Test3','Test3','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',1,'member','d9ca96def632da1163e0f6562168cd31','2025-04-13 19:03:29','2025-06-11 02:13:55',1),(1911374765416271874,'Test4','Test4','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-04-13 19:03:50','2025-06-11 02:13:55',0),(1911375760909160450,'Test5','Test5','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',1,'member','d9ca96def632da1163e0f6562168cd31','2025-04-13 19:07:47','2025-06-11 02:13:55',0),(1911375760909160451,'Stargaze','bishe1','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-05-15 16:35:50','2025-06-11 02:13:55',1),(1911375760909160452,'Stargaze','bisheceshi1','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',0,'member','d9ca96def632da1163e0f6562168cd31','2025-05-15 18:12:38','2025-06-11 02:13:55',0),(1911375760909160453,'bisheceshi2','bisheceshi2','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',1,'member','d9ca96def632da1163e0f6562168cd31','2025-05-15 18:15:41','2025-06-11 02:13:55',0),(1911375760909160454,'ceshi10','ceshi10','https://cdn.jsdelivr.net/gh/xljya/image/post/dbimg_1749578609478_0.5446452552741132.jpg',1,'member','d9ca96def632da1163e0f6562168cd31','2025-06-10 21:34:40','2025-06-11 02:13:55',0);
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

-- Dump completed on 2025-06-17  3:54:00
