package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.course.CourseQueryRequest;
import com.liucf.gymsystembackend.model.entity.Course;
import com.liucf.gymsystembackend.model.vo.CourseVO;

import java.util.List;

/**
 * 课程服务
 */
public interface CourseService extends IService<Course> {

    /**
     * 获取脱敏的课程信息
     *
     * @param course 课程信息
     * @return 脱敏后的课程信息
     */
    CourseVO getCourseVO(Course course);

    /**
     * 获取脱敏的课程信息列表
     *
     * @param courseList 课程信息列表
     * @return 脱敏后的课程信息列表
     */
    List<CourseVO> getCourseVOList(List<Course> courseList);

    /**
     * 获取查询包装器
     *
     * @param courseQueryRequest 课程查询请求
     * @return 查询包装器
     */
    QueryWrapper<Course> getQueryWrapper(CourseQueryRequest courseQueryRequest);
}
