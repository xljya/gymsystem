package com.liucf.gymsystembackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.EquipmentCategoryMapper;
import com.liucf.gymsystembackend.mapper.EquipmentMapper; // 假设存在 EquipmentMapper
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryAddRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryQueryRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryUpdateRequest;
import com.liucf.gymsystembackend.model.entity.EquipmentCategory;
import com.liucf.gymsystembackend.model.entity.Equipment; // 假设存在 Equipment 实体
import com.liucf.gymsystembackend.model.vo.EquipmentCategoryVO;
import com.liucf.gymsystembackend.service.EquipmentCategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.lang3.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 器械分类服务实现
 */
@Service
public class EquipmentCategoryServiceImpl extends ServiceImpl<EquipmentCategoryMapper, EquipmentCategory>
        implements EquipmentCategoryService {

    @Resource
    private EquipmentMapper equipmentMapper; // 注入EquipmentMapper

    @Override
    public void validEquipmentCategory(EquipmentCategory equipmentCategory, boolean add) {
        if (equipmentCategory == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String categoryName = equipmentCategory.getCategoryName();
        if (add) {
            if (StringUtils.isAnyBlank(categoryName)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "分类名称不能为空");
            }
        }
        if (!add && StringUtils.isBlank(categoryName) && StringUtils.isBlank(equipmentCategory.getCategoryDescription())) {
             throw new BusinessException(ErrorCode.PARAMS_ERROR, "更新参数不能都为空");
        }
        if (StringUtils.isNotBlank(categoryName)) {
            QueryWrapper<EquipmentCategory> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("category_name", categoryName);
            if (!add && equipmentCategory.getEqcategoryId() != null) {
                queryWrapper.ne("eqcategory_id", equipmentCategory.getEqcategoryId());
            }
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "器械分类名称已存在");
            }
        }
    }

    @Override
    @Transactional
    public long addEquipmentCategory(EquipmentCategoryAddRequest equipmentCategoryAddRequest) {
        if (equipmentCategoryAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        EquipmentCategory equipmentCategory = new EquipmentCategory();
        BeanUtils.copyProperties(equipmentCategoryAddRequest, equipmentCategory);
        validEquipmentCategory(equipmentCategory, true);
        boolean saveResult = this.save(equipmentCategory);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "添加器械分类失败");
        }
        return equipmentCategory.getEqcategoryId();
    }

    @Override
    @Transactional
    public boolean deleteEquipmentCategory(long id) {
        EquipmentCategory equipmentCategory = this.getById(id);
        if (equipmentCategory == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "器械分类不存在");
        }
        QueryWrapper<Equipment> equipmentQueryWrapper = new QueryWrapper<>();
        equipmentQueryWrapper.eq("eqcategory_id", id);
        long equipmentCount = equipmentMapper.selectCount(equipmentQueryWrapper); 
        if (equipmentCount > 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该分类下存在器械，无法删除");
        }
        return this.removeById(id);
    }

    @Override
    @Transactional
    public boolean updateEquipmentCategory(EquipmentCategoryUpdateRequest equipmentCategoryUpdateRequest) {
        if (equipmentCategoryUpdateRequest == null || equipmentCategoryUpdateRequest.getEqcategoryId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        EquipmentCategory equipmentCategory = new EquipmentCategory();
        BeanUtils.copyProperties(equipmentCategoryUpdateRequest, equipmentCategory);
        validEquipmentCategory(equipmentCategory, false);
        EquipmentCategory oldEquipmentCategory = this.getById(equipmentCategoryUpdateRequest.getEqcategoryId());
        if (oldEquipmentCategory == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "待更新的器械分类不存在");
        }
        return this.updateById(equipmentCategory);
    }

    @Override
    public EquipmentCategoryVO getEquipmentCategoryVOById(long id) {
        EquipmentCategory equipmentCategory = this.getById(id);
        if (equipmentCategory == null) {
            return null;
        }
        return getEquipmentCategoryVO(equipmentCategory);
    }

    @Override
    public List<EquipmentCategoryVO> getEquipmentCategoryVOList(List<EquipmentCategory> equipmentCategoryList) {
        if (equipmentCategoryList == null || equipmentCategoryList.isEmpty()) {
            return new ArrayList<>();
        }
        return equipmentCategoryList.stream().map(this::getEquipmentCategoryVO).collect(Collectors.toList());
    }

    @Override
    public IPage<EquipmentCategoryVO> getEquipmentCategoryVOPage(EquipmentCategoryQueryRequest equipmentCategoryQueryRequest) {
        long current = equipmentCategoryQueryRequest.getCurrent();
        long size = equipmentCategoryQueryRequest.getPageSize();
        if (size > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数错误: 单页数量过多");
        }
        Page<EquipmentCategory> equipmentCategoryPage = this.page(new Page<>(current, size),
                this.getQueryWrapper(equipmentCategoryQueryRequest));
        
        Page<EquipmentCategoryVO> voPage = new Page<>(current, size, equipmentCategoryPage.getTotal());
        List<EquipmentCategoryVO> voList = equipmentCategoryPage.getRecords().stream()
                .map(this::getEquipmentCategoryVO)
                .collect(Collectors.toList());
        voPage.setRecords(voList);
        return voPage;
    }

    @Override
    public QueryWrapper<EquipmentCategory> getQueryWrapper(EquipmentCategoryQueryRequest equipmentCategoryQueryRequest) {
        if (equipmentCategoryQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        QueryWrapper<EquipmentCategory> queryWrapper = new QueryWrapper<>();
        Long eqcategoryId = equipmentCategoryQueryRequest.getEqcategoryId();
        String categoryName = equipmentCategoryQueryRequest.getCategoryName();

        queryWrapper.eq(eqcategoryId != null, "eqcategory_id", eqcategoryId);
        queryWrapper.like(StringUtils.isNotBlank(categoryName), "category_name", categoryName);
        // queryWrapper.eq("is_delete", 0); // EquipmentCategory 实体中似乎没有is_delete字段
        return queryWrapper;
    }

    private EquipmentCategoryVO getEquipmentCategoryVO(EquipmentCategory equipmentCategory) {
        if (equipmentCategory == null) {
            return null;
        }
        EquipmentCategoryVO vo = new EquipmentCategoryVO();
        BeanUtils.copyProperties(equipmentCategory, vo);
        return vo;
    }
}




