create database if not exists gymsystem;
use gymsystem;

create table if not exists gymsystem.coach
(
    coach_id      bigint auto_increment comment '教练ID'
        primary key,
    coach_name    varchar(256)                                                                                null comment '教练姓名',
    coach_account varchar(256)                                                                                not null comment '教练账号',
    coach_avatar  varchar(1024) default 'https://cdn.jsdelivr.net/gh/xljya/image/post/xl19e30fdf18962bc9.jpg' null comment '教练头像',
    gender        tinyint       default 0                                                                     null comment '性别(0-未知,1-男,2-女)',
    coach_age     int                                                                                         null comment '教练年龄',
    entry_date    date                                                                                        null comment '入职日期',
    course_type   varchar(1024)                                                                               null comment '教授课程类型',
    coach_salary  varchar(64)                                                                                 null comment '薪资（如：8000）',
    coach_address varchar(512)                                                                                null comment '住址',
    coach_status  tinyint       default 0                                                                     not null comment '状态(0-在职,1-休假,2-离职)',
    create_time   datetime      default CURRENT_TIMESTAMP                                                     not null comment '创建时间',
    update_time   datetime      default CURRENT_TIMESTAMP                                                     not null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete     tinyint       default 0                                                                     not null comment '是否删除(0-未删除,1-已删除)'
)
    comment '教练信息表';

create table if not exists gymsystem.course_category
(
    category_id   bigint auto_increment comment '类别ID'
        primary key,
    category_name varchar(50)                        not null comment '类别名称',
    category_desc varchar(255)                       null comment '类别描述',
    create_time   datetime default CURRENT_TIMESTAMP null comment '创建时间',
    update_time   datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete     tinyint  default 0                 null comment '是否删除(0-未删除,1-已删除)'
)
    comment '课程类别表';

create table if not exists gymsystem.course
(
    course_id        bigint auto_increment comment '课程ID'
        primary key,
    course_name      varchar(50)                              not null comment '课程名称',
    coach_id         bigint                                   not null comment '教练ID（关联 coach 表）',
    selling_price    decimal(10, 2) default 0.00              not null comment '课程单价',
    duration         int            default 120               not null comment '课程时长（分钟）默认两小时',
    create_time      datetime       default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time      datetime       default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete        tinyint        default 0                 not null comment '是否删除(0-未删除,1-已删除)',
    category_id      bigint                                   null comment '课程类别ID',
    difficulty_level varchar(20)    default 'beginner'        null comment '难度等级',
    description      text                                     null comment '课程描述',
    image_url        varchar(255)                             null comment '课程图片URL',
    constraint course_ibfk_1
        foreign key (category_id) references gymsystem.course_category (category_id)
)
    comment '课程信息表';

create index category_id
    on gymsystem.course (category_id);

create table if not exists gymsystem.course_schedule
(
    schedule_id          bigint auto_increment comment '排期ID'
        primary key,
    course_id            bigint                             not null comment '课程ID',
    coach_id             bigint                             not null comment '教练ID',
    start_time           datetime                           not null comment '开始时间',
    end_time             datetime                           not null comment '结束时间',
    max_participants     int      default 20                null comment '最大参与人数',
    current_participants int      default 0                 null comment '当前参与人数',
    room_number          varchar(20)                        null comment '教室编号',
    status               tinyint  default 1                 null comment '状态(0-已取消,1-可预约,2-已满)',
    create_time          datetime default CURRENT_TIMESTAMP null comment '创建时间',
    update_time          datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete            tinyint  default 0                 null comment '是否删除(0-未删除,1-已删除)',
    constraint course_schedule_ibfk_1
        foreign key (course_id) references gymsystem.course (course_id),
    constraint course_schedule_ibfk_2
        foreign key (coach_id) references gymsystem.coach (coach_id)
)
    comment '课程排期表';

create index coach_id
    on gymsystem.course_schedule (coach_id);

create index course_id
    on gymsystem.course_schedule (course_id);

create table if not exists gymsystem.equipment_category
(
    eqcategory_id        bigint auto_increment comment '器械分类ID'
        primary key,
    category_name        varchar(255)                       not null comment '分类名称',
    category_description text                               null comment '分类描述',
    category_icon        varchar(255)                       null comment '分类图标URL',
    category_image       varchar(255)                       null comment '分类图片URL',
    create_time          datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time          datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete            tinyint  default 0                 not null comment '是否删除（0-未删除，1-已删除）'
)
    comment '器械分类表';

create table if not exists gymsystem.equipment
(
    eq_id             bigint auto_increment comment '器械ID'
        primary key,
    eqcategory_id     bigint                             not null comment '器械分类ID',
    eq_name           varchar(1024)                      null comment '器械名称',
    eq_text           varchar(1024)                      null comment '器械描述/规格',
    create_time       datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time       datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete         tinyint  default 0                 not null comment '是否删除(0-未删除,1-已删除)',
    short_description varchar(1024)                      null comment '简短描述',
    description       text                               null comment '详细描述',
    specifications    json                               null comment '器械规格(JSON对象格式，如{"材质":"聚酯纤维"})',
    features          json                               null comment '器械特征(JSON数组格式，如["防水","耐磨"])',
    image             varchar(255)                       null comment '主图URL',
    images            json                               null comment '轮播图URL数组（JSON格式）',
    featured          tinyint  default 0                 null comment '是否首页推荐（0-否，1-是）',
    constraint fk_equipment_category
        foreign key (eqcategory_id) references gymsystem.equipment_category (eqcategory_id)
            on update cascade
)
    comment '健身房器械表';

create table if not exists gymsystem.goods_category
(
    gdcategory_id        int auto_increment comment '分类ID'
        primary key,
    category_name        varchar(255)                       not null comment '分类名称',
    category_description varchar(1024)                      null comment '分类描述',
    category_icon        varchar(255)                       null comment '分类图标URL',
    category_image       varchar(255)                       null comment '分类图片URL',
    create_time          datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time          datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete            tinyint  default 0                 not null comment '是否删除（0-未删除，1-已删除）'
)
    comment '商品分类表';

create table if not exists gymsystem.goods
(
    goods_id       int auto_increment comment '商品ID'
        primary key,
    goods_name     varchar(50)                              not null comment '商品名称',
    unit           varchar(20)    default '个'              null comment '计量单位(瓶/个/根等)',
    unit_price     decimal(10, 2) default 0.00              null comment '进货单价',
    sell_price     decimal(10, 2) default 0.00              null comment '销售单价',
    inventory      int            default 0                 null comment '当前库存',
    remark         varchar(255)                             null comment '商品备注',
    create_time    datetime       default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time    datetime       default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete      tinyint        default 0                 not null comment '是否删除(0-未删除,1-已删除)',
    gdcategory_id  int                                      null comment '商品类别ID',
    good_avatar    varchar(255)                             null comment '商品主图URL',
    features       json                                     null comment '商品特点（"25g 乳清蛋白/份","添加BCAA 支链氨基酸"）',
    specifications json                                     null comment '规格参数（JSON格式，如{"颜色":"红色","重量":"500g"}）',
    constraint fk_goods_category
        foreign key (gdcategory_id) references gymsystem.goods_category (gdcategory_id)
            on update cascade on delete set null
)
    comment '商品信息表';

create index idx_category
    on gymsystem.goods (gdcategory_id);

create table if not exists gymsystem.goods_transactions
(
    id          bigint auto_increment comment '记录ID'
        primary key,
    goods_id    bigint                                   not null comment '商品ID(关联 goods 表)',
    member_id   bigint                                   not null comment '会员ID(关联 members 表)',
    count       int            default 1                 not null comment '购买数量',
    price       decimal(10, 2) default 0.00              not null comment '成交单价',
    create_time datetime       default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time datetime       default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete   tinyint        default 0                 not null comment '是否删除(0-未删除,1-已删除)'
)
    comment '商品销售记录表';

create table if not exists gymsystem.members
(
    id              bigint auto_increment comment '会员ID'
        primary key,
    member_name     varchar(256)                                                                                null comment '会员昵称',
    member_account  varchar(256)                                                                                not null comment '会员账号',
    member_avatar   varchar(1024) default 'https://cdn.jsdelivr.net/gh/xljya/image/post/xl19e30fdf18962bc9.jpg' null comment '会员头像',
    gender          tinyint       default 0                                                                     null comment '性别(0-未知,1-男,2-女)',
    member_role     varchar(256)  default 'member'                                                              not null comment '会员角色：member/admin',
    member_password varchar(512)                                                                                not null comment '密码',
    create_time     datetime      default CURRENT_TIMESTAMP                                                     not null comment '创建时间',
    update_time     datetime      default CURRENT_TIMESTAMP                                                     not null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete       tinyint       default 0                                                                     not null comment '是否删除(0-未删除,1-已删除)',
    constraint uni_member_account
        unique (member_account)
)
    comment '会员信息表';

create table if not exists gymsystem.course_booking
(
    booking_id        bigint auto_increment comment '预约ID'
        primary key,
    schedule_id       bigint                             not null comment '排期ID',
    member_id         bigint                             not null comment '会员ID',
    booking_status    tinyint  default 1                 null comment '预约状态(0-已取消,1-已预约,2-已完成)',
    attendance_status tinyint  default 0                 null comment '出勤状态(0-未到,1-已到,2-请假,3-爽约)',
    create_time       datetime default CURRENT_TIMESTAMP null comment '创建时间',
    update_time       datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    is_delete         tinyint  default 0                 null comment '是否删除(0-未删除,1-已删除)',
    constraint course_booking_ibfk_1
        foreign key (schedule_id) references gymsystem.course_schedule (schedule_id),
    constraint course_booking_ibfk_2
        foreign key (member_id) references gymsystem.members (id)
)
    comment '课程预约表';

create index member_id
    on gymsystem.course_booking (member_id);

create index schedule_id
    on gymsystem.course_booking (schedule_id);

