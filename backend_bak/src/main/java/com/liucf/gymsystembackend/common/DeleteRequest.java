package com.liucf.gymsystembackend.common;

import lombok.Data;

import java.io.Serializable;

/**
 * 通用的删除请求类
 */
@Data
public class DeleteRequest implements Serializable {

    /**
     * 主键ID (通用，通常代表要删除记录的主键)
     */
    private Long id;

    /**
     * 器材ID
     */
    private Long eqId;

    /**
     * 课程ID
     */
    private Long courseId;

    /**
     * 教练ID
     */
    private Long coachId;

    /**
     * 会员ID (有时用于权限校验或关联删除)
     */
    private Long memberId;

    /**
     * 商品ID
     */
    private Long goodsId;

    /**
     * 排期ID (课程排期表主键)
     */
    private Long scheduleId;

    /**
     * 预约ID (课程预约表主键, 通常可使用通用id字段)
     */
    private Long bookingId;

    /**
     * 购买记录ID (课程购买记录表主键, 通常可使用通用id字段)
     */
    private Long purchaseId;

    /**
     * 商品交易记录ID (商品交易记录表主键, 通常可使用通用id字段)
     */
    private Long transactionId;

    /**
     * 课程分类ID (课程分类表主键, 通常可使用通用id字段)
     */
    private Long categoryId;

    private static final long serialVersionUID = 1L;
}