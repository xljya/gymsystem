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

    /**
     * 器械ID
     */
    private Long eqId;

    /**
     * 器械名称 (用于模糊查询)
     */
    private String eqName;

    /**
     * 器械分类ID (用于精确查询)
     */
    private Long eqcategoryId;

    /**
     * 是否首页推荐 (用于精确查询)
     */
    private Integer featured;

    private static final long serialVersionUID = 1L;
} 