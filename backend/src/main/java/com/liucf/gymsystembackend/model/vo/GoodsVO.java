package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 商品视图对象
 */
@Data
public class GoodsVO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 商品ID
     */
    private Integer goodsId;

    /**
     * 商品名称
     */
    private String goodsName;

    /**
     * 计量单位(瓶/个/根等)
     */
    private String unit;

    /**
     * 进货单价
     */
    private BigDecimal unitPrice;

    /**
     * 销售单价
     */
    private BigDecimal sellPrice;

    /**
     * 当前库存
     */
    private Integer inventory;

    /**
     * 商品备注
     */
    private String remark;

    /**
     * 商品分类ID
     */
    private Integer gdcategoryId;

    /**
     * 商品头像
     */
    private String goodAvatar;

    /**
     * 商品特性
     */
    private String features;

    /**
     * 商品规格
     */
    private String specifications;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 分类名称
     */
    private String categoryName;
} 