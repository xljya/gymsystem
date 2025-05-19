package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.CourseMapper;
import com.liucf.gymsystembackend.mapper.CourseCategoryMapper;
import com.liucf.gymsystembackend.mapper.CourseScheduleMapper;
import com.liucf.gymsystembackend.model.dto.course.CourseQueryRequest;
import com.liucf.gymsystembackend.model.entity.Course;
import com.liucf.gymsystembackend.model.entity.CourseCategory;
import com.liucf.gymsystembackend.model.entity.CourseSchedule;
import com.liucf.gymsystembackend.model.vo.CourseVO;
import com.liucf.gymsystembackend.model.vo.ScheduleVO;
import com.liucf.gymsystembackend.service.CourseService;
import com.liucf.gymsystembackend.service.CoachService;
import lombok.experimental.Helper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 课程服务实现
 */
@Service
public class CourseServiceImpl extends ServiceImpl<CourseMapper, Course>
        implements CourseService {

    @Resource
    private CourseCategoryMapper courseCategoryMapper;

    @Resource
    private CoachService coachService;

    @Resource
    private CourseMapper courseMapper;

    @Resource
    private CourseScheduleMapper courseScheduleMapper;

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

        // 提取所有 categoryId 和 coachId
        List<Long> categoryIds = courseList.stream()
                .map(Course::getCategoryId)
                .distinct()
                .collect(Collectors.toList());

        List<Long> coachIds = courseList.stream()
                .map(Course::getCoachId)
                .distinct()
                .collect(Collectors.toList());

        // 批量查询课程类别和教练信息
        List<CourseCategory> categoryList = courseCategoryMapper.selectBatchIds(categoryIds);
        Map<Long, String> categoryIdNameMap = categoryList.stream()
                .collect(Collectors.toMap(CourseCategory::getCategoryId, CourseCategory::getCategoryName));

        Map<Long, String> coachIdNameMap = coachService.listByIds(coachIds).stream()
                .collect(Collectors.toMap(coach -> coach.getCoachId(), coach -> coach.getCoachName()));

        // 构造 VO 列表
        return courseList.stream().map(course -> {
            CourseVO courseVO = new CourseVO();
            BeanUtils.copyProperties(course, courseVO);
            courseVO.setCategoryName(categoryIdNameMap.get(course.getCategoryId())); // 设课程分类名
            courseVO.setCoachName(coachIdNameMap.get(course.getCoachId()));          // 设教练名
            return courseVO;
        }).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<Course> getQueryWrapper(CourseQueryRequest courseQueryRequest) {
        if (courseQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long courseId = courseQueryRequest.getCourseId();
        String courseName = courseQueryRequest.getCourseName();
        Long categoryId = courseQueryRequest.getCategoryId();
        Long coachId = courseQueryRequest.getCoachId();
        String difficultyLevel = courseQueryRequest.getDifficultyLevel();
        Integer duration = courseQueryRequest.getDuration();

        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(courseId != null, "id", courseId);
        queryWrapper.like(StrUtil.isNotBlank(courseName), "course_name", courseName);
        queryWrapper.eq(categoryId != null, "category_id", categoryId);
        queryWrapper.eq(coachId != null, "coach_id", coachId);
        queryWrapper.eq(StrUtil.isNotBlank(difficultyLevel), "difficulty_level", difficultyLevel);
        queryWrapper.eq(duration != null, "duration", duration);
        return queryWrapper;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean createCourse(String courseName, Long categoryId, Long coachId, String description,
                                Integer duration, BigDecimal sellingPrice, String difficultyLevel,
                                String imageUrl) {
        // 1. 校验参数
        if (StrUtil.isBlank(courseName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程名称不能为空");
        }
        if (categoryId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程类别不能为空");
        }
        if (coachId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "教练不能为空");
        }
        if (duration == null || duration <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程时长必须大于0");
        }
        if (sellingPrice == null || sellingPrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程价格不能为负数");
        }

        // 2. 检查类别是否存在
        if (courseCategoryMapper.selectById(categoryId) == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程类别不存在");
        }

        // 3. 检查教练是否存在
        if (coachService.getById(coachId) == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "教练不存在");
        }

        // 4. 检查课程名称是否重复
        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("course_name", courseName);
        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "课程名称已存在");
        }

        // 5. 创建课程
        Course course = new Course();
        course.setCourseName(courseName);
        course.setCategoryId(categoryId);
        course.setCoachId(coachId);
        course.setDescription(description);
        course.setDuration(duration);
        course.setSellingPrice(sellingPrice);
        course.setDifficultyLevel(difficultyLevel);
        course.setImageUrl(imageUrl);
        return this.save(course);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateCourse(Long courseId, String courseName, Long categoryId, Long coachId, String description,
                                Integer duration, BigDecimal sellingPrice, String difficultyLevel,
                                String imageUrl) {
        // 1. 校验参数
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程ID不能为空");
        }

        // 2. 检查课程是否存在
        Course course = this.getById(courseId);
        if (course == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程不存在");
        }

        // 3. 如果修改了类别，检查类别是否存在
        if (categoryId != null && !categoryId.equals(course.getCategoryId())) {
            if (courseCategoryMapper.selectById(categoryId) == null) {
                throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程类别不存在");
            }
        }

        // 4. 如果修改了教练，检查教练是否存在
        if (coachId != null && !coachId.equals(course.getCoachId())) {
            if (coachService.getById(coachId) == null) {
                throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "教练不存在");
            }
        }

        // 5. 如果修改了名称，检查是否重复
        if (StrUtil.isNotBlank(courseName) && !courseName.equals(course.getCourseName())) {
            QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("course_name", courseName);
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "课程名称已存在");
            }
        }

        // 6. 更新课程
        if (StrUtil.isNotBlank(courseName)) {
            course.setCourseName(courseName);
        }
        if (categoryId != null) {
            course.setCategoryId(categoryId);
        }
        if (coachId != null) {
            course.setCoachId(coachId);
        }
        if (StrUtil.isNotBlank(description)) {
            course.setDescription(description);
        }
        if (duration != null && duration > 0) {
            course.setDuration(duration);
        }
        if (sellingPrice != null && sellingPrice.compareTo(BigDecimal.ZERO) >= 0) {
            course.setSellingPrice(sellingPrice);
        }
        if (StrUtil.isNotBlank(difficultyLevel)) {
            course.setDifficultyLevel(difficultyLevel);
        }
        if (StrUtil.isNotBlank(imageUrl)) {
            course.setImageUrl(imageUrl);
        }
        return this.updateById(course);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteCourse(Long courseId) {
        // 1. 校验参数
        if (courseId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程ID不能为空");
        }

        // 2. 检查课程是否存在
        Course course = this.getById(courseId);
        if (course == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程不存在");
        }

        // 3. 检查课程是否有关联的课程安排
        // TODO: 需要添加课程安排表的检查

        // 4. 删除课程
        return this.removeById(courseId);
    }

    @Override
    public List<Course> getCoursesByCategoryId(Long categoryId) {
        if (categoryId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "类别ID不能为空");
        }
        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id", categoryId);
        return this.list(queryWrapper);
    }

    @Override
    public List<Course> getCoursesByCoachId(Long coachId) {
        if (coachId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "教练ID不能为空");
        }
        QueryWrapper<Course> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("coach_id", coachId);
        return this.list(queryWrapper);
    }

    @Override
    public Page<CourseVO> getCourseVOPage(Page<Course> coursePage) {
        if (coursePage == null || coursePage.getRecords() == null) {
            return new Page<>();
        }
        Page<CourseVO> courseVOPage = new Page<>((int) coursePage.getCurrent(),
                (int) coursePage.getSize(),
                coursePage.getTotal());
        List<CourseVO> courseVOList = this.getCourseVOList(coursePage.getRecords());
        courseVOPage.setRecords(courseVOList);
        return courseVOPage;
    }

    @Override
    public CourseVO getCourseVoWithScheduleById(Long courseId) {
        CourseVO courseVO = courseMapper.selectCourseVoById(courseId);
        if (courseVO != null) {
            populateScheduleForCourseVO(courseVO);
        }
        return courseVO;
    }

    @Override
    public List<CourseVO> listAllCoursesWithSchedule() {
        List<CourseVO> courseVOs = courseMapper.listAllCoursesForVO();
        populateSchedulesForCourseVOList(courseVOs);
        return courseVOs;
    }

    @Override
    public List<CourseVO> listCoursesByCategoryIdWithSchedule(Long categoryId) {
        List<CourseVO> courseVOs = courseMapper.selectCourseVOsByCategoryId(categoryId);
        populateSchedulesForCourseVOList(courseVOs);
        return courseVOs;
    }

    /**
     * Helper method to populate schedule for a single CourseVO.
     */
    /**
     * 为单个CourseVO填充课程安排信息。
     */
    private void populateScheduleForCourseVO(CourseVO courseVO) {
        if (courseVO == null) {
            return;
        }
        // 修复：确保List已正确导入，且courseScheduleMapper方法返回类型为List<CourseSchedule>
        List<CourseSchedule> schedules = courseScheduleMapper.selectSchedulesByCourseId(courseVO.getCourseId());
        courseVO.setSchedule(convertToScheduleVOList(schedules));
    }

    /**
     * 为一组CourseVO高效填充课程安排信息。
     */
    private void populateSchedulesForCourseVOList(List<CourseVO> courseVOs) {
        if (courseVOs == null || courseVOs.isEmpty()) {
            return;
        }
        // 1. Collect all course IDs
        List<Long> courseIds = courseVOs.stream().map(CourseVO::getCourseId).distinct().collect(Collectors.toList());

        if (courseIds.isEmpty()) {
            return;
        }

        // 2. Fetch all relevant schedules in one go using the batch method
        List<CourseSchedule> allSchedules = courseScheduleMapper.selectSchedulesByCourseIds(courseIds); 
        Map<Long, List<CourseSchedule>> schedulesByCourseIdMap = allSchedules.stream()
                .collect(Collectors.groupingBy(CourseSchedule::getCourseId));

        for (CourseVO courseVO : courseVOs) {
            List<CourseSchedule> courseSchedules = schedulesByCourseIdMap.getOrDefault(courseVO.getCourseId(), new ArrayList<>());
            courseVO.setSchedule(convertToScheduleVOList(courseSchedules));
        }
    }

    private List<ScheduleVO> convertToScheduleVOList(List<CourseSchedule> courseSchedules) {
        if (courseSchedules == null || courseSchedules.isEmpty()) {
            return new ArrayList<>();
        }
        return courseSchedules.stream().map(scheduleEntity -> {
            ScheduleVO scheduleVO = new ScheduleVO();
            scheduleVO.setScheduleId(scheduleEntity.getScheduleId());

            if (scheduleEntity.getStartTime() != null) {
                LocalDateTime startTime = scheduleEntity.getStartTime().toInstant()
                        .atZone(ZoneId.systemDefault()).toLocalDateTime();

                DayOfWeek dayOfWeek = startTime.getDayOfWeek();
                String dayString = "";
                switch (dayOfWeek) {
                    case MONDAY: dayString = "周一"; break;
                    case TUESDAY: dayString = "周二"; break;
                    case WEDNESDAY: dayString = "周三"; break;
                    case THURSDAY: dayString = "周四"; break;
                    case FRIDAY: dayString = "周五"; break;
                    case SATURDAY: dayString = "周六"; break;
                    case SUNDAY: dayString = "周日"; break;
                    default: dayString = dayOfWeek.toString(); // Fallback
                }
                scheduleVO.setDay(dayString);
                scheduleVO.setTime(startTime.format(DateTimeFormatter.ofPattern("HH:mm")));
            } else {
                scheduleVO.setDay("N/A");
                scheduleVO.setTime("N/A");
            }
            return scheduleVO;
        }).collect(Collectors.toList());
    }
}




