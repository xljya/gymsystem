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
} 