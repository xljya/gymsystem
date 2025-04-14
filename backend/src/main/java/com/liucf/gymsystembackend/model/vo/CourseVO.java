package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

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

    private static final long serialVersionUID = 1L;
} 