package com.liucf.gymsystembackend.model.vo;

import lombok.Data;
import java.io.Serializable;
import java.util.Date;

/**
 * 器械分类视图对象
 */
@Data
public class EquipmentCategoryVO implements Serializable {
    private Long eqcategoryId;
    private String categoryName;
    private String categoryDescription;
    // 根据 EquipmentCategory 实体补充其他需要的字段，例如：
    // private String categoryIcon;
    // private String categoryImage;
    private Date createTime;
    private Date updateTime;
    private static final long serialVersionUID = 1L;
} 