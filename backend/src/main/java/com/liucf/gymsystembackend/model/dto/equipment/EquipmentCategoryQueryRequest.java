package com.liucf.gymsystembackend.model.dto.equipment;

import lombok.Data;
import java.io.Serializable;
// import com.liucf.gymsystembackend.common.PageRequest;

/**
 * 器械分类查询请求
 */
@Data
public class EquipmentCategoryQueryRequest implements Serializable { //  extends PageRequest

    /**
     * 器械分类ID
     */
    private Long eqcategoryId;

    /**
     * 分类名称 (用于模糊查询)
     */
    private String categoryName;

    // --- 分页参数 ---
    private long current = 1;
    private long pageSize = 10;
    private String sortField;
    private String sortOrder = "ascend";
    // --- 分页参数结束 ---

    private static final long serialVersionUID = 1L;
} 