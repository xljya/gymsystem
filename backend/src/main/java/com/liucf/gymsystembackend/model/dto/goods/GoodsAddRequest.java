package com.liucf.gymsystembackend.model.dto.goods;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 商品添加请求
 */
@Data
public class GoodsAddRequest implements Serializable {

    private static final long serialVersionUID = 1L;

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
     * 商品类别ID
     */
    private Integer gdcategoryId;

    /**
     * 商品主图URL
     */
    private String goodAvatar;

    /**
     * 商品特点（JSON数组格式字符串，如："[\"25g 乳清蛋白/份\",\"添加BCAA 支链氨基酸\"]"）
     */
    private String features;

    /**
     * 规格参数（JSON对象格式字符串，如："{\"颜色\":\"红色\",\"重量\":\"500g\"}"）
     */
    private String specifications;
} 