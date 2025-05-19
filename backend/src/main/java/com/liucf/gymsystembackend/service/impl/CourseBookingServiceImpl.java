package com.liucf.gymsystembackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.model.dto.course.CourseBookingQueryRequest;
import com.liucf.gymsystembackend.model.entity.CourseBooking;
import com.liucf.gymsystembackend.model.entity.CourseSchedule;
import com.liucf.gymsystembackend.model.entity.Members;
import com.liucf.gymsystembackend.model.vo.CourseBookingVO;
import com.liucf.gymsystembackend.service.CourseBookingService;
import com.liucf.gymsystembackend.service.CourseScheduleService;
import com.liucf.gymsystembackend.service.MembersService;
import com.liucf.gymsystembackend.mapper.CourseBookingMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseBookingServiceImpl extends ServiceImpl<CourseBookingMapper, CourseBooking>
        implements CourseBookingService {

    @Resource
    private CourseScheduleService courseScheduleService;

    @Resource
    private MembersService membersService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean createBooking(Long memberId, Long scheduleId) {
        // 校验会员
        Members member = membersService.getById(memberId);
        if (member == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "会员不存在");
        }
        // 校验排期
        CourseSchedule schedule = courseScheduleService.getById(scheduleId);
        if (schedule == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程排期不存在");
        }
        // 这里假设CourseSchedule有status、currentParticipants、maxParticipants字段
        if (schedule.getStatus() != 1) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "课程排期不可预约");
        }
        if (schedule.getCurrentParticipants() >= schedule.getMaxParticipants()) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "课程已满");
        }
        // 检查是否已预约
        if (isBooked(memberId, scheduleId)) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "已预约该课程");
        }
        // 创建预约
        CourseBooking booking = new CourseBooking();
        booking.setMemberId(memberId);
        booking.setScheduleId(scheduleId);
        booking.setBookingStatus(1); // 1-已预约
        booking.setAttendanceStatus(0); // 0-未到
        booking.setCreateTime(new Date());
        booking.setUpdateTime(new Date());
        booking.setIsDelete(0);

        // 更新排期人数
        schedule.setCurrentParticipants(schedule.getCurrentParticipants() + 1);
        if (schedule.getCurrentParticipants() >= schedule.getMaxParticipants()) {
            schedule.setStatus(2); // 2-已满
        }
        courseScheduleService.updateById(schedule);

        return this.save(booking);
    }



    @Override
    public boolean isBooked(Long memberId, Long scheduleId) {
        QueryWrapper<CourseBooking> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("member_id", memberId)
                .eq("schedule_id", scheduleId)
                .eq("booking_status", 1)
                .eq("is_delete", 0);
        return this.count(queryWrapper) > 0;
    }

    @Override
    public List<CourseBooking> getMemberBookings(Long memberId, Date startTime, Date endTime) {
        QueryWrapper<CourseBooking> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("member_id", memberId)
                .eq("is_delete", 0)
                .ge(startTime != null, "create_time", startTime)
                .le(endTime != null, "create_time", endTime)
                .orderByDesc("create_time");
        return this.list(queryWrapper);
    }

    @Override
    public QueryWrapper<CourseBooking> getQueryWrapper(CourseBookingQueryRequest courseBookingQueryRequest) {
        QueryWrapper<CourseBooking> queryWrapper = new QueryWrapper<>();
        if (courseBookingQueryRequest == null) {
            return queryWrapper;
        }
        Long scheduleId = courseBookingQueryRequest.getScheduleId();
        Long memberId = courseBookingQueryRequest.getMemberId();
        Integer bookingStatus = courseBookingQueryRequest.getBookingStatus();
        Integer attendanceStatus = courseBookingQueryRequest.getAttendanceStatus();
        queryWrapper.eq(scheduleId != null, "schedule_id", scheduleId);
        queryWrapper.eq(memberId != null, "member_id", memberId);
        queryWrapper.eq(bookingStatus != null, "booking_status", bookingStatus);
        queryWrapper.eq(attendanceStatus != null, "attendance_status", attendanceStatus);
        queryWrapper.eq("is_delete", 0);
        return queryWrapper;
    }

    @Override
    public CourseBookingVO getCourseBookingVO(CourseBooking courseBooking) {
        if (courseBooking == null) {
            return null;
        }
        CourseBookingVO vo = new CourseBookingVO();
        // 只复制实体中与 VO 类匹配的字段
        BeanUtils.copyProperties(courseBooking, vo);
        return vo;
    }

    @Override
    public List<CourseBookingVO> getCourseBookingVOList(List<CourseBooking> courseBookingList) {
        return courseBookingList.stream().map(this::getCourseBookingVO).collect(Collectors.toList());
    }

    @Override
    public Page<CourseBookingVO> getCourseBookingVOPage(Page<CourseBooking> courseBookingPage) {
        Page<CourseBookingVO> voPage = new Page<>(courseBookingPage.getCurrent(), courseBookingPage.getSize(), courseBookingPage.getTotal());
        voPage.setRecords(getCourseBookingVOList(courseBookingPage.getRecords()));
        return voPage;
    }

    @Override
    public boolean updateAttendanceStatus(Long bookingId, Integer attendanceStatus) {
        CourseBooking courseBooking = new CourseBooking();
        courseBooking.setBookingId(bookingId);
        courseBooking.setAttendanceStatus(attendanceStatus);
        courseBooking.setUpdateTime(new Date());
        return updateById(courseBooking);
    }
}