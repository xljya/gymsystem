package com.liucf.gymsystembackend.model.dto.goods;

import lombok.Data;
import java.io.Serializable;
// 假设 PageRequest 存在于 common 包, 如果不存在, 则需要创建或直接在此类中定义分页排序字段
// import com.liucf.gymsystembackend.common.PageRequest;

/**
 * 商品分类查询请求
 */
@Data
public class GoodsCategoryQueryRequest implements Serializable { // 如果有PageRequest基类，则 extends PageRequest

    /**
     * 分类ID
     */
    private Integer gdcategoryId;

    /**
     * 分类名称 (用于模糊查询)
     */
    private String categoryName;

    // --- 分页参数 (如果不用基类) ---
    /**
     * 当前页码
     */
    private long current = 1;

    /**
     * 页面大小
     */
    private long pageSize = 10;

    /**
     * 排序字段
     */
    private String sortField;

    /**
     * 排序顺序（默认升序）
     */
    private String sortOrder = "ascend"; // or "descend"
    // --- 分页参数结束 ---

    private static final long serialVersionUID = 1L;
} 