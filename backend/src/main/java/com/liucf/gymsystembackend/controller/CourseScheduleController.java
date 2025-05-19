package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.liucf.gymsystembackend.annotation.AuthCheck;
import com.liucf.gymsystembackend.common.BaseResponse;
import com.liucf.gymsystembackend.common.ResultUtils;
import com.liucf.gymsystembackend.common.DeleteRequest;
import com.liucf.gymsystembackend.constant.MemberConstant;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.exception.ThrowUtils;
import com.liucf.gymsystembackend.model.dto.course.CourseScheduleQueryRequest;
import com.liucf.gymsystembackend.model.dto.course.CourseScheduleAddRequest;
import com.liucf.gymsystembackend.model.dto.course.CourseScheduleUpdateRequest;
import com.liucf.gymsystembackend.model.entity.CourseSchedule;
import com.liucf.gymsystembackend.model.vo.CourseScheduleVO;
import com.liucf.gymsystembackend.service.CourseScheduleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * 课程排期接口
 */
@RestController
@RequestMapping("/course/schedule")
@Slf4j
public class CourseScheduleController {

    @Resource
    private CourseScheduleService courseScheduleService;

    /**
     * 新增课程排期
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Long> addSchedule(@RequestBody CourseScheduleAddRequest addRequest) {
        ThrowUtils.throwIf(addRequest == null, ErrorCode.PARAMS_ERROR);
        CourseSchedule schedule = new CourseSchedule();
        BeanUtils.copyProperties(addRequest, schedule);
        boolean result = courseScheduleService.save(schedule);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(schedule.getScheduleId());
    }

    /**
     * 删除课程排期
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteSchedule(@RequestBody DeleteRequest deleteRequest) {
        ThrowUtils.throwIf(deleteRequest == null || deleteRequest.getId() == null || deleteRequest.getId() <= 0, ErrorCode.PARAMS_ERROR);
        boolean result = courseScheduleService.removeById(deleteRequest.getId());
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(result);
    }

    /**
     * 更新课程排期
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateSchedule(@RequestBody CourseScheduleUpdateRequest updateRequest) {
        ThrowUtils.throwIf(updateRequest == null || updateRequest.getScheduleId() == null || updateRequest.getScheduleId() <= 0, ErrorCode.PARAMS_ERROR);
        CourseSchedule schedule = new CourseSchedule();
        BeanUtils.copyProperties(updateRequest, schedule);
        boolean result = courseScheduleService.updateById(schedule);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(result);
    }


    /**
     * 分页获取课程排期（VO）
     * @param queryRequest 查询请求参数，包含分页信息
     * @return 分页后的课程排期VO列表
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<CourseScheduleVO>> listScheduleByPage(@RequestBody CourseScheduleQueryRequest queryRequest) {
        // 校验请求参数是否为空
        ThrowUtils.throwIf(queryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = queryRequest.getCurrent();
        long pageSize = queryRequest.getPageSize();
        // 限制分页大小，最大为50
        ThrowUtils.throwIf(pageSize > 50, ErrorCode.PARAMS_ERROR, "分页大小不能超过50");
        
        // 分页查询课程排期
        Page<CourseSchedule> schedulePage = courseScheduleService.page(
            new Page<>(current, pageSize),
            courseScheduleService.getQueryWrapper(queryRequest)
        );
        // 构建VO分页对象
        Page<CourseScheduleVO> voPage = new Page<>(current, pageSize, schedulePage.getTotal());
        // 将实体列表转换为VO列表
        voPage.setRecords(courseScheduleService.getCourseScheduleVOList(schedulePage.getRecords()));
        // 返回结果
        return ResultUtils.success(voPage);
    }

    /**
     * 根据时间范围查询排期（VO）
     */
    @PostMapping("/list/time")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<List<CourseScheduleVO>> listScheduleByTimeRange(@RequestBody CourseScheduleQueryRequest queryRequest) {
        ThrowUtils.throwIf(queryRequest == null || queryRequest.getStartTime() == null 
            || queryRequest.getEndTime() == null || queryRequest.getStartTime().after(queryRequest.getEndTime()), 
            ErrorCode.PARAMS_ERROR, "时间范围无效");
        
        QueryWrapper<CourseSchedule> queryWrapper = new QueryWrapper<>();
        queryWrapper.between("start_time", queryRequest.getStartTime(), queryRequest.getEndTime());
        List<CourseSchedule> scheduleList = courseScheduleService.list(queryWrapper);
        return ResultUtils.success(courseScheduleService.getCourseScheduleVOList(scheduleList));
    }

    /**
     * 根据课程ID查询排期（VO）
     */
    @PostMapping("/list/course")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<List<CourseScheduleVO>> listScheduleByCourseId(@RequestBody CourseScheduleQueryRequest queryRequest) {
        ThrowUtils.throwIf(queryRequest == null || queryRequest.getCourseId() == null 
            || queryRequest.getCourseId() <= 0, ErrorCode.PARAMS_ERROR);
        
        QueryWrapper<CourseSchedule> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("course_id", queryRequest.getCourseId());
        List<CourseSchedule> scheduleList = courseScheduleService.list(queryWrapper);
        return ResultUtils.success(courseScheduleService.getCourseScheduleVOList(scheduleList));
    }

    /**
     * 根据教练ID查询排期（VO）
     */
    @PostMapping("/list/coach")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<List<CourseScheduleVO>> listScheduleByCoachId(@RequestBody CourseScheduleQueryRequest queryRequest) {
        ThrowUtils.throwIf(queryRequest == null || queryRequest.getCoachId() == null 
            || queryRequest.getCoachId() <= 0, ErrorCode.PARAMS_ERROR);
        
        QueryWrapper<CourseSchedule> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("coach_id", queryRequest.getCoachId());
        List<CourseSchedule> scheduleList = courseScheduleService.list(queryWrapper);
        return ResultUtils.success(courseScheduleService.getCourseScheduleVOList(scheduleList));
    }
} 