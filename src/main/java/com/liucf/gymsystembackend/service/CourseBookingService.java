package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.liucf.gymsystembackend.model.dto.course.CourseBookingQueryRequest;
import com.liucf.gymsystembackend.model.entity.CourseBooking;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.vo.CourseBookingVO;
import com.liucf.gymsystembackend.model.dto.course.CourseBookingAddRequest;

import java.util.Date;
import java.util.List;

/**
* @author yueyue
* @description 针对表【course_booking(课程预约表)】的数据库操作Service
* @createDate 2025-04-30 18:56:05
*/
public interface CourseBookingService extends IService<CourseBooking> {

    /**
     * 创建课程预约
     *
     * @param memberId 会员ID
     * @param scheduleId 排期ID
     * @return 是否预约成功
     */
    boolean createBooking(Long memberId, Long scheduleId);



    /**
     * 检查会员是否已预约该课程
     *
     * @param memberId 会员ID
     * @param scheduleId 排期ID
     * @return 是否已预约
     */
    boolean isBooked(Long memberId, Long scheduleId);

    /**
     * 获取会员的课程预约列表
     *
     * @param memberId 会员ID
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 预约列表
     */
    List<CourseBooking> getMemberBookings(Long memberId, Date startTime, Date endTime);
    /**
     * 获取查询条件
     */
    QueryWrapper<CourseBooking> getQueryWrapper(CourseBookingQueryRequest courseBookingQueryRequest);

    /**
     * 获取课程预约VO
     */
    CourseBookingVO getCourseBookingVO(CourseBooking courseBooking);

    /**
     * 获取课程预约VO列表
     */
    List<CourseBookingVO> getCourseBookingVOList(List<CourseBooking> courseBookingList);

    /**
     * 获取课程预约VO分页
     */
    Page<CourseBookingVO> getCourseBookingVOPage(Page<CourseBooking> courseBookingPage);

    /**
     * 更新出勤状态
     */
    boolean updateAttendanceStatus(Long bookingId, Integer attendanceStatus);

    /**
     * 会员取消自己的预约
     *
     * @param bookingId 预约ID
     * @param memberId 会员ID
     * @return 是否成功取消
     */
    boolean cancelMemberBooking(Long bookingId, Long memberId);

    /**
     * 处理课程预约请求（新建或更新已取消的预约）
     *
     * @param courseBookingAddRequest 预约请求参数
     * @return 预约记录ID
     */
    Long processBookingRequest(CourseBookingAddRequest courseBookingAddRequest);
}
