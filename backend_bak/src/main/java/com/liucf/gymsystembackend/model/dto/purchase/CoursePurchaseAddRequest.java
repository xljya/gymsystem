package com.liucf.gymsystembackend.model.dto.purchase;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 课程购买记录添加请求
 */
@Data
public class CoursePurchaseAddRequest implements Serializable {

    private static final long serialVersionUID = 1L;

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
} 