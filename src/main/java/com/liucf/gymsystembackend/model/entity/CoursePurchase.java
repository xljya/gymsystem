package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 课程购买记录表
 * @TableName course_purchase
 */
@TableName(value ="course_purchase")
@Data
public class CoursePurchase {
    /**
     * 记录ID
     */
    @TableId(type = IdType.AUTO)
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

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除（0-未删除，1-已删除）
     */
    private Integer isDelete;
}