package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 课程预约视图对象
 */
@Data
public class CourseReservationVO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 预约ID
     */
    private Long reservationId;

    /**
     * 会员ID
     */
    private Long memberId;

    /**
     * 会员姓名
     */
    private String memberName;

    /**
     * 课程ID
     */
    private Long courseId;

    /**
     * 课程名称
     */
    private String courseName;

    /**
     * 排期ID
     */
    private Long scheduleId;

    /**
     * 教练ID
     */
    private Long coachId;

    /**
     * 教练姓名
     */
    private String coachName;

    /**
     * 预约时间
     */
    private Date reservationTime;

    /**
     * 状态(0-已取消,1-已预约,2-已完成)
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
     * 是否删除(0-未删除,1-已删除)
     */
    private Integer isDelete;
} 