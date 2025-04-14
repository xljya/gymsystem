package com.liucf.gymsystembackend.model.dto.purchase;

import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 课程购买记录查询请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CoursePurchaseQueryRequest extends PageRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 购买记录ID
     */
    private Long purchaseId;

    /**
     * 会员ID
     */
    private Long memberId;

    /**
     * 课程ID
     */
    private Long courseId;

    /**
     * 支付状态(0-未支付,1-已支付,2-已退款)
     */
    private Integer paymentStatus;

    /**
     * 购买时间范围-开始
     */
    private Date purchaseTimeStart;

    /**
     * 购买时间范围-结束
     */
    private Date purchaseTimeEnd;
} 