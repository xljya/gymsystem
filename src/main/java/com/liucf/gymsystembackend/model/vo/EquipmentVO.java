package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
// import java.util.List; // If 'images' is to be parsed into a List<String>

/**
 * 器械视图对象
 */
@Data
public class EquipmentVO implements Serializable {

    /**
     * 器材ID
     */
    private Long eqId;

    /**
     * 器材分类ID
     */
    private Long eqcategoryId;

    /**
     * 分类名称
     */
    private String categoryName;

    /**
     * 器材名称
     */
    private String eqName;

    /**
     * 简短描述
     */
    private String shortDescription;

    /**
     * 描述
     */
    private String description;

    /**
     * 规格
     */
    private String specifications;

    /**
     * 特点
     */
    private String features;

    /**
     * 主图
     */
    private String image;

    /**
     * 轮播图
     */
    private String images;

    /**
     * 是否推荐
     */
    private Integer featured;

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