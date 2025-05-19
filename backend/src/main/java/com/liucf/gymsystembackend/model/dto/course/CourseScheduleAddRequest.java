package com.liucf.gymsystembackend.model.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 课程排期添加请求
 */
@Data
public class CourseScheduleAddRequest implements Serializable {

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

    private static final long serialVersionUID = 1L;
} 