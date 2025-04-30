package com.liucf.gymsystembackend.model.dto.equipment;

import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 器材查询请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class EquipmentQueryRequest extends PageRequest implements Serializable {

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
     * 器材状态(0-正常,1-维修中,2-报废)
     */
    private Integer eqStatus;
} 