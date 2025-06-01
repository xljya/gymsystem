package com.liucf.gymsystembackend.model.dto.equipment;

import lombok.Data;
import java.io.Serializable;

/**
 * 器械分类更新请求
 */
@Data
public class EquipmentCategoryUpdateRequest implements Serializable {

    /**
     * 器械分类ID
     */
    private Long eqcategoryId;

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