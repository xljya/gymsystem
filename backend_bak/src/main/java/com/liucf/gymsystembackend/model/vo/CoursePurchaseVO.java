package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 课程购买记录视图（脱敏）
 */
@Data
public class CoursePurchaseVO implements Serializable {

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

    /**
     * 创建时间
     */
    private Date createTime;

    private static final long serialVersionUID = 1L;
} 