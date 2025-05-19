package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.course.CourseQueryRequest;
import com.liucf.gymsystembackend.model.entity.Course;
import com.liucf.gymsystembackend.model.vo.CourseVO;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.math.BigDecimal;
import java.util.List;

/**
 * 课程服务接口
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

    /**
     * 创建课程
     *
     * @param courseName 课程名称
     * @param categoryId 类别ID
     * @param coachId 教练ID
     * @param description 课程描述
     * @param duration 课程时长（分钟）
     * @param sellingPrice 课程价格
     * @param difficultyLevel 课程难度等级
     * @param imageUrl 课程图片URL
     * @return 是否创建成功
     */
    boolean createCourse(String courseName, Long categoryId, Long coachId, String description,
                        Integer duration, BigDecimal sellingPrice, String difficultyLevel,
                        String imageUrl);

    /**
     * 更新课程
     *
     * @param courseId 课程ID
     * @param courseName 课程名称
     * @param categoryId 类别ID
     * @param coachId 教练ID
     * @param description 课程描述
     * @param duration 课程时长（分钟）
     * @param sellingPrice 课程价格
     * @param difficultyLevel 课程难度等级
     * @param imageUrl 课程图片URL
     * @return 是否更新成功
     */
    boolean updateCourse(Long courseId, String courseName, Long categoryId, Long coachId, String description,
                        Integer duration, BigDecimal sellingPrice, String difficultyLevel,
                        String imageUrl);

    /**
     * 删除课程
     *
     * @param courseId 课程ID
     * @return 是否删除成功
     */
    boolean deleteCourse(Long courseId);

    /**
     * 根据类别ID获取课程列表
     *
     * @param categoryId 类别ID
     * @return 课程列表
     */
    List<Course> getCoursesByCategoryId(Long categoryId);

    /**
     * 根据教练ID获取课程列表
     *
     * @param coachId 教练ID
     * @return 课程列表
     */
    List<Course> getCoursesByCoachId(Long coachId);

    /**
     * 获取课程视图对象分页
     *
     * @param coursePage 课程分页信息
     * @return 课程视图对象分页信息
     */
    Page<CourseVO> getCourseVOPage(Page<Course> coursePage);

    /**
     * 根据课程ID获取课程VO（包含分类、教练名称和排期信息）
     *
     * @param courseId 课程ID
     * @return CourseVO，如果找不到则返回null
     */
    CourseVO getCourseVoWithScheduleById(Long courseId);

    /**
     * 获取所有课程VO列表（包含分类、教练名称和排期信息）
     *
     * @return List<CourseVO>
     */
    List<CourseVO> listAllCoursesWithSchedule();

    /**
     * 根据分类ID获取课程VO列表（包含分类、教练名称和排期信息）
     *
     * @param categoryId 分类ID
     * @return List<CourseVO>
     */
    List<CourseVO> listCoursesByCategoryIdWithSchedule(Long categoryId);
}
