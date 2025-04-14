package com.liucf.gymsystembackend.model.dto.goodstransactions;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 商品销售记录更新请求
 */
@Data
public class GoodsTransactionsUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 记录ID
     */
    private Long id;

    /**
     * 商品ID(关联 goods 表)
     */
    private Long goodsId;

    /**
     * 会员ID(关联 members 表)
     */
    private Long memberId;

    /**
     * 购买数量
     */
    private Integer count;

    /**
     * 成交单价
     */
    private BigDecimal price;
} 