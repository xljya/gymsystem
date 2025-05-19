package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 器材视图（脱敏）
 */
@Data
public class EquipmentVO implements Serializable {

    /**
     * 器材ID
     */
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

    private static final long serialVersionUID = 1L;
} 