package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 商品视图（脱敏）
 */
@Data
public class GoodsVO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 商品ID
     */
    private Long goodsId;

    /**
     * 商品名称
     */
    private String goodsName;

    /**
     * 计量单位(瓶/个/根等)
     */
    private String unit;

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
     * 创建时间
     */
    private Date createTime;
} 