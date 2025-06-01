package com.liucf.gymsystembackend.model.vo;

import lombok.Data;
import java.io.Serializable;
import java.util.Date;

/**
 * 商品分类视图对象
 */
@Data
public class GoodsCategoryVO implements Serializable {
    private Integer gdcategoryId;
    private String categoryName;
    private String categoryDescription;
    private String categoryIcon;
    private String categoryImage;
    private Date createTime;
    private Date updateTime;
    private static final long serialVersionUID = 1L;
} 