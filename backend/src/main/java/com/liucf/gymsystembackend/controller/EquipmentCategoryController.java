package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.liucf.gymsystembackend.annotation.AuthCheck;
import com.liucf.gymsystembackend.common.BaseResponse;
import com.liucf.gymsystembackend.common.DeleteRequest;
import com.liucf.gymsystembackend.common.ResultUtils;
import com.liucf.gymsystembackend.constant.MemberConstant;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.exception.ThrowUtils;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryAddRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryQueryRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryUpdateRequest;
import com.liucf.gymsystembackend.model.vo.EquipmentCategoryVO;
import com.liucf.gymsystembackend.service.EquipmentCategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 器械分类接口
 */
@RestController
@RequestMapping("/equipment/category")
@Slf4j
public class EquipmentCategoryController {

    @Resource
    private EquipmentCategoryService equipmentCategoryService;

    /**
     * 新增器械分类
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Long> addEquipmentCategory(@RequestBody EquipmentCategoryAddRequest equipmentCategoryAddRequest) {
        if (equipmentCategoryAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long newCategoryId = equipmentCategoryService.addEquipmentCategory(equipmentCategoryAddRequest);
        return ResultUtils.success(newCategoryId);
    }

    /**
     * 删除器械分类
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteEquipmentCategory(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = equipmentCategoryService.deleteEquipmentCategory(deleteRequest.getId());
        return ResultUtils.success(result);
    }

    /**
     * 更新器械分类
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateEquipmentCategory(@RequestBody EquipmentCategoryUpdateRequest equipmentCategoryUpdateRequest) {
        if (equipmentCategoryUpdateRequest == null || equipmentCategoryUpdateRequest.getEqcategoryId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = equipmentCategoryService.updateEquipmentCategory(equipmentCategoryUpdateRequest);
        return ResultUtils.success(result);
    }

    /**
     * 根据id获取器械分类（VO）
     */
    @GetMapping("/get/vo")
    public BaseResponse<EquipmentCategoryVO> getEquipmentCategoryVOById(long id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        EquipmentCategoryVO vo = equipmentCategoryService.getEquipmentCategoryVOById(id);
        ThrowUtils.throwIf(vo == null, ErrorCode.NOT_FOUND_ERROR, "器械分类不存在");
        return ResultUtils.success(vo);
    }

    /**
     * 分页获取器械分类（VO）
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<IPage<EquipmentCategoryVO>> listEquipmentCategoryVOByPage(@RequestBody EquipmentCategoryQueryRequest equipmentCategoryQueryRequest) {
        if (equipmentCategoryQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        IPage<EquipmentCategoryVO> voPage = equipmentCategoryService.getEquipmentCategoryVOPage(equipmentCategoryQueryRequest);
        return ResultUtils.success(voPage);
    }
} 