package com.liucf.gymsystembackend.model.dto.course;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 课程添加请求
 */
@Data
public class CourseAddRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 课程名称
     */
    private String courseName;

    /**
     * 教练ID
     */
    private Long coachId;

    /**
     * 课程单价
     */
    private BigDecimal sellingPrice;

    /**
     * 课程时长（分钟）
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