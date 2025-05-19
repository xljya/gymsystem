package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

@Data
public class ScheduleVO {
    private Long scheduleId; // 新增排期ID
    // 星期几
    private String day;
    // 24小时制 例如9:00
    private String time;
    
    // 需要getter/setter
} 