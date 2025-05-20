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
import com.liucf.gymsystembackend.model.entity.Course;
import com.liucf.gymsystembackend.model.vo.CourseBookingVO;
import com.liucf.gymsystembackend.service.CourseBookingService;
import com.liucf.gymsystembackend.service.CourseScheduleService;
import com.liucf.gymsystembackend.service.CourseService;
import com.liucf.gymsystembackend.service.MembersService;
import com.liucf.gymsystembackend.mapper.CourseBookingMapper;
import com.liucf.gymsystembackend.model.dto.course.CourseBookingAddRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CourseBookingServiceImpl extends ServiceImpl<CourseBookingMapper, CourseBooking>
        implements CourseBookingService {

    @Resource
    private CourseScheduleService courseScheduleService;

    @Resource
    private MembersService membersService;

    @Resource
    private CourseService courseService;

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
        BeanUtils.copyProperties(courseBooking, vo);

        // 填充会员信息
        if (courseBooking.getMemberId() != null) {
            Members member = membersService.getById(courseBooking.getMemberId());
            if (member != null) {
                vo.setMemberName(member.getMemberName());
            }
        }

        // 填充课程排期及课程信息
        if (courseBooking.getScheduleId() != null) {
            CourseSchedule schedule = courseScheduleService.getById(courseBooking.getScheduleId());
            if (schedule != null) {
                vo.setCourseDate(schedule.getStartTime()); // 通常排期的 startTime 就代表了课程日期
                SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
                if (schedule.getStartTime() != null) {
                    vo.setStartTime(timeFormat.format(schedule.getStartTime()));
                }
                if (schedule.getEndTime() != null) {
                    vo.setEndTime(timeFormat.format(schedule.getEndTime()));
                }
                vo.setLocation(schedule.getRoomNumber());

                if (schedule.getCourseId() != null) {
                    Course course = courseService.getById(schedule.getCourseId());
                    if (course != null) {
                        vo.setCourseName(course.getCourseName());
                    }
                }
            }
        }
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

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean cancelMemberBooking(Long bookingId, Long memberId) {
        // 1. 获取并校验预约记录
        CourseBooking courseBooking = this.getById(bookingId);
        if (courseBooking == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "预约记录不存在");
        }
        if (!courseBooking.getMemberId().equals(memberId)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "无权限取消他人预约");
        }
        // 假设 1 表示 "已预约"，0 表示 "已取消"
        if (courseBooking.getBookingStatus() == null || courseBooking.getBookingStatus() != 1) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该预约状态无法取消");
        }

        // 2. 更新预约状态为 "已取消"
        courseBooking.setBookingStatus(0); // 0 代表 "已取消"
        courseBooking.setUpdateTime(new Date());
        boolean updateBookingResult = this.updateById(courseBooking);
        if (!updateBookingResult) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "取消预约失败");
        }

        // 3. 更新课程排期的参与人数和状态
        CourseSchedule courseSchedule = courseScheduleService.getById(courseBooking.getScheduleId());
        if (courseSchedule != null) {
            // 只有当排期不是已取消状态 (status != 0) 时才更新人数
            // 并且当前参与人数大于0
            if (courseSchedule.getStatus() != null && courseSchedule.getStatus() != 0 && courseSchedule.getCurrentParticipants() != null && courseSchedule.getCurrentParticipants() > 0) {
                int currentParticipants = courseSchedule.getCurrentParticipants() - 1;
                courseSchedule.setCurrentParticipants(currentParticipants);

                // 如果之前是已满状态 (status = 2)，并且现在有空位了，则改回可预约状态 (status = 1)
                if (courseSchedule.getStatus() == 2 && currentParticipants < courseSchedule.getMaxParticipants()) {
                    courseSchedule.setStatus(1); // 1 代表 "可预约"
                }
                boolean updateScheduleResult = courseScheduleService.updateById(courseSchedule);
                if (!updateScheduleResult) {
                    // 此处可以记录日志，但主要操作是取消预约，排期更新失败不应阻塞主流程或可考虑补偿事务
                    log.error("取消预约后，更新课程排期参与人数失败。排期ID: {}, 预约ID: {}. 可能需要手动处理数据一致性问题。");
                    // 根据业务决定是否抛出异常，如果需要强一致性
                    // throw new BusinessException(ErrorCode.SYSTEM_ERROR, "更新排期人数失败，请重试");
                }
            }
        } else {
            // 排期不存在，记录日志，但这不应该发生如果预约有效
            log.warn("尝试取消预约时，未找到关联的课程排期。预约ID: {}, 排期ID: {}");
        }
        return true;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long processBookingRequest(CourseBookingAddRequest courseBookingAddRequest) {
        Long scheduleId = courseBookingAddRequest.getScheduleId();
        Long memberId = courseBookingAddRequest.getMemberId();

        // 1. 参数基本校验
        if (scheduleId == null || scheduleId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "排期ID无效");
        }
        if (memberId == null || memberId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会员ID无效");
        }

        // 2. 获取并检查课程排期 (Pessimistic Lock or check version if high concurrency)
        // For now, simple get will suffice, assuming optimistic concurrency or transactions handle it
        CourseSchedule courseSchedule = courseScheduleService.getById(scheduleId);
        if (courseSchedule == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "指定的课程排期不存在");
        }

        // 3. 检查排期状态是否可预约 (e.g., status 1 = 可预约)
        if (courseSchedule.getStatus() == null || courseSchedule.getStatus() != 1) {
            if (courseSchedule.getStatus() == 0) {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "该课程排期已取消，无法预约");
            } else if (courseSchedule.getStatus() == 2) {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "该课程排期人数已满，无法预约");
            } else {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "该课程排期当前状态不可预约");
            }
        }

        // 4. 检查当前参与人数是否已达最大参与人数
        Integer currentParticipants = courseSchedule.getCurrentParticipants() == null ? 0 : courseSchedule.getCurrentParticipants();
        Integer maxParticipants = courseSchedule.getMaxParticipants() == null ? 0 : courseSchedule.getMaxParticipants();
        if (currentParticipants >= maxParticipants) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "课程预约人数已满");
        }

        // 5. 查找用户针对该排期的现有预约记录
        QueryWrapper<CourseBooking> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("member_id", memberId);
        queryWrapper.eq("schedule_id", scheduleId);
        // 先不限定状态，查出所有相关记录
        List<CourseBooking> existingBookings = this.list(queryWrapper);

        CourseBooking bookingToProcess = null;
        boolean isReBookingCancelled = false;

        for (CourseBooking existingBooking : existingBookings) {
            if (existingBooking.getBookingStatus() != null) {
                if (existingBooking.getBookingStatus() == 1) { // 状态为 "已预约"
                    throw new BusinessException(ErrorCode.OPERATION_ERROR, "您已预约过该课程，无需重复预约");
                }
                if (existingBooking.getBookingStatus() == 0) { // 状态为 "已取消"
                    bookingToProcess = existingBooking;
                    isReBookingCancelled = true;
                    break; // 优先处理已取消的记录
                }
                // 其他状态 (如已完成) 暂不影响新的预约，会走到创建新纪录的逻辑（如果需要其他处理，在这里加分支）
            }
        }

        Date currentTime = new Date();

        if (isReBookingCancelled && bookingToProcess != null) {
            // 5.1 重新预约已取消的记录
            bookingToProcess.setBookingStatus(1); // 更新为 "已预约"
            bookingToProcess.setAttendanceStatus(0); // 重置为 "未到"
            // bookingToProcess.setCreateTime(currentTime); // 通常createTime不变，更新updateTime
            bookingToProcess.setUpdateTime(currentTime);
            boolean updateResult = this.updateById(bookingToProcess);
            if (!updateResult) {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "重新预约失败，请重试");
            }
        } else {
            // 5.2 创建新的预约记录
            bookingToProcess = new CourseBooking();
            BeanUtils.copyProperties(courseBookingAddRequest, bookingToProcess);
            bookingToProcess.setBookingStatus(1); // "已预约"
            bookingToProcess.setAttendanceStatus(0); // "未到"
            bookingToProcess.setCreateTime(currentTime);
            bookingToProcess.setUpdateTime(currentTime);
            // is_delete 默认为0，由MyBatis Plus的TableLogic处理或实体类默认值处理

            boolean saveResult = this.save(bookingToProcess);
            if (!saveResult) {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "创建课程预约失败");
            }
        }

        // 6. 更新课程排期的当前参与人数 (无论是新建还是重新预约成功)
        // 重新获取一次排期信息，以防并发导致 currentParticipants 不准确，或者依赖事务的隔离级别
        // 但更稳妥的方式是直接在原对象上操作，然后更新
        courseSchedule.setCurrentParticipants(currentParticipants + 1); // currentParticipants 是上面从schedule读出来的，现在加1
        if (courseSchedule.getCurrentParticipants() >= courseSchedule.getMaxParticipants()) {
            courseSchedule.setStatus(2); // 更新为 "已满"
        }

        boolean updateScheduleResult = courseScheduleService.updateById(courseSchedule);
        if (!updateScheduleResult) {
            log.error("更新课程排期参与人数失败。排期ID: {}, 预约ID: {}. 可能需要手动处理数据一致性问题。",
                    scheduleId, bookingToProcess.getBookingId());
            // 根据业务决定是否回滚。如果预约已成功，但排期更新失败，通常需要事务回滚
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "更新排期人数失败，请稍后重试或联系管理员");
        }

        return bookingToProcess.getBookingId();
    }
}