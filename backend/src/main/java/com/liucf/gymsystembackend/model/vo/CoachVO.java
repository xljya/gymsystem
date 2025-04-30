package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 教练视图（脱敏）
 */
@Data
public class CoachVO implements Serializable {

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
     * 教练头像
     */
    private String coachAvatar;

    /**
     * 性别(0-未知,1-男,2-女)
     */
    private Integer gender;

    /**
     * 教练年龄
     */
    private Integer coachAge;

    /**
     * 入职日期
     */
    private Date entryDate;

    /**
     * 教授课程类型
     */
    private String courseType;

    /**
     * 状态(0-在职,1-休假,2-离职)
     */
    private Integer coachStatus;

    /**
     * 创建时间
     */
    private Date createTime;
} 