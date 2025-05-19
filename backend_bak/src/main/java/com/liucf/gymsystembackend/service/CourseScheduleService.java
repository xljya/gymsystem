package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.course.CourseScheduleQueryRequest;
import com.liucf.gymsystembackend.model.entity.CourseSchedule;
import com.liucf.gymsystembackend.model.vo.CourseScheduleVO;

import java.util.Date;
import java.util.List;

/**
* @author yueyue
* @description 针对表【course_schedule(课程排期表)】的数据库操作Service
* @createDate 2025-04-30 18:56:05
*/
public interface CourseScheduleService extends IService<CourseSchedule> {

    /**
     * 获取脱敏的课程排期信息
     *
     * @param courseSchedule 课程排期信息
     * @return 脱敏后的课程排期信息
     */
    CourseScheduleVO getCourseScheduleVO(CourseSchedule courseSchedule);

    /**
     * 获取脱敏的课程排期信息列表
     *
     * @param courseScheduleList 课程排期信息列表
     * @return 脱敏后的课程排期信息列表
     */
    List<CourseScheduleVO> getCourseScheduleVOList(List<CourseSchedule> courseScheduleList);

    /**
     * 获取课程安排视图对象分页
     */
    Page<CourseScheduleVO> getCourseScheduleVOPage(Page<CourseSchedule> courseSchedulePage);

    /**
     * 获取查询包装器
     *
     * @param courseScheduleQueryRequest 课程排期查询请求
     * @return 查询包装器
     */
    QueryWrapper<CourseSchedule> getQueryWrapper(CourseScheduleQueryRequest courseScheduleQueryRequest);

    /**
     * 创建课程排期
     *
     * @param courseId 课程ID
     * @param coachId 教练ID
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param maxParticipants 最大参与人数
     * @param roomNumber 教室编号
     * @return 是否创建成功
     */
    boolean createSchedule(Long courseId, Long coachId, Date startTime, Date endTime, 
                          Integer maxParticipants, String roomNumber);

    /**
     * 取消课程排期
     *
     * @param scheduleId 排期ID
     * @return 是否取消成功
     */
    boolean cancelSchedule(Long scheduleId);

    /**
     * 获取指定时间范围内的课程排期
     *
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 课程排期列表
     */
    List<CourseSchedule> getSchedulesByTimeRange(Date startTime, Date endTime);
}
