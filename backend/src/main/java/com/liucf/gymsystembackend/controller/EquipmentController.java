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
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentAddRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentQueryRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Equipment;
import com.liucf.gymsystembackend.model.vo.EquipmentVO;
import com.liucf.gymsystembackend.service.EquipmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 器材接口
 */
@RestController
@RequestMapping("/equipment")
@Slf4j
public class EquipmentController {

    @Resource
    private EquipmentService equipmentService;

    /**
     * 创建器材（仅管理员）
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Long> addEquipment(@RequestBody EquipmentAddRequest equipmentAddRequest) {
        ThrowUtils.throwIf(equipmentAddRequest == null, ErrorCode.PARAMS_ERROR);
        Equipment equipment = new Equipment();
        BeanUtils.copyProperties(equipmentAddRequest, equipment);
        boolean result = equipmentService.addEquipment(equipment);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(equipment.getEqId());
    }

    /**
     * 根据 id 获取器材（仅管理员）
     */
    @GetMapping("/get")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Equipment> getEquipmentById(long eqId) {
        ThrowUtils.throwIf(eqId <= 0, ErrorCode.PARAMS_ERROR);
        Equipment equipment = equipmentService.getById(eqId);
        ThrowUtils.throwIf(equipment == null, ErrorCode.NOT_FOUND_ERROR);
        return ResultUtils.success(equipment);
    }

    /**
     * 根据 id 获取脱敏的器材信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<EquipmentVO> getEquipmentVOById(long eqId) {
        BaseResponse<Equipment> response = getEquipmentById(eqId);
        Equipment equipment = response.getData();
        return ResultUtils.success(equipmentService.getEquipmentVO(equipment));
    }

    /**
     * 删除器材（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteEquipment(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getEqId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = equipmentService.deleteEquipment(deleteRequest.getEqId());
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "删除器材失败");
        }
        return ResultUtils.success(true);
    }

    /**
     * 更新器材（仅管理员）
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateEquipment(@RequestBody EquipmentUpdateRequest equipmentUpdateRequest) {
        if (equipmentUpdateRequest == null || equipmentUpdateRequest.getEqId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Equipment equipment = new Equipment();
        BeanUtils.copyProperties(equipmentUpdateRequest, equipment);
        boolean result = equipmentService.updateEquipment(equipment);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 分页获取器材列表（仅管理员）
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<EquipmentVO>> listEquipmentVOByPage(@RequestBody EquipmentQueryRequest equipmentQueryRequest) {
        ThrowUtils.throwIf(equipmentQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = equipmentQueryRequest.getCurrent();
        long pageSize = equipmentQueryRequest.getPageSize();
        Page<Equipment> equipmentPage = equipmentService.page(new Page<>(current, pageSize),
                equipmentService.getQueryWrapper(equipmentQueryRequest));
        Page<EquipmentVO> equipmentVOPage = new Page<>(current, pageSize, equipmentPage.getTotal());
        List<EquipmentVO> equipmentVOList = equipmentService.getEquipmentVOList(equipmentPage.getRecords());
        equipmentVOPage.setRecords(equipmentVOList);
        return ResultUtils.success(equipmentVOPage);
    }
} 