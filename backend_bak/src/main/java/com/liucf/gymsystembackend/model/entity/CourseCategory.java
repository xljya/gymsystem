package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 课程类别表
 * @TableName course_category
 */
@TableName(value ="course_category")
@Data
public class CourseCategory {
    /**
     * 类别ID
     */
    @TableId(type = IdType.AUTO)
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

    /**
     * 是否删除(0-未删除,1-已删除)
     */
    private Integer isDelete;
}