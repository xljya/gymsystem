CREATE DATABASE IF NOT EXISTS gymsystem;
USE gymsystem;

-- 删除
DROP TABLE IF EXISTS goods_transactions;
DROP TABLE IF EXISTS goods;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS coach;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS course_purchase;

CREATE TABLE IF NOT EXISTS members
(
    id              BIGINT AUTO_INCREMENT COMMENT '会员ID' PRIMARY KEY,
    member_name     VARCHAR(256)                            NULL COMMENT '会员昵称',
    member_account  VARCHAR(256)                            NOT NULL COMMENT '会员账号',
    member_avatar   VARCHAR(1024) DEFAULT 'https://img.liuyueyue.top//xl19e30fdf18962bc9.jpg' COMMENT '会员头像',
    gender          TINYINT       DEFAULT 0                 NULL COMMENT '性别(0-未知,1-男,2-女)',
    member_role     VARCHAR(256)  DEFAULT 'member'          NOT NULL COMMENT '会员角色：member/admin',
    member_password VARCHAR(512)                            NOT NULL COMMENT '密码',
    create_time     DATETIME      DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time     DATETIME      DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete       TINYINT       DEFAULT 0                 NOT NULL COMMENT '是否删除(0-未删除,1-已删除)',
    CONSTRAINT uni_member_account UNIQUE (member_account)
) COMMENT '会员信息表';

CREATE TABLE IF NOT EXISTS coach
(
    coach_id      BIGINT AUTO_INCREMENT COMMENT '教练ID' PRIMARY KEY,
    coach_name    VARCHAR(256)                            NULL COMMENT '教练姓名',
    coach_account VARCHAR(256)                            NOT NULL COMMENT '教练账号',
    coach_avatar  VARCHAR(1024) DEFAULT 'https://img.liuyueyue.top//xl19e30fdf18962bc9.jpg' COMMENT '教练头像',
    gender        TINYINT       DEFAULT 0                 NULL COMMENT '性别(0-未知,1-男,2-女)',
    coach_age     INT           DEFAULT NULL COMMENT '教练年龄',
    entry_date    DATE                                    NULL COMMENT '入职日期',
    course_type   VARCHAR(256)                            NULL COMMENT '教授课程类型',
    coach_salary  VARCHAR(64)                             NULL COMMENT '薪资（如：8000）',
    coach_address VARCHAR(512)                            NULL COMMENT '住址',
    coach_status  TINYINT       DEFAULT 0                 NOT NULL COMMENT '状态(0-在职,1-休假,2-离职)',
    create_time   DATETIME      DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time   DATETIME      DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete     TINYINT       DEFAULT 0                 NOT NULL COMMENT '是否删除(0-未删除,1-已删除)'
) COMMENT '教练信息表';

CREATE TABLE IF NOT EXISTS equipment
(
    eq_id       BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '器材ID',
    eq_name     VARCHAR(20) DEFAULT NULL COMMENT '器材名称',
    eq_text     VARCHAR(50) DEFAULT NULL COMMENT '器材描述/规格',
    create_time DATETIME    DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time DATETIME    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete   TINYINT     DEFAULT 0                 NOT NULL COMMENT '是否删除(0-未删除,1-已删除)'
) COMMENT '健身房器材设备表';

CREATE TABLE IF NOT EXISTS goods
(
    goods_id    INT AUTO_INCREMENT PRIMARY KEY COMMENT '商品ID',
    goods_name  VARCHAR(50)                              NOT NULL COMMENT '商品名称',
    unit        VARCHAR(20)    DEFAULT '个' COMMENT '计量单位(瓶/个/根等)',
    unit_price  DECIMAL(10, 2) DEFAULT 0.00 COMMENT '进货单价',
    sell_price  DECIMAL(10, 2) DEFAULT 0.00 COMMENT '销售单价',
    inventory   INT            DEFAULT 0 COMMENT '当前库存',
    remark      VARCHAR(255)   DEFAULT NULL COMMENT '商品备注',
    create_time DATETIME       DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time DATETIME       DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete   TINYINT        DEFAULT 0                 NOT NULL COMMENT '是否删除(0-未删除,1-已删除)'
) COMMENT '商品信息表';

CREATE TABLE IF NOT EXISTS goods_transactions
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    goods_id    BIGINT         NOT NULL COMMENT '商品ID(关联 goods 表)',
    member_id   BIGINT         NOT NULL COMMENT '会员ID(关联 members 表)',
    count       INT            NOT NULL DEFAULT 1 COMMENT '购买数量',
    price       DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '成交单价',
    create_time DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete   TINYINT        NOT NULL DEFAULT 0 COMMENT '是否删除(0-未删除,1-已删除)'
) COMMENT '商品销售记录表';

CREATE TABLE IF NOT EXISTS course
(
    course_id     BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '课程ID',
    course_name   VARCHAR(50)                              NOT NULL COMMENT '课程名称',
    coach_id      BIGINT                                   NOT NULL COMMENT '教练ID（关联 coach 表）',
    selling_price DECIMAL(10, 2) DEFAULT 0.00              NOT NULL COMMENT '课程单价',
    duration      INT            DEFAULT 120               NOT NULL COMMENT '课程时长（分钟）默认两小时',
    create_time   DATETIME       DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time   DATETIME       DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete     TINYINT        DEFAULT 0                 NOT NULL COMMENT '是否删除(0-未删除,1-已删除)'
) COMMENT '课程信息表';


CREATE TABLE IF NOT EXISTS course_purchase
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    member_id   BIGINT         NOT NULL COMMENT '会员ID（关联 members 表）',
    coach_id    BIGINT         NOT NULL COMMENT '教练ID（关联 coach 表）',
    course_id   BIGINT         NOT NULL COMMENT '课程ID（关联 course 表）',
    class_count INT            NOT NULL DEFAULT 0 COMMENT '购买课时数',
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '课程总价',
    status      TINYINT        NOT NULL DEFAULT 1 COMMENT '状态（1-有效，0-无效）',
    create_time DATETIME                DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time DATETIME                DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete   TINYINT                 DEFAULT 0 NOT NULL COMMENT '是否删除（0-未删除，1-已删除）',

    -- 外键索引
    INDEX idx_course_id (course_id),
    INDEX idx_coach_id (coach_id),
    INDEX idx_member_id (member_id),

    CONSTRAINT fk_purchase_course FOREIGN KEY (course_id) REFERENCES course (course_id),
    CONSTRAINT fk_purchase_coach FOREIGN KEY (coach_id) REFERENCES coach (coach_id),
    CONSTRAINT fk_purchase_member FOREIGN KEY (member_id) REFERENCES members (id)
) COMMENT '课程购买记录表';

