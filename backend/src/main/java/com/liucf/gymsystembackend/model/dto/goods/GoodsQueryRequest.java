package com.liucf.gymsystembackend.model.dto.goods;

import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 商品查询请求
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class GoodsQueryRequest extends PageRequest implements Serializable {

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
     * 计量单位
     */
    private String unit;
} 