package com.liucf.gymsystembackend.model.dto.equipment;

import lombok.Data;

import java.io.Serializable;

/**
 * 器材添加请求
 */
@Data
public class EquipmentAddRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 器材名称
     */
    private String eqName;

    /**
     * 器材描述/规格
     */
    private String eqText;
} 