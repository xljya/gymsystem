package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 商品信息表
 * @TableName goods
 */
@TableName(value ="goods")
@Data
public class Goods {
    /**
     * 商品ID
     */
    @TableId(type = IdType.AUTO)
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

    /**
     * 商品类别ID
     */
    private Integer gdcategoryId;

    /**
     * 商品主图URL
     */
    private String goodAvatar;

    /**
     * 商品特点（"25g 乳清蛋白/份","添加BCAA 支链氨基酸"）
     */
    private Object features;

    /**
     * 规格参数（JSON格式，如{"颜色":"红色","重量":"500g"}）
     */
    private Object specifications;
}