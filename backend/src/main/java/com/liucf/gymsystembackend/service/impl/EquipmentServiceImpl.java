package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentQueryRequest;
import com.liucf.gymsystembackend.model.entity.Equipment;
import com.liucf.gymsystembackend.model.vo.EquipmentVO;
import com.liucf.gymsystembackend.service.EquipmentService;
import com.liucf.gymsystembackend.mapper.EquipmentMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author yueyue
* @description 针对表【equipment(健身房器材设备表)】的数据库操作Service实现
* @createDate 2025-04-09 02:36:38
*/
@Service
public class EquipmentServiceImpl extends ServiceImpl<EquipmentMapper, Equipment>
    implements EquipmentService{

    @Override
    public EquipmentVO getEquipmentVO(Equipment equipment) {
        if (equipment == null) {
            return null;
        }
        EquipmentVO equipmentVO = new EquipmentVO();
        BeanUtils.copyProperties(equipment, equipmentVO);
        return equipmentVO;
    }

    @Override
    public List<EquipmentVO> getEquipmentVOList(List<Equipment> equipmentList) {
        if (equipmentList == null || equipmentList.isEmpty()) {
            return new ArrayList<>();
        }
        return equipmentList.stream().map(this::getEquipmentVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<Equipment> getQueryWrapper(EquipmentQueryRequest equipmentQueryRequest) {
        if (equipmentQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long eqId = equipmentQueryRequest.getEqId();
        String eqName = equipmentQueryRequest.getEqName();

        QueryWrapper<Equipment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(eqId != null, "eq_id", eqId);
        queryWrapper.like(StrUtil.isNotBlank(eqName), "eq_name", eqName);
        queryWrapper.eq("is_delete", 0);
        return queryWrapper;
    }

    @Override
    public boolean addEquipment(Equipment equipment) {
        if (equipment == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        // 校验器材名称和描述
        if (StrUtil.hasBlank(equipment.getEqName(), equipment.getEqText())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "器材名称和描述不能为空");
        }
        // 检查器材名称是否重复
        QueryWrapper<Equipment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("eq_name", equipment.getEqName());
        queryWrapper.eq("is_delete", 0);
        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "器材名称重复");
        }
        // 设置默认状态
        equipment.setIsDelete(0);
        return this.save(equipment);
    }

    @Override
    public boolean updateEquipment(Equipment equipment) {
        if (equipment == null || equipment.getEqId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        // 校验器材名称和描述
        if (StrUtil.hasBlank(equipment.getEqName(), equipment.getEqText())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "器材名称和描述不能为空");
        }
        // 检查器材是否存在
        Equipment oldEquipment = this.getById(equipment.getEqId());
        if (oldEquipment == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "器材不存在");
        }
        // 如果修改了器材名称，检查新名称是否重复
        if (!oldEquipment.getEqName().equals(equipment.getEqName())) {
            QueryWrapper<Equipment> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("eq_name", equipment.getEqName());
            queryWrapper.eq("is_delete", 0);
            queryWrapper.ne("eq_id", equipment.getEqId());
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "器材名称重复");
            }
        }
        return this.updateById(equipment);
    }

    @Override
    public boolean deleteEquipment(Long eqId) {
        if (eqId == null || eqId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "器材ID不能为空");
        }
        // 检查器材是否存在
        Equipment equipment = this.getById(eqId);
        if (equipment == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "器材不存在");
        }
        // 使用 MyBatis-Plus 的逻辑删除功能
        return this.removeById(eqId);
    }
}




