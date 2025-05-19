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


ALTER TABLE goods
    ADD COLUMN gdcategory_id  INT COMMENT '商品类别ID',
    ADD COLUMN good_avatar    VARCHAR(255) COMMENT '商品主图URL',
    ADD COLUMN features       json COMMENT '商品特点（"25g 乳清蛋白/份","添加BCAA 支链氨基酸"）',
    ADD COLUMN specifications json COMMENT '规格参数（JSON格式，如{"颜色":"红色","重量":"500g"}）',
    ADD INDEX idx_category (gdcategory_id);


CREATE TABLE goods_category
(
    gdcategory_id        bigint AUTO_INCREMENT COMMENT '分类ID' PRIMARY KEY,
    category_name        varchar(255)                       NOT NULL COMMENT '分类名称',
    category_description varchar(1024) COMMENT '分类描述',
    category_icon        varchar(255) COMMENT '分类图标URL',
    category_image       varchar(255) COMMENT '分类图片URL',
    create_time          datetime DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time          datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete            tinyint  DEFAULT 0                 NOT NULL COMMENT '是否删除（0-未删除，1-已删除）'
) COMMENT '商品分类表';

ALTER TABLE goods
    ADD CONSTRAINT fk_goods_category
        FOREIGN KEY (gdcategory_id)
            REFERENCES goods_category (gdcategory_id)
            ON DELETE SET NULL
            ON UPDATE CASCADE;


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


CREATE TABLE equipment_category
(
    eqcategory_id        bigint AUTO_INCREMENT COMMENT '分类ID' PRIMARY KEY,
    category_name        varchar(255)                       NOT NULL COMMENT '分类名称',
    category_description text COMMENT '分类描述',
    category_icon        varchar(255) COMMENT '分类图标URL',
    category_image       varchar(255) COMMENT '分类图片URL',
    create_time          datetime DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '创建时间',
    update_time          datetime DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_delete            tinyint  DEFAULT 0                 NOT NULL COMMENT '是否删除（0-未删除，1-已删除）'
) COMMENT '器械分类表';


-- 1. 添加分类ID字段
ALTER TABLE equipment
    ADD COLUMN eqcategory_id BIGINT NOT NULL COMMENT '器械分类ID';

-- 2. 添加其他字段
ALTER TABLE equipment
    ADD COLUMN short_description VARCHAR(1024) COMMENT '简短描述',
    ADD COLUMN description       TEXT COMMENT '详细描述',
    ADD COLUMN specifications    JSON COMMENT '器械规格(JSON对象格式，如{"材质":"聚酯纤维"})',
    ADD COLUMN features          JSON COMMENT '器械特征(JSON数组格式，如["防水","耐磨"])',
    ADD COLUMN image             VARCHAR(255) COMMENT '主图URL',
    ADD COLUMN images            JSON COMMENT '轮播图URL数组（JSON格式）',
    ADD COLUMN featured          TINYINT DEFAULT 0 COMMENT '是否首页推荐（0-否，1-是）';

-- 3. 添加外键约束（注意先确保 equipment_category 表存在且 eqcategory_id 类型为 BIGINT）
ALTER TABLE equipment
    ADD CONSTRAINT fk_equipment_category
        FOREIGN KEY (eqcategory_id)
            REFERENCES equipment_category (eqcategory_id)
            on delete set null
            ON UPDATE CASCADE;



ALTER TABLE equipment
    ADD CONSTRAINT equipment_equipment_category_eqcategory_id_fk
        FOREIGN KEY (eqcategory_id) REFERENCES equipment_category (eqcategory_id)
            ON DELETE RESTRICT ON UPDATE CASCADE;


-- 为equipment表添加外键约束，关联equipment_category表
ALTER TABLE equipment
    -- 添加名为fk_equipment_category的约束（命名规范：fk_子表_父表）
    ADD CONSTRAINT fk_equipment_category
        -- 指定本表(eipment)中的外键字段
        FOREIGN KEY (eqcategory_id)
            -- 引用目标表(equipment_category)的主键字段
            REFERENCES equipment_category (eqcategory_id)
            -- 删除约束：当父表(equipment_category)中的记录被子表(equipment)引用时
            -- 尝试删除父表记录将被拒绝（RESTRICT）
            -- 这样可以防止"孤儿记录"出现，保证数据完整性
            ON DELETE RESTRICT
            -- 更新约束：当父表(equipment_category)的主键值更新时
            -- 自动级联更新子表(equipment)中的对应外键值（CASCADE）
            -- 这可以保持关联关系的一致性
            ON UPDATE CASCADE;
-- 检查 equipment_category 表结构
SHOW CREATE TABLE equipment_category;

-- 检查 equipment 表结构
SHOW CREATE TABLE equipment;

ALTER TABLE equipment
    ADD COLUMN eqcategory_id bigint NOT NULL COMMENT '器械分类ID' AFTER eq_id;


/**
  数据一致性：确保添加约束前，equipment表中所有eqcategory_id值在equipment_category表中都存在

性能影响：外键约束会带来一定的性能开销，但对数据完整性至关重要

错误处理：如果执行失败，通常是因为：

存在无效的eqcategory_id值（需先修复数据）

表引擎不是InnoDB（需转换为InnoDB引擎）

权限不足（需确保有ALTER TABLE权限）
 */