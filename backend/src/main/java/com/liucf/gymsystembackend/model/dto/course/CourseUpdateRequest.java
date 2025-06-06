package com.liucf.gymsystembackend.model.dto.course;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 课程更新请求
 */
@Data
public class CourseUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

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
} 