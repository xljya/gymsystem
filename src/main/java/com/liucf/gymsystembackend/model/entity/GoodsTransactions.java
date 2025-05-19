package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 商品销售记录表
 * @TableName goods_transactions
 */
@TableName(value ="goods_transactions")
@Data
public class GoodsTransactions {
    /**
     * 记录ID
     */
    @TableId(type = IdType.AUTO)
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

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除(0-未删除,1-已删除)
     */
    private Integer isDelete;
}