package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.coach.CoachQueryRequest;
import com.liucf.gymsystembackend.model.entity.Coach;
import com.liucf.gymsystembackend.model.vo.CoachVO;

import java.util.Date;
import java.util.List;

/**
 * 教练服务
 */
public interface CoachService extends IService<Coach> {

    /**
     * 教练注册
     *
     * @param coachAccount 教练账号
     * @param coachName 教练姓名
     * @param coachAvatar 教练头像
     * @param gender 性别
     * @param coachAge 年龄
     * @param entryDate 入职日期
     * @param courseType 课程类型
     * @param coachSalary 薪资
     * @param coachAddress 住址
     * @return 新教练 id
     */
    long coachRegister(String coachAccount, String coachName, String coachAvatar, Integer gender,
                      Integer coachAge, Date entryDate, String courseType, String coachSalary, String coachAddress);

    /**
     * 获取脱敏的教练信息
     *
     * @param coach 教练信息
     * @return 脱敏后的教练信息
     */
    CoachVO getCoachVO(Coach coach);

    /**
     * 获取脱敏的教练信息列表
     *
     * @param coachList 教练信息列表
     * @return 脱敏后的教练信息列表
     */
    List<CoachVO> getCoachVOList(List<Coach> coachList);

    /**
     * 获取查询包装器
     *
     * @param coachQueryRequest 教练查询请求
     * @return 查询包装器
     */
    QueryWrapper<Coach> getQueryWrapper(CoachQueryRequest coachQueryRequest);

    /**
     * 获取所有不重复的教练地址
     *
     * @return 不重复的教练地址列表
     */
    List<String> listDistinctCoachAddresses();
}
