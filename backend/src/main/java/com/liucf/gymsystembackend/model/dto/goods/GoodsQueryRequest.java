package com.liucf.gymsystembackend.model.dto.goods;

import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 商品查询请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class GoodsQueryRequest extends PageRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 商品ID
     */
    private Integer goodsId;

    /**
     * 商品名称 (用于模糊查询)
     */
    private String goodsName;

    /**
     * 商品类别ID (用于精确查询)
     */
    private Integer gdcategoryId;

    /**
     * 计量单位
     */
    private String unit;

    /**
     * 是否删除(0-未删除,1-已删除)
     */
    private Integer isDelete;
} 