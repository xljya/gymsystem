package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 课程预约表
 * @TableName course_booking
 */
@TableName(value ="course_booking")
@Data
public class CourseBooking {
    /**
     * 预约ID
     */
    @TableId(type = IdType.AUTO)
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

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除(0-未删除,1-已删除)
     */
    private Integer isDelete;
}