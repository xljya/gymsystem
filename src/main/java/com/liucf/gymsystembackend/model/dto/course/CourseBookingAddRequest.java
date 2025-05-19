package com.liucf.gymsystembackend.model.dto.course;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 课程预约添加请求
 */
@Data
public class CourseBookingAddRequest implements Serializable {

    /**
     * 预约ID (bookingId) - 用于唯一标识每个预约记录
     */
    private Long bookingId;

    /**
     * 排期ID (scheduleId) - 用于唯一标识每个排期记录
     */
    private Long scheduleId;

    /**
     * 会员ID (memberId) - 用于唯一标识每个会员
     */
    private Long memberId;

    /**
     * 预约状态 (bookingStatus) - 显示预约的当前状态（0-已取消、1-已预约、2-已完成）
     */
    private Integer bookingStatus;

    /**
     * 出勤状态 (attendanceStatus)  (0-未到,1-已到,2-请假,3-爽约)
     */
    private Integer attendanceStatus;


    private static final long serialVersionUID = 1L;
}