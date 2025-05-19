package com.liucf.gymsystembackend.model.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 课程排期更新请求
 */
@Data
public class CourseScheduleUpdateRequest implements Serializable {

    /**
     * 排期ID
     */
    private Long scheduleId;

    /**
     * 课程ID
     */
    private Long courseId;

    /**
     * 教练ID
     */
    private Long coachId;

    /**
     * 开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date startTime;

    /**
     * 结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endTime;

    /**
     * 最大参与人数
     */
    private Integer maxParticipants;

    /**
     * 教室编号
     */
    private String roomNumber;

    /**
     * 状态(0-已取消,1-可预约,2-已满)
     */
    private Integer status;

    private static final long serialVersionUID = 1L;
}