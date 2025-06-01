package com.liucf.gymsystembackend.model.dto.equipment;

import lombok.Data;

import java.io.Serializable;

/**
 * 器材更新请求
 */
@Data
public class EquipmentUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 器械ID
     */
    private Long eqId;

    /**
     * 器械分类ID
     */
    private Long eqcategoryId;

    /**
     * 器械名称
     */
    private String eqName;

    /**
     * 器械描述/规格 (旧字段)
     */
    private String eqText;

    /**
     * 简短描述
     */
    private String shortDescription;

    /**
     * 详细描述
     */
    private String description;

    /**
     * 器械规格(JSON对象格式字符串)
     */
    private String specifications;

    /**
     * 器械特征(JSON数组格式字符串)
     */
    private String features;

    /**
     * 主图URL
     */
    private String image;

    /**
     * 轮播图URL数组（JSON格式字符串）
     */
    private String images;

    /**
     * 是否首页推荐（0-否，1-是）
     */
    private Integer featured;
} 