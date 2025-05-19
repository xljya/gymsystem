package com.liucf.gymsystembackend.model.dto.course;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 课程排期查询请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CourseScheduleQueryRequest extends PageRequest implements Serializable {

    private static final long serialVersionUID = 1L;

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
     * 开始时间范围
     */
    private Date startTimeBegin;
    private Date startTimeEnd;


    /**
     * 结束时间范围
     */
    private Date endTimeBegin;
    private Date endTimeEnd;


    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endTime;

    /**
     * 状态(0-已取消,1-可预约,2-已满)
     */
    private Integer status;

    /**
     * 当前页码
     */
    private int current = 1;

    /**
     * 页面大小
     */
    private int pageSize = 10;

    /**
     * 排序字段
     */
    private String sortField;

    /**
     * 排序顺序（默认升序）
     */
    private String sortOrder = "ascend";
} 