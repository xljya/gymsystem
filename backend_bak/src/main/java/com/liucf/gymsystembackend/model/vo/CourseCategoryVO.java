package com.liucf.gymsystembackend.model.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 课程类别视图对象
 * VO(Value Object)类主要用于展示层，用于封装前端需要的数据
 * 通常包含脱敏后的数据，或者对原始数据进行转换后的结果
 */
@Data
public class CourseCategoryVO implements Serializable {


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

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;
    private static final long serialVersionUID = 1L;
}