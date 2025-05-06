package com.liucf.gymsystembackend.model.dto.course;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 课程分类查询请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CourseCategoryQueryRequest extends PageRequest implements Serializable {


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