package com.liucf.gymsystembackend.model.dto.course;

import lombok.Data;

import java.io.Serializable;

/**
 * 课程类别添加请求
 */
@Data
public class CourseCategoryAddRequest implements Serializable {

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