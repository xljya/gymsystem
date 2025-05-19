package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 课程预约视图对象
 */
@Data
public class CourseBookingVO implements Serializable {

    /**
     * 预约ID
     */
    private Long bookingId;

    /**
     * 排期ID
     */
    private Long scheduleId;

    /**
     * 会员ID
     */
    private Long memberId;


    /**
     * 预约状态(0-已取消,1-已预约,2-已完成)
     */
    private Integer bookingStatus;

    /**
     * 出勤状态(0-未到,1-已到,2-请假,3-爽约)
     */
    private Integer attendanceStatus;

    /**
     * 创建时间
     */
    private Date createTime;



 private static final long serialVersionUID = 1L;
} 