package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 健身房器材设备表
 * @TableName equipment
 */
@TableName(value ="equipment")
@Data
public class Equipment {
    /**
     * 器材ID
     */
    @TableId(type = IdType.AUTO)
    private Long eqId;

    /**
     * 器材名称
     */
    private String eqName;

    /**
     * 器材描述/规格
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
}