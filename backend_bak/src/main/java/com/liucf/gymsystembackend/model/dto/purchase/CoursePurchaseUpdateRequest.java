package com.liucf.gymsystembackend.model.dto.purchase;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 课程购买记录更新请求
 */
@Data
public class CoursePurchaseUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 记录ID
     */
    private Long id;

    /**
     * 会员ID（关联 members 表）
     */
    private Long memberId;

    /**
     * 教练ID（关联 coach 表）
     */
    private Long coachId;

    /**
     * 课程ID（关联 course 表）
     */
    private Long courseId;

    /**
     * 购买课时数
     */
    private Integer classCount;

    /**
     * 课程总价
     */
    private BigDecimal totalPrice;

    /**
     * 状态（1-有效，0-无效）
     */
    private Integer status;
} 