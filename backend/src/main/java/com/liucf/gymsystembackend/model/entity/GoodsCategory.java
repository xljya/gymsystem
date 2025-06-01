package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 商品分类表
 * @TableName goods_category
 */
@TableName(value ="goods_category")
@Data
public class GoodsCategory {
    /**
     * 分类ID
     */
    @TableId(type = IdType.AUTO)
    private Integer gdcategoryId;

    /**
     * 分类名称
     */
    private String categoryName;

    /**
     * 分类描述
     */
    private String categoryDescription;

    /**
     * 分类图标URL
     */
    private String categoryIcon;

    /**
     * 分类图片URL
     */
    private String categoryImage;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除（0-未删除，1-已删除）
     */
    private Integer isDelete;
}