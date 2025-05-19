package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 课程视图（脱敏）
 */
@Data
public class CourseVO implements Serializable {

    /**
     * 课程ID
     */
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
     * 创建时间
     */
    private Date createTime;

    /**
     * 课程分类名称
     */
    private String categoryName;

    /**
     * 课程描述
     */
    private String description;

    /**
     * 课程图片URL
     */
    private String imageUrl;

    /**
     * 难度等级
     */
    private String difficultyLevel;

    /**
     * 教练名称
     */
    private String coachName;

    /**
     * 课程安排
     */
    private List<ScheduleVO> schedule;

    private static final long serialVersionUID = 1L;
} 