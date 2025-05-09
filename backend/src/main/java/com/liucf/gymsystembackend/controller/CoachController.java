package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.liucf.gymsystembackend.annotation.AuthCheck;
import com.liucf.gymsystembackend.common.BaseResponse;
import com.liucf.gymsystembackend.common.DeleteRequest;
import com.liucf.gymsystembackend.common.ResultUtils;
import com.liucf.gymsystembackend.constant.MemberConstant;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.exception.ThrowUtils;
import com.liucf.gymsystembackend.model.dto.coach.CoachAddRequest;
import com.liucf.gymsystembackend.model.dto.coach.CoachQueryRequest;
import com.liucf.gymsystembackend.model.dto.coach.CoachRegisterRequest;
import com.liucf.gymsystembackend.model.dto.coach.CoachUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Coach;
import com.liucf.gymsystembackend.model.vo.CoachVO;
import com.liucf.gymsystembackend.service.CoachService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * 教练接口
 */
@RestController
@RequestMapping("/coach")
@Slf4j
public class CoachController {

    @Resource
    private CoachService coachService;

    /**
     * 创建教练（仅管理员）
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Long> addCoach(@RequestBody CoachAddRequest coachAddRequest) {
        ThrowUtils.throwIf(coachAddRequest == null, ErrorCode.PARAMS_ERROR);
        Coach coach = new Coach();
        BeanUtils.copyProperties(coachAddRequest, coach);
        // 设置默认状态为在职
        coach.setCoachStatus(0);
        boolean result = coachService.save(coach);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(coach.getCoachId());
    }

    /**
     * 根据 id 获取教练（仅管理员）
     */
    @GetMapping("/get")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Coach> getCoachById(long coachId) {
        ThrowUtils.throwIf(coachId <= 0, ErrorCode.PARAMS_ERROR);
        Coach coach = coachService.getById(coachId);
        ThrowUtils.throwIf(coach == null, ErrorCode.NOT_FOUND_ERROR);
        return ResultUtils.success(coach);
    }

    /**
     * 根据 id 获取脱敏的教练信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<CoachVO> getCoachVOById(long coachId) {
        BaseResponse<Coach> response = getCoachById(coachId);
        Coach coach = response.getData();
        return ResultUtils.success(coachService.getCoachVO(coach));
    }

    /**
     * 删除教练（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteCoach(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = coachService.removeById(deleteRequest.getId());
        return ResultUtils.success(b);
    }

    /**
     * 更新教练（仅管理员）
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateCoach(@RequestBody CoachUpdateRequest coachUpdateRequest) {
        if (coachUpdateRequest == null || coachUpdateRequest.getCoachId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Coach coach = new Coach();
        BeanUtils.copyProperties(coachUpdateRequest, coach);
        boolean result = coachService.updateById(coach);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 分页获取教练列表（仅管理员）
     */
    @PostMapping("/list/page/vo")
//    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<CoachVO>> listCoachVOByPage(@RequestBody CoachQueryRequest coachQueryRequest) {
        ThrowUtils.throwIf(coachQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = coachQueryRequest.getCurrent();
        long pageSize = coachQueryRequest.getPageSize();
        Page<Coach> coachPage = coachService.page(new Page<>(current, pageSize),
                coachService.getQueryWrapper(coachQueryRequest));
        Page<CoachVO> coachVOPage = new Page<>(current, pageSize, coachPage.getTotal());
        List<CoachVO> coachVOList = coachService.getCoachVOList(coachPage.getRecords());
        coachVOPage.setRecords(coachVOList);
        return ResultUtils.success(coachVOPage);
    }

    /**
     * 教练注册
     */
    @PostMapping("/register")
    public BaseResponse<Long> coachRegister(@RequestBody CoachRegisterRequest coachRegisterRequest) {
        if (coachRegisterRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String coachAccount = coachRegisterRequest.getCoachAccount();
        String coachName = coachRegisterRequest.getCoachName();
        String coachAvatar = coachRegisterRequest.getCoachAvatar();
        Integer gender = coachRegisterRequest.getGender();
        Integer coachAge = coachRegisterRequest.getCoachAge();
        Date entryDate = coachRegisterRequest.getEntryDate();
        String courseType = coachRegisterRequest.getCourseType();
        String coachSalary = coachRegisterRequest.getCoachSalary();
        String coachAddress = coachRegisterRequest.getCoachAddress();

        long result = coachService.coachRegister(coachAccount, coachName, coachAvatar, gender,
                coachAge, entryDate, courseType, coachSalary, coachAddress);
        return ResultUtils.success(result);
    }
} 