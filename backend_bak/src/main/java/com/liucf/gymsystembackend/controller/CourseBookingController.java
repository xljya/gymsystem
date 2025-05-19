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
import com.liucf.gymsystembackend.model.dto.course.CourseBookingAddRequest;
import com.liucf.gymsystembackend.model.dto.course.CourseBookingQueryRequest;
import com.liucf.gymsystembackend.model.dto.course.CourseBookingUpdateRequest;
import com.liucf.gymsystembackend.model.entity.CourseBooking;
import com.liucf.gymsystembackend.model.vo.CourseBookingVO;
import com.liucf.gymsystembackend.service.CourseBookingService;
import com.liucf.gymsystembackend.model.entity.CourseSchedule;
import com.liucf.gymsystembackend.service.CourseScheduleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * 课程预约接口
 */
@RestController
@RequestMapping("/course/booking")
@Slf4j
public class CourseBookingController {

    @Resource
    private CourseBookingService courseBookingService;

    @Resource
    private CourseScheduleService courseScheduleService;

    /**
     * 预约课程
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<Long> addBooking(@RequestBody CourseBookingAddRequest courseBookingAddRequest) {
        ThrowUtils.throwIf(courseBookingAddRequest == null, ErrorCode.PARAMS_ERROR);
        Long scheduleId = courseBookingAddRequest.getScheduleId();
        Long memberId = courseBookingAddRequest.getMemberId();

        ThrowUtils.throwIf(scheduleId == null || scheduleId <= 0, ErrorCode.PARAMS_ERROR, "排期ID无效");
        ThrowUtils.throwIf(memberId == null || memberId <= 0, ErrorCode.PARAMS_ERROR, "会员ID无效");

        // 1. 获取并检查课程排期
        CourseSchedule courseSchedule = courseScheduleService.getById(scheduleId);
        ThrowUtils.throwIf(courseSchedule == null, ErrorCode.NOT_FOUND_ERROR, "指定的课程排期不存在");

        // 检查排期状态是否可预约 (例如, status 为 1 代表可预约)
        // 您可以根据您的业务逻辑调整这里的状态码
        if (courseSchedule.getStatus() != null && courseSchedule.getStatus() != 1) {
            // 假设状态 0-已取消, 1-可预约, 2-已满
            if (courseSchedule.getStatus() == 0) {
                 throw new BusinessException(ErrorCode.OPERATION_ERROR, "该课程排期已取消，无法预约");
            } else if (courseSchedule.getStatus() == 2) {
                 throw new BusinessException(ErrorCode.OPERATION_ERROR, "该课程排期人数已满，无法预约");
            } else {
                 throw new BusinessException(ErrorCode.OPERATION_ERROR, "该课程排期当前状态不可预约");
            }
        }
        
        // 检查当前参与人数是否已达最大参与人数
        Integer currentParticipants = courseSchedule.getCurrentParticipants() == null ? 0 : courseSchedule.getCurrentParticipants();
        Integer maxParticipants = courseSchedule.getMaxParticipants() == null ? 0 : courseSchedule.getMaxParticipants();
        if (currentParticipants >= maxParticipants) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "课程预约人数已满");
        }

        // 新增：检查用户是否已预约该排期 (状态为已预约)
        // 假设 booking_status = 1 代表 "已预约"
        QueryWrapper<CourseBooking> existingBookingQuery = new QueryWrapper<>();
        existingBookingQuery.eq("member_id", memberId);
        existingBookingQuery.eq("schedule_id", scheduleId);
        existingBookingQuery.eq("booking_status", 1); // 检查是否已存在状态为 "已预约" 的记录
        long count = courseBookingService.count(existingBookingQuery);
        if (count > 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "您已预约过该课程，无需重复预约");
        }

        // 2. 创建预约记录
        CourseBooking booking = new CourseBooking();
        BeanUtils.copyProperties(courseBookingAddRequest, booking);
        // 强制设置预约状态为"已预约"，防止请求中传入其他状态
        booking.setBookingStatus(1); // 假设 1 代表 "已预约"
        // attendanceStatus 在预约时也应该有默认值，0 代表"未到"
         booking.setAttendanceStatus(0);

        boolean result = courseBookingService.save(booking);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "创建课程预约失败");

        // 3. 更新课程排期的当前参与人数
        courseSchedule.setCurrentParticipants(currentParticipants + 1);

        // 如果更新后人数达到上限，可以考虑更新排期状态为"已满"
         if (courseSchedule.getCurrentParticipants() >= courseSchedule.getMaxParticipants()) {
             courseSchedule.setStatus(2);
         }

        boolean updateScheduleResult = courseScheduleService.updateById(courseSchedule);
        if (!updateScheduleResult) {
            // 日志记录更新失败的情况
            log.error("更新课程排期参与人数失败。排期ID: {}, 预约ID: {}. 可能需要手动处理数据一致性问题。",
                    scheduleId, booking.getBookingId());
            // 即使排期人数更新失败，预约本身已创建成功。根据业务决定是否需要回滚预约或抛出更严重的错误。
            // 此处仅记录错误，并让预约成功。如果需要强一致性，应抛出异常并处理事务。
            // ThrowUtils.throwIf(true, ErrorCode.SYSTEM_ERROR, "更新排期人数失败，请稍后重试或联系管理员");
        }
        return ResultUtils.success(booking.getBookingId());
    }
    /**
     * 删除预约
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteBooking(@RequestBody DeleteRequest deleteRequest) {
        ThrowUtils.throwIf(deleteRequest == null || deleteRequest.getId() <= 0, ErrorCode.PARAMS_ERROR);
        boolean result = courseBookingService.removeById(deleteRequest.getId());
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(result);
    }

    /**
     * 更新（仅管理员）
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateBooking(@RequestBody CourseBookingUpdateRequest courseBookingUpdateRequest) {
        ThrowUtils.throwIf(courseBookingUpdateRequest == null || courseBookingUpdateRequest.getBookingId() == null, ErrorCode.PARAMS_ERROR);
        CourseBooking courseBooking = new CourseBooking();
        BeanUtils.copyProperties(courseBookingUpdateRequest, courseBooking);
        boolean result = courseBookingService.updateById(courseBooking);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 分页获取预约记录（仅管理员）
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<CourseBookingVO>> listBookingVOByPage(
            @RequestBody CourseBookingQueryRequest courseBookingQueryRequest) {
        ThrowUtils.throwIf(courseBookingQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = courseBookingQueryRequest.getCurrent();
        long pageSize = courseBookingQueryRequest.getPageSize();
        Page<CourseBooking> courseBookingPage = courseBookingService.page(
                new Page<>(current, pageSize),
                courseBookingService.getQueryWrapper(courseBookingQueryRequest)
        );
        // 手动映射分页到VO分页
        Page<CourseBookingVO> voPage = new Page<>(current, pageSize, courseBookingPage.getTotal());
        voPage.setRecords(courseBookingService.getCourseBookingVOList(courseBookingPage.getRecords()));
        return ResultUtils.success(voPage);
    }

/*    *//**
     * 获取我的预约记录
     *//*
    @GetMapping("/list/my")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<List<CourseBookingVO>> listMyBookings(@RequestParam Long memberId) {
        ThrowUtils.throwIf(memberId == null || memberId <= 0, ErrorCode.PARAMS_ERROR);
        List<CourseBooking> bookingList = courseBookingService.getMemberBookings(memberId, null, null);
        return ResultUtils.success(courseBookingService.getCourseBookingVOList(bookingList));
    }*/
}