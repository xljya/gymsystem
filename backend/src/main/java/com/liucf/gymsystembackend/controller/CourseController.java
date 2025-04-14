package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.liucf.gymsystembackend.annotation.AuthCheck;
import com.liucf.gymsystembackend.common.BaseResponse;
import com.liucf.gymsystembackend.common.DeleteRequest;
import com.liucf.gymsystembackend.common.ResultUtils;
import com.liucf.gymsystembackend.constant.MemberConstant;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.exception.ThrowUtils;
import com.liucf.gymsystembackend.model.dto.course.CourseAddRequest;
import com.liucf.gymsystembackend.model.dto.course.CourseQueryRequest;
import com.liucf.gymsystembackend.model.dto.course.CourseUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Course;
import com.liucf.gymsystembackend.model.vo.CourseVO;
import com.liucf.gymsystembackend.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 课程接口
 */
@RestController
@RequestMapping("/course")
@Slf4j
public class CourseController {

    @Resource
    private CourseService courseService;

    /**
     * 创建课程（仅管理员）
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Long> addCourse(@RequestBody CourseAddRequest courseAddRequest) {
        ThrowUtils.throwIf(courseAddRequest == null, ErrorCode.PARAMS_ERROR);
        // 校验必填字段
        if (courseAddRequest.getCoachId() == null || courseAddRequest.getCoachId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "教练ID不能为空");
        }
        Course course = new Course();
        BeanUtils.copyProperties(courseAddRequest, course);
        boolean result = courseService.save(course);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(course.getCourseId());
    }

    /**
     * 根据 id 获取课程（仅管理员）
     */
    @GetMapping("/get")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Course> getCourseById(long courseId) {
        ThrowUtils.throwIf(courseId <= 0, ErrorCode.PARAMS_ERROR);
        Course course = courseService.getById(courseId);
        ThrowUtils.throwIf(course == null, ErrorCode.NOT_FOUND_ERROR);
        return ResultUtils.success(course);
    }

    /**
     * 根据 id 获取脱敏的课程信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<CourseVO> getCourseVOById(long courseId) {
        BaseResponse<Course> response = getCourseById(courseId);
        Course course = response.getData();
        return ResultUtils.success(courseService.getCourseVO(course));
    }

    /**
     * 删除课程（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteCourse(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = courseService.removeById(deleteRequest.getId());
        return ResultUtils.success(b);
    }

    /**
     * 更新课程（仅管理员）
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateCourse(@RequestBody CourseUpdateRequest courseUpdateRequest) {
        if (courseUpdateRequest == null || courseUpdateRequest.getCourseId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Course course = new Course();
        BeanUtils.copyProperties(courseUpdateRequest, course);
        boolean result = courseService.updateById(course);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 分页获取课程列表（仅管理员）
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<CourseVO>> listCourseVOByPage(@RequestBody CourseQueryRequest courseQueryRequest) {
        ThrowUtils.throwIf(courseQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = courseQueryRequest.getCurrent();
        long pageSize = courseQueryRequest.getPageSize();
        Page<Course> coursePage = courseService.page(new Page<>(current, pageSize),
                courseService.getQueryWrapper(courseQueryRequest));
        Page<CourseVO> courseVOPage = new Page<>(current, pageSize, coursePage.getTotal());
        List<CourseVO> courseVOList = courseService.getCourseVOList(coursePage.getRecords());
        courseVOPage.setRecords(courseVOList);
        return ResultUtils.success(courseVOPage);
    }
} 