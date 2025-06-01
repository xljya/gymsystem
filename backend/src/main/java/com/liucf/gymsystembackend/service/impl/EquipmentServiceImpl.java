package com.liucf.gymsystembackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.EquipmentCategoryMapper;
import com.liucf.gymsystembackend.mapper.EquipmentMapper;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentAddRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentQueryRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Equipment;
import com.liucf.gymsystembackend.model.entity.EquipmentCategory;
import com.liucf.gymsystembackend.model.vo.EquipmentVO;
import com.liucf.gymsystembackend.service.EquipmentService;
import com.liucf.gymsystembackend.service.MembersService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EquipmentServiceImpl extends ServiceImpl<EquipmentMapper, Equipment>
        implements EquipmentService {

    @Resource
    private MembersService membersService;

    @Resource
    private EquipmentCategoryMapper equipmentCategoryMapper;
    
    private static final int MAX_PAGE_SIZE = 50;

    @Override
    public void validEquipment(Equipment equipment, boolean add) {
        if (equipment == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if (StringUtils.isBlank(equipment.getEqName())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "器械名称不能为空");
        }
        if (equipment.getEqcategoryId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "器械分类ID不能为空");
        }
        EquipmentCategory equipmentCategory = equipmentCategoryMapper.selectById(equipment.getEqcategoryId());
        if (equipmentCategory == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "指定的器械分类不存在");
        }
        if (StringUtils.isNotBlank(equipment.getEqName())) {
            QueryWrapper<Equipment> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("eq_name", equipment.getEqName());
            queryWrapper.eq("is_delete", 0);
            if (!add && equipment.getEqId() != null) {
                queryWrapper.ne("eq_id", equipment.getEqId());
            }
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "器械名称已存在");
            }
        }
    }

    @Override
    @Transactional
    public Long addEquipment(EquipmentAddRequest equipmentAddRequest) {
        if (equipmentAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Equipment equipment = new Equipment();
        BeanUtils.copyProperties(equipmentAddRequest, equipment);
        equipment.setEqId(null); // 新增时确保ID为null以自增
        validEquipment(equipment, true);
        equipment.setIsDelete(0);
        boolean saveResult = this.save(equipment);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "添加器械失败");
        }
        return equipment.getEqId();
    }

    @Override
    @Transactional
    public boolean deleteEquipment(Long eqId) {
        if (eqId == null || eqId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "器械ID无效");
        }
        Equipment equipment = this.getById(eqId);
        if (equipment == null || equipment.getIsDelete() == 1) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "器械不存在或已被删除");
        }
        return this.removeById(eqId);
    }

    @Override
    @Transactional
    public boolean updateEquipment(EquipmentUpdateRequest equipmentUpdateRequest) {
        if (equipmentUpdateRequest == null || equipmentUpdateRequest.getEqId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Equipment equipment = new Equipment();
        BeanUtils.copyProperties(equipmentUpdateRequest, equipment);
        Equipment oldEquipment = this.getById(equipment.getEqId());
        if (oldEquipment == null || oldEquipment.getIsDelete() == 1) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "待更新的器械不存在或已被删除");
        }
        validEquipment(equipment, false);
        return this.updateById(equipment);
    }

    @Override
    public EquipmentVO getEquipmentVOById(Long eqId, HttpServletRequest request) {
        Equipment equipment = this.getById(eqId);
        if (equipment == null || equipment.getIsDelete() == 1) {
            return null;
        }
        return getEquipmentVO(equipment);
    }

    @Override
    public List<EquipmentVO> getEquipmentVOList(List<Equipment> equipmentList) {
        if (equipmentList == null || equipmentList.isEmpty()) {
            return new ArrayList<>();
        }
        return equipmentList.stream()
                .map(this::getEquipmentVO)
                .collect(Collectors.toList());
    }

    @Override
    public IPage<EquipmentVO> getEquipmentVOPage(EquipmentQueryRequest equipmentQueryRequest, HttpServletRequest request) {
        long current = equipmentQueryRequest.getCurrent();
        long size = equipmentQueryRequest.getPageSize();
        if (size > MAX_PAGE_SIZE) {
            size = MAX_PAGE_SIZE;
        }
        Page<Equipment> equipmentPage = this.page(new Page<>(current, size),
                this.getQueryWrapper(equipmentQueryRequest));
        
        Page<EquipmentVO> voPage = new Page<>(current, size, equipmentPage.getTotal());
        List<EquipmentVO> voList = equipmentPage.getRecords().stream()
            .map(this::getEquipmentVO)
            .collect(Collectors.toList());
        voPage.setRecords(voList);
        return voPage;
    }

    @Override
    public QueryWrapper<Equipment> getQueryWrapper(EquipmentQueryRequest equipmentQueryRequest) {
        if (equipmentQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        QueryWrapper<Equipment> queryWrapper = new QueryWrapper<>();
        Long eqId = equipmentQueryRequest.getEqId();
        String eqName = equipmentQueryRequest.getEqName();
        Long eqcategoryId = equipmentQueryRequest.getEqcategoryId();
        Integer featured = equipmentQueryRequest.getFeatured();
        // Integer isDelete = equipmentQueryRequest.getIsDelete(); // DTO中没有此字段，先注释

        queryWrapper.eq(eqId != null, "eq_id", eqId);
        queryWrapper.like(StringUtils.isNotBlank(eqName), "eq_name", eqName);
        queryWrapper.eq(eqcategoryId != null, "eqcategory_id", eqcategoryId);
        queryWrapper.eq(featured != null, "featured", featured);
        queryWrapper.eq("is_delete", 0); // 默认查未删除
        return queryWrapper;
    }

    @Override
    public EquipmentVO getEquipmentVO(Equipment equipment) {
        if (equipment == null) {
            return null;
        }
        EquipmentVO equipmentVO = new EquipmentVO();
        BeanUtils.copyProperties(equipment, equipmentVO);
        if (equipment.getEqcategoryId() != null) {
            EquipmentCategory category = equipmentCategoryMapper.selectById(equipment.getEqcategoryId());
            if (category != null) {
                equipmentVO.setCategoryName(category.getCategoryName());
            }
        }
        return equipmentVO;
    }
}




