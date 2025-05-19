package com.liucf.gymsystembackend.model.dto.course;

import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 课程查询请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CourseQueryRequest extends PageRequest implements Serializable {

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
     * 课程类别ID
     */
    private Long categoryId;

    /**
     * 难度等级
     */
    private String difficultyLevel;

    /**
     * 当前页码
     */
    private int current = 1;

    /**
     * 页面大小
     */
    private int pageSize = 10;

    /**
     * 排序字段
     */
    private String sortField;

    /**
     * 排序顺序（默认升序）
     */
    private String sortOrder = "ascend";

    /**
     * 课程时长（分钟）默认两小时
     */
    private Integer duration;

} 