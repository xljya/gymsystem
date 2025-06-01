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
import javax.servlet.http.HttpServletRequest;

/**
 * 器械接口
 */
@RestController
@RequestMapping("/equipment")
@Slf4j
public class EquipmentController {

    @Resource
    private EquipmentService equipmentService;

    /**
     * 创建器械（仅管理员）
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Long> addEquipment(@RequestBody EquipmentAddRequest equipmentAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(equipmentAddRequest == null, ErrorCode.PARAMS_ERROR);
        Long newEquipmentId = equipmentService.addEquipment(equipmentAddRequest);
        return ResultUtils.success(newEquipmentId);
    }

    /**
     * 根据 id 获取器械信息
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
     * 根据 id 获取脱敏的器械信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<EquipmentVO> getEquipmentVOById(@RequestParam Long eqId, HttpServletRequest request) {
        ThrowUtils.throwIf(eqId == null || eqId <= 0, ErrorCode.PARAMS_ERROR);
        EquipmentVO equipmentVO = equipmentService.getEquipmentVOById(eqId, request);
        ThrowUtils.throwIf(equipmentVO == null, ErrorCode.NOT_FOUND_ERROR, "器械不存在");
        return ResultUtils.success(equipmentVO);
    }

    /**
     * 删除器械（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteEquipment(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(deleteRequest == null || deleteRequest.getId() == null || deleteRequest.getId() <= 0, ErrorCode.PARAMS_ERROR);
        boolean result = equipmentService.deleteEquipment(deleteRequest.getId());
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "删除器械失败");
        return ResultUtils.success(true);
    }

    /**
     * 更新器械（仅管理员）
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateEquipment(@RequestBody EquipmentUpdateRequest equipmentUpdateRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(equipmentUpdateRequest == null || equipmentUpdateRequest.getEqId() == null, ErrorCode.PARAMS_ERROR);
        boolean result = equipmentService.updateEquipment(equipmentUpdateRequest);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR, "更新器械失败");
        return ResultUtils.success(true);
    }

    /**
     * 分页获取器械列表VO (对所有登录用户开放)
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<IPage<EquipmentVO>> listEquipmentVOByPage(@RequestBody EquipmentQueryRequest equipmentQueryRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(equipmentQueryRequest == null, ErrorCode.PARAMS_ERROR);
        IPage<EquipmentVO> equipmentVOPage = equipmentService.getEquipmentVOPage(equipmentQueryRequest, request);
        return ResultUtils.success(equipmentVOPage);
    }
} 