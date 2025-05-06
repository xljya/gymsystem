package com.liucf.gymsystembackend.model.dto.course;

import lombok.Data;

import java.io.Serializable;

/**
 * 课程类别更新请求
 */
@Data
public class CourseCategoryUpdateRequest implements Serializable {
    /**
     * 类别ID
     */
    private Long categoryId;

    /**
     * 类别名称
     */
    private String categoryName;

    /**
     * 类别描述
     */
    private String categoryDesc;

    private static final long serialVersionUID = 1L;
} 