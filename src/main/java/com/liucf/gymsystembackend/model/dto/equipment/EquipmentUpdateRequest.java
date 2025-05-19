package com.liucf.gymsystembackend.model.dto.equipment;

import lombok.Data;

import java.io.Serializable;

/**
 * 器材更新请求
 */
@Data
public class EquipmentUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

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
} 