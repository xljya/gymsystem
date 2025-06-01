package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 健身房器械表
 * @TableName equipment
 */
@TableName(value ="equipment")
@Data
public class Equipment {
    /**
     * 器械ID
     */
    @TableId(type = IdType.AUTO)
    private Long eqId;

    /**
     * 器械分类ID
     */
    private Long eqcategoryId;

    /**
     * 器械名称
     */
    private String eqName;

    /**
     * 器械描述/规格
     */
    private String eqText;

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
     * 简短描述
     */
    private String shortDescription;

    /**
     * 详细描述
     */
    private String description;

    /**
     * 器械规格(JSON对象格式，如{"材质":"聚酯纤维"})
     */
    private Object specifications;

    /**
     * 器械特征(JSON数组格式，如["防水","耐磨"])
     */
    private Object features;

    /**
     * 主图URL
     */
    private String image;

    /**
     * 轮播图URL数组（JSON格式）
     */
    private Object images;

    /**
     * 是否首页推荐（0-否，1-是）
     */
    private Integer featured;
}