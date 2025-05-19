package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.CourseScheduleMapper;
import com.liucf.gymsystembackend.model.dto.course.CourseScheduleQueryRequest;
import com.liucf.gymsystembackend.model.entity.CourseSchedule;
import com.liucf.gymsystembackend.model.vo.CourseScheduleVO;
import com.liucf.gymsystembackend.service.CourseScheduleService;
import com.liucf.gymsystembackend.service.CourseService;
import com.liucf.gymsystembackend.service.CoachService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 课程安排服务实现
 */
@Service
public class CourseScheduleServiceImpl extends ServiceImpl<CourseScheduleMapper, CourseSchedule>
    implements CourseScheduleService {

    @Resource
    private CourseService courseService;

    @Resource
    private CoachService coachService;

    @Override
    public CourseScheduleVO getCourseScheduleVO(CourseSchedule courseSchedule) {
        if (courseSchedule == null) {
            return null;
        }
        CourseScheduleVO courseScheduleVO = new CourseScheduleVO();
        BeanUtils.copyProperties(courseSchedule, courseScheduleVO);
        return courseScheduleVO;
    }

    @Override
    public List<CourseScheduleVO> getCourseScheduleVOList(List<CourseSchedule> courseScheduleList) {
        if (courseScheduleList == null || courseScheduleList.isEmpty()) {
            return new ArrayList<>();
        }
        return courseScheduleList.stream().map(this::getCourseScheduleVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<CourseSchedule> getQueryWrapper(CourseScheduleQueryRequest request) {
        if (request == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        QueryWrapper<CourseSchedule> queryWrapper = new QueryWrapper<>();

        // 1. 精确匹配条件
        queryWrapper.eq(request.getScheduleId() != null, "schedule_id", request.getScheduleId()); // 修正字段名
        queryWrapper.eq(request.getCourseId() != null, "course_id", request.getCourseId());
        queryWrapper.eq(request.getCoachId() != null, "coach_id", request.getCoachId());
        queryWrapper.eq(request.getStatus() != null, "status", request.getStatus());

        // 2. 时间范围查询（优化逻辑）
        // 开始时间范围（注意字段名与实体类对应）
        if (request.getStartTimeBegin() != null && request.getStartTimeEnd() != null) {
            queryWrapper.between("start_time", request.getStartTimeBegin(), request.getStartTimeEnd());
        } else {
            queryWrapper.ge(request.getStartTimeBegin() != null, "start_time", request.getStartTimeBegin())
                    .le(request.getStartTimeEnd() != null, "start_time", request.getStartTimeEnd());
        }

        // 结束时间范围
        if (request.getEndTimeBegin() != null && request.getEndTimeEnd() != null) {
            queryWrapper.between("end_time", request.getEndTimeBegin(), request.getEndTimeEnd());
        } else {
            queryWrapper.ge(request.getEndTimeBegin() != null, "end_time", request.getEndTimeBegin())
                    .le(request.getEndTimeEnd() != null, "end_time", request.getEndTimeEnd());
        }
        // 3. 逻辑删除过滤（重要！防止查询到已删除数据）
        queryWrapper.eq("is_delete", 0); // 默认只查未删除

        // 4. 动态排序支持（防止SQL注入）
        String validSortField = validateSortField(request.getSortField()); // 白名单校验
        if (StringUtils.isNotBlank(validSortField)) {
            if ("asc".equalsIgnoreCase(request.getSortOrder())) {
                queryWrapper.orderByAsc(validSortField);
            } else {
                queryWrapper.orderByDesc(validSortField);
            }
        }
        return queryWrapper;
    }


    // 排序字段白名单校验方法
    private String validateSortField(String sortField) {
        if (StringUtils.isBlank(sortField)) return null;

        // 定义允许排序的字段集合
        Set<String> validFields = new HashSet<>(Arrays.asList(
                "schedule_id", "course_id", "coach_id",
                "start_time", "end_time", "create_time"
        ));

        return validFields.contains(sortField.toLowerCase()) ? sortField : null;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean createSchedule(Long courseId, Long coachId, Date startTime, Date endTime, Integer maxParticipants, String roomNumber) {
        // 1. 校验参数
        if (courseId == null || courseId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程ID不能为空");
        }
        if (coachId == null || coachId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "教练ID不能为空");
        }
        if (startTime == null || endTime == null || startTime.after(endTime)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "时间设置无效");
        }
        if (maxParticipants == null || maxParticipants <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "最大参与人数必须大于0");
        }
        if (StrUtil.isBlank(roomNumber)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "教室编号不能为空");
        }

        // 2. 检查课程是否存在
        if (courseService.getById(courseId) == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程不存在");
        }

        // 3. 检查教练是否存在
        if (coachService.getById(coachId) == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "教练不存在");
        }

        // 4. 检查时间冲突
        QueryWrapper<CourseSchedule> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("room_number", roomNumber)
                .and(wrapper -> wrapper
                        .between("start_time", startTime, endTime)
                        .or()
                        .between("end_time", startTime, endTime)
                        .or()
                        .le("start_time", startTime)
                        .ge("end_time", endTime));
        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该时间段教室已被占用");
        }

        // 5. 检查教练时间冲突
        QueryWrapper<CourseSchedule> coachQueryWrapper = new QueryWrapper<>();
        coachQueryWrapper.eq("coach_id", coachId)
                .and(wrapper -> wrapper
                        .between("start_time", startTime, endTime)
                        .or()
                        .between("end_time", startTime, endTime)
                        .or()
                        .le("start_time", startTime)
                        .ge("end_time", endTime));
        long coachCount = this.count(coachQueryWrapper);
        if (coachCount > 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该时间段教练已有其他课程安排");
        }

        // 6. 创建课程安排
        CourseSchedule schedule = new CourseSchedule();
        schedule.setCourseId(courseId);
        schedule.setCoachId(coachId);
        schedule.setStartTime(startTime);
        schedule.setEndTime(endTime);
        schedule.setMaxParticipants(maxParticipants);
        schedule.setCurrentParticipants(0);
        schedule.setRoomNumber(roomNumber);
        schedule.setStatus(1); // 1-可预约
        return this.save(schedule);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean cancelSchedule(Long scheduleId) {
        // 1. 校验参数
        if (scheduleId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "安排ID不能为空");
        }

        // 2. 检查安排是否存在
        CourseSchedule schedule = this.getById(scheduleId);
        if (schedule == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程安排不存在");
        }

        // 3. 检查是否已经取消
        if (schedule.getStatus() == 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该课程安排已经取消");
        }

        // 4. 检查是否有会员预约
        if (schedule.getCurrentParticipants() > 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该课程已有会员预约，无法取消");
        }

        // 5. 更新状态为已取消
        schedule.setStatus(0); // 0表示已取消
        return this.updateById(schedule);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<CourseSchedule> getSchedulesByTimeRange(Date startTime, Date endTime) {
        if (startTime == null || endTime == null || startTime.after(endTime)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "时间范围无效");
        }
        QueryWrapper<CourseSchedule> queryWrapper = new QueryWrapper<>();
        queryWrapper.between("start_time", startTime, endTime)
                .or()
                .between("end_time", startTime, endTime)
                .or()
                .le("start_time", startTime)
                .ge("end_time", endTime);
        return this.list(queryWrapper);
    }

    @Override
    public Page<CourseScheduleVO> getCourseScheduleVOPage(Page<CourseSchedule> courseSchedulePage) {
        if (courseSchedulePage == null || courseSchedulePage.getRecords() == null) {
            return new Page<>();
        }
        // 创建新的Page对象时，将long类型转换为int类型
        Page<CourseScheduleVO> voPage = new Page<>((int)courseSchedulePage.getCurrent(), 
                                                 (int)courseSchedulePage.getSize(), 
                                                 courseSchedulePage.getTotal());
        voPage.setRecords(getCourseScheduleVOList(courseSchedulePage.getRecords()));
        return voPage;
    }
}




