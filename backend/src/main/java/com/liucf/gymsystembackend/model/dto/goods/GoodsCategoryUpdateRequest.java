package com.liucf.gymsystembackend.model.dto.goods;

import lombok.Data;
import java.io.Serializable;

/**
 * 商品分类更新请求
 */
@Data
public class GoodsCategoryUpdateRequest implements Serializable {

    /**
     * 分类ID
     */
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

    private static final long serialVersionUID = 1L;
} 