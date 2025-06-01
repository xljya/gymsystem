package com.liucf.gymsystembackend.service;

import com.liucf.gymsystembackend.model.entity.EquipmentCategory;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryAddRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryQueryRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentCategoryUpdateRequest;
import com.liucf.gymsystembackend.model.vo.EquipmentCategoryVO;
import com.baomidou.mybatisplus.core.metadata.IPage;
import java.util.List;

/**
* @author yueyue
* @description 针对表【equipment_category(器械分类表)】的数据库操作Service
* @createDate 2025-05-30 01:37:47
*/
public interface EquipmentCategoryService extends IService<EquipmentCategory> {

    /**
     * 添加器械分类
     * @param equipmentCategoryAddRequest 器械分类添加请求
     * @return 新增器械分类的ID
     */
    long addEquipmentCategory(EquipmentCategoryAddRequest equipmentCategoryAddRequest);

    /**
     * 删除器械分类
     * @param id 器械分类ID
     * @return 是否删除成功
     */
    boolean deleteEquipmentCategory(long id);

    /**
     * 更新器械分类
     * @param equipmentCategoryUpdateRequest 器械分类更新请求
     * @return 是否更新成功
     */
    boolean updateEquipmentCategory(EquipmentCategoryUpdateRequest equipmentCategoryUpdateRequest);

    /**
     * 根据ID获取器械分类封装
     * @param id 器械分类ID
     * @return 器械分类封装
     */
    EquipmentCategoryVO getEquipmentCategoryVOById(long id);

    /**
     * 获取器械分类封装列表
     * @param equipmentCategoryList 器械分类列表
     * @return 器械分类封装列表
     */
    List<EquipmentCategoryVO> getEquipmentCategoryVOList(List<EquipmentCategory> equipmentCategoryList);

    /**
     * 分页获取器械分类封装
     * @param equipmentCategoryQueryRequest 器械分类查询请求
     * @return 分页器械分类封装
     */
    IPage<EquipmentCategoryVO> getEquipmentCategoryVOPage(EquipmentCategoryQueryRequest equipmentCategoryQueryRequest);

    /**
     * 获取查询条件
     *
     * @param equipmentCategoryQueryRequest
     * @return
     */
    com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<EquipmentCategory> getQueryWrapper(EquipmentCategoryQueryRequest equipmentCategoryQueryRequest);


    /**
     * 校验器械分类信息
     *
     * @param equipmentCategory 器械分类信息
     * @param add 是否为添加校验
     */
    void validEquipmentCategory(EquipmentCategory equipmentCategory, boolean add);
}
