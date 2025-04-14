package com.liucf.gymsystembackend.common;

import lombok.Data;

import java.io.Serializable;

/**
 * 通用的删除请求类
 */
@Data
public class DeleteRequest implements Serializable {

    /**
     * 主键ID
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
     * 会员ID
     */
    private Long memberId;

    /**
     * 商品ID
     */
    private Long goodsId;

    private static final long serialVersionUID = 1L;
}