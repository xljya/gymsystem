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
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseAddRequest;
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseQueryRequest;
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseUpdateRequest;
import com.liucf.gymsystembackend.model.entity.CoursePurchase;
import com.liucf.gymsystembackend.model.vo.CoursePurchaseVO;
import com.liucf.gymsystembackend.service.CoursePurchaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 课程购买记录接口
 */
@RestController
@RequestMapping("/coursePurchase")
@Slf4j
public class CoursePurchaseController {

    @Resource
    private CoursePurchaseService coursePurchaseService;

    /**
     * 创建课程购买记录
     */
    @PostMapping("/add")
    public BaseResponse<Long> addCoursePurchase(@RequestBody CoursePurchaseAddRequest coursePurchaseAddRequest) {
        if (coursePurchaseAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = coursePurchaseService.addCoursePurchase(coursePurchaseAddRequest);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取课程购买记录（仅管理员）
     */
    @GetMapping("/get")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<CoursePurchase> getCoursePurchaseById(long id) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        CoursePurchase coursePurchase = coursePurchaseService.getById(id);
        ThrowUtils.throwIf(coursePurchase == null, ErrorCode.NOT_FOUND_ERROR);
        return ResultUtils.success(coursePurchase);
    }

    /**
     * 根据 id 获取脱敏的课程购买记录信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<CoursePurchaseVO> getCoursePurchaseVOById(long id) {
        BaseResponse<CoursePurchase> response = getCoursePurchaseById(id);
        CoursePurchase coursePurchase = response.getData();
        return ResultUtils.success(coursePurchaseService.getCoursePurchaseVO(coursePurchase));
    }

    /**
     * 删除课程购买记录（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteCoursePurchase(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = coursePurchaseService.removeById(deleteRequest.getId());
        return ResultUtils.success(b);
    }

    /**
     * 更新课程购买记录
     */
    @PostMapping("/update")
    public BaseResponse<Boolean> updateCoursePurchase(@RequestBody CoursePurchaseUpdateRequest coursePurchaseUpdateRequest) {
        if (coursePurchaseUpdateRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = coursePurchaseService.updateCoursePurchase(coursePurchaseUpdateRequest);
        return ResultUtils.success(result);
    }

    /**
     * 分页获取课程购买记录列表（仅管理员）
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<CoursePurchaseVO>> listCoursePurchaseVOByPage(@RequestBody CoursePurchaseQueryRequest coursePurchaseQueryRequest) {
        ThrowUtils.throwIf(coursePurchaseQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = coursePurchaseQueryRequest.getCurrent();
        long pageSize = coursePurchaseQueryRequest.getPageSize();
        Page<CoursePurchase> coursePurchasePage = coursePurchaseService.page(new Page<>(current, pageSize),
                coursePurchaseService.getQueryWrapper(coursePurchaseQueryRequest));
        Page<CoursePurchaseVO> coursePurchaseVOPage = new Page<>(current, pageSize, coursePurchasePage.getTotal());
        List<CoursePurchaseVO> coursePurchaseVOList = coursePurchaseService.getCoursePurchaseVOList(coursePurchasePage.getRecords());
        coursePurchaseVOPage.setRecords(coursePurchaseVOList);
        return ResultUtils.success(coursePurchaseVOPage);
    }
} 