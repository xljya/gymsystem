package com.liucf.gymsystembackend.model.dto.coach;

import com.liucf.gymsystembackend.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 教练查询请求
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CoachQueryRequest extends PageRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 教练ID
     */
    private Long coachId;

    /**
     * 教练姓名
     */
    private String coachName;

    /**
     * 教练账号
     */
    private String coachAccount;

    /**
     * 性别(0-未知,1-男,2-女)
     */
    private Integer gender;

    /**
     * 教授课程类型
     */
    private String courseType;

    /**
     * 状态(0-在职,1-休假,2-离职)
     */
    private Integer coachStatus;
} 