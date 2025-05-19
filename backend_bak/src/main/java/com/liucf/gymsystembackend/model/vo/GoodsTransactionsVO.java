package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 商品销售记录视图对象
 */
@Data
public class GoodsTransactionsVO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 记录ID
     */
    private Long id;

    /**
     * 商品ID
     */
    private Long goodsId;

    /**
     * 商品名称
     */
    private String goodsName;

    /**
     * 商品单位
     */
    private String goodsUnit;

    /**
     * 会员ID
     */
    private Long memberId;

    /**
     * 会员姓名
     */
    private String memberName;

    /**
     * 购买数量
     */
    private Integer count;

    /**
     * 成交单价
     */
    private BigDecimal price;

    /**
     * 总金额
     */
    private BigDecimal totalAmount;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;
} 