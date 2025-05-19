package com.liucf.gymsystembackend.model.dto.goodstransactions;

import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 商品销售记录查询请求
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class GoodsTransactionsQueryRequest extends PageRequest implements Serializable {

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
     * 会员ID
     */
    private Long memberId;

    /**
     * 购买数量范围-最小值
     */
    private Integer countMin;

    /**
     * 购买数量范围-最大值
     */
    private Integer countMax;

    /**
     * 成交单价范围-最小值
     */
    private BigDecimal priceMin;

    /**
     * 成交单价范围-最大值
     */
    private BigDecimal priceMax;

    /**
     * 创建时间范围-开始
     */
    private Date createTimeStart;

    /**
     * 创建时间范围-结束
     */
    private Date createTimeEnd;

    /**
     * 会员姓名
     */
    private String memberName;
} 