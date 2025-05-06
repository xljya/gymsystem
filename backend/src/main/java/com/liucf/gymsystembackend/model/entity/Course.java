package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 课程信息表
 * @TableName course
 */
@TableName(value ="course")
@Data
public class Course implements Serializable {
    /**
     * 课程ID
     */
    @TableId(type = IdType.AUTO)
    private Long courseId;

    /**
     * 课程名称
     */
    private String courseName;

    /**
     * 教练ID（关联 coach 表）
     */
    private Long coachId;

    /**
     * 课程单价
     */
    private BigDecimal sellingPrice;

    /**
     * 课程时长（分钟）默认两小时
     */
    private Integer duration;

    /**
     * 教练姓名（非数据库字段，用于VO）
     */
    @TableField(exist = false)
    private String coachName;

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
    // @TableLogic // 全局配置已指定，无需注解
    private Integer isDelete;

    /**
     * 课程类别ID
     */
    private Long categoryId;

    /**
     * 难度等级
     */
    private String difficultyLevel;

    /**
     * 课程描述
     */
    private String description;

    /**
     * 课程图片URL
     */
    private String imageUrl;

    private static final long serialVersionUID = 1L;
}