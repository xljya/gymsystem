package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
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
import com.liucf.gymsystembackend.model.entity.Coach;
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
       /* if (courseAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Course course = new Course();
        BeanUtils.copyProperties(courseAddRequest, course);
        boolean result = courseService.createCourse(
            course.getCourseName(),
            course.getCategoryId(),
            course.getCoachId(),
            course.getDescription(),
            course.getDuration(),
            course.getSellingPrice(),
            course.getDifficultyLevel(),
            course.getImageUrl()
        );
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(course.getCourseId());*/
        ThrowUtils.throwIf(courseAddRequest == null, ErrorCode.PARAMS_ERROR);
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
    public BaseResponse<Boolean> deleteCourse(@RequestBody Long id) {
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = courseService.deleteCourse(id);
        return ResultUtils.success(result);
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
        boolean result = courseService.updateCourse(
            course.getCourseId(),
            course.getCourseName(),
            course.getCategoryId(),
            course.getCoachId(),
            course.getDescription(),
            course.getDuration(),
            course.getSellingPrice(),
            course.getDifficultyLevel(),
            course.getImageUrl()
        );
        return ResultUtils.success(result);
    }

    /**
     * 分页获取课程列表（仅管理员）
     */
    @PostMapping("/list/page")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<CourseVO>> listCourseByPage(@RequestBody CourseQueryRequest courseQueryRequest) {
        ThrowUtils.throwIf(courseQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = courseQueryRequest.getCurrent();
        long pageSize = courseQueryRequest.getPageSize();
        QueryWrapper<Course> queryWrapper = courseService.getQueryWrapper(courseQueryRequest);
        Page<Course> coursePage = courseService.page(new Page<>(current, pageSize), queryWrapper);
        // 组装VO分页
        Page<CourseVO> courseVOPage = new Page<>(current, pageSize, coursePage.getTotal());
        List<CourseVO> courseVOList = courseService.getCourseVOList(coursePage.getRecords());
        courseVOPage.setRecords(courseVOList);
        return ResultUtils.success(courseVOPage);
    }

    @GetMapping("/list/category/{categoryId}")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<List<CourseVO>> listCourseByCategoryId(@PathVariable Long categoryId) {
        if (categoryId == null || categoryId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<Course> courseList = courseService.getCoursesByCategoryId(categoryId);
        return ResultUtils.success(courseService.getCourseVOList(courseList));
    }

    @GetMapping("/list/coach/{coachId}")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<List<CourseVO>> listCourseByCoachId(@PathVariable Long coachId) {
        if (coachId == null || coachId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<Course> courseList = courseService.getCoursesByCoachId(coachId);
        return ResultUtils.success(courseService.getCourseVOList(courseList));
    }
} 