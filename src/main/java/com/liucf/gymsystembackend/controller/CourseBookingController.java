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
import com.liucf.gymsystembackend.model.entity.Members;
import com.liucf.gymsystembackend.service.MembersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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

    @Resource
    private MembersService membersService;

    /**
     * 预约课程
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<Long> addBooking(@RequestBody CourseBookingAddRequest courseBookingAddRequest) {
        ThrowUtils.throwIf(courseBookingAddRequest == null, ErrorCode.PARAMS_ERROR);
        // 校验直接在Service层进行，这里只做非空判断
        Long bookingId = courseBookingService.processBookingRequest(courseBookingAddRequest);
        return ResultUtils.success(bookingId);
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
     * 分页获取预约记录
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

    /**
     * 获取我的预约记录 (分页)
     */
    @PostMapping("/list/page/vo/my")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<Page<CourseBookingVO>> listMyBookingVOByPage(
            @RequestBody CourseBookingQueryRequest courseBookingQueryRequest,
            HttpServletRequest request) {
        ThrowUtils.throwIf(courseBookingQueryRequest == null, ErrorCode.PARAMS_ERROR);
        // 获取当前登录会员
        Members loginMember = membersService.getLoginMember(request);
        // 设置查询条件为当前会员
        courseBookingQueryRequest.setMemberId(loginMember.getId());

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

    /**
     * 会员删除自己的预约记录
     */
    @PostMapping("/delete/my")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<Boolean> deleteMyBooking(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(deleteRequest == null || deleteRequest.getId() == null || deleteRequest.getId() <= 0, ErrorCode.PARAMS_ERROR, "预约ID无效");

        Members loginMember = membersService.getLoginMember(request);
        Long bookingId = deleteRequest.getId();

        // 调用服务层处理删除逻辑
        boolean result = courseBookingService.cancelMemberBooking(bookingId, loginMember.getId());
        return ResultUtils.success(result);
    }
}