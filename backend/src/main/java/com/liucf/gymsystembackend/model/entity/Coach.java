package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 教练信息表
 * @TableName coach
 */
@TableName(value ="coach")
@Data
public class Coach {
    /**
     * 教练ID
     */
    @TableId(type = IdType.AUTO)
    private Long coachId;

    /**
     * 教练姓名
     */
    private String coachName;

    /**
     * 教练账号
     */
    private String coachAccount;

    /**
     * 教练头像
     */
    private String coachAvatar;

    /**
     * 性别(0-未知,1-男,2-女)
     */
    private Integer gender;

    /**
     * 教练年龄
     */
    private Integer coachAge;

    /**
     * 入职日期
     */
    private Date entryDate;

    /**
     * 教授课程类型
     */
    private String courseType;

    /**
     * 薪资（如：8000）
     */
    private String coachSalary;

    /**
     * 住址
     */
    private String coachAddress;

    /**
     * 状态(0-在职,1-休假,2-离职)
     */
    private Integer coachStatus;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除(0-未删除,1-已删除)
     */
    private Integer isDelete;
}