package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.liucf.gymsystembackend.annotation.AuthCheck;
import com.liucf.gymsystembackend.common.BaseResponse;
import com.liucf.gymsystembackend.common.ResultUtils;
import com.liucf.gymsystembackend.common.DeleteRequest;
import com.liucf.gymsystembackend.constant.MemberConstant;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.exception.ThrowUtils;
import com.liucf.gymsystembackend.model.dto.course.CourseCategoryQueryRequest;
import com.liucf.gymsystembackend.model.dto.course.CourseCategoryAddRequest;
import com.liucf.gymsystembackend.model.dto.course.CourseCategoryUpdateRequest;
import com.liucf.gymsystembackend.model.entity.CourseBooking;
import com.liucf.gymsystembackend.model.entity.CourseCategory;
import com.liucf.gymsystembackend.model.vo.CourseBookingVO;
import com.liucf.gymsystembackend.model.vo.CourseCategoryVO;
import com.liucf.gymsystembackend.service.CourseCategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 课程类别接口
 */
@RestController
@RequestMapping("/course/category")
@Slf4j
public class CourseCategoryController {

    @Resource
    private CourseCategoryService courseCategoryService;

    /**
     * 新增课程类别
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Long> addCategory(@RequestBody CourseCategoryAddRequest addRequest) {
        ThrowUtils.throwIf(addRequest == null || addRequest.getCategoryName() == null || addRequest.getCategoryName().trim().isEmpty(), ErrorCode.PARAMS_ERROR, "类别名称不能为空");
        CourseCategory courseCategory = new CourseCategory();
        BeanUtils.copyProperties(addRequest, courseCategory);
        boolean result = courseCategoryService.save(courseCategory);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(courseCategory.getCategoryId());
    }

    /**
     * 删除课程类别
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteCategory(@RequestBody DeleteRequest deleteRequest) {
        ThrowUtils.throwIf(deleteRequest == null || deleteRequest.getId() == null || deleteRequest.getId() <= 0, ErrorCode.PARAMS_ERROR);
        boolean result = courseCategoryService.removeById(deleteRequest.getId());
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(result);
    }

    /**
     * 更新课程类别
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateCategory(@RequestBody CourseCategoryUpdateRequest updateRequest) {
        ThrowUtils.throwIf(updateRequest == null || updateRequest.getCategoryId() == null || updateRequest.getCategoryId() <= 0, ErrorCode.PARAMS_ERROR);
        CourseCategory courseCategory = new CourseCategory();
        BeanUtils.copyProperties(updateRequest, courseCategory);
        boolean result = courseCategoryService.updateById(courseCategory);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(result);
    }

    /**
     * 分页获取课程类别（VO）
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<CourseCategoryVO>> listCategoryByPage(@RequestBody CourseCategoryQueryRequest queryRequest) {
        ThrowUtils.throwIf(queryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = queryRequest.getCurrent();
        long pageSize = queryRequest.getPageSize();
        Page<CourseCategory> courseCategoryPage = courseCategoryService.page(
                new Page<>(current, pageSize),
                courseCategoryService.getQueryWrapper(queryRequest)
        );
        // 手动映射分页到VO分页
        Page<CourseCategoryVO> voPage = new Page<>(current, pageSize, courseCategoryPage.getTotal());
        voPage.setRecords(courseCategoryService.getCourseCategoryVOList(courseCategoryPage.getRecords()));
        return ResultUtils.success(voPage);
    }


} 