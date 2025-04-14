package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.CourseMapper;
import com.liucf.gymsystembackend.model.dto.course.CourseQueryRequest;
import com.liucf.gymsystembackend.model.entity.Course;
import com.liucf.gymsystembackend.model.vo.CourseVO;
import com.liucf.gymsystembackend.service.CourseService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author yueyue
* @description 针对表【course(课程信息表)】的数据库操作Service实现
* @createDate 2025-04-09 02:36:38
*/
@Service
public class CourseServiceImpl extends ServiceImpl<CourseMapper, Course>
    implements CourseService{

    @Override
    public CourseVO getCourseVO(Course course) {
        if (course == null) {
            return null;
        }
        CourseVO courseVO = new CourseVO();
        BeanUtils.copyProperties(course, courseVO);
        return courseVO;
    }

    @Override
    public List<CourseVO> getCourseVOList(List<Course> courseList) {
        if (courseList == null || courseList.isEmpty()) {
            return new ArrayList<>();
        }
        return courseList.stream().map(this::getCourseVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<Course> getQueryWrapper(CourseQueryRequest courseQueryRequest) {
        if (courseQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long courseId = courseQueryRequest.getCourseId();
        String courseName = courseQueryRequest.getCourseName();
        Long coachId = courseQueryRequest.getCoachId();

        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(courseId != null, "course_id", courseId);
        queryWrapper.eq(coachId != null, "coach_id", coachId);
        queryWrapper.like(StrUtil.isNotBlank(courseName), "course_name", courseName);
        return queryWrapper;
    }
}




