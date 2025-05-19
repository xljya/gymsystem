package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentQueryRequest;
import com.liucf.gymsystembackend.model.entity.Equipment;
import com.liucf.gymsystembackend.model.vo.EquipmentVO;

import java.util.List;

/**
 * 器材服务
 */
public interface EquipmentService extends IService<Equipment> {

    /**
     * 获取脱敏的器材信息
     *
     * @param equipment 器材信息
     * @return 脱敏后的器材信息
     */
    EquipmentVO getEquipmentVO(Equipment equipment);

    /**
     * 获取脱敏的器材信息列表
     *
     * @param equipmentList 器材信息列表
     * @return 脱敏后的器材信息列表
     */
    List<EquipmentVO> getEquipmentVOList(List<Equipment> equipmentList);

    /**
     * 获取查询包装器
     *
     * @param equipmentQueryRequest 器材查询请求
     * @return 查询包装器
     */
    QueryWrapper<Equipment> getQueryWrapper(EquipmentQueryRequest equipmentQueryRequest);

    /**
     * 添加器材
     *
     * @param equipment 器材信息
     * @return 是否添加成功
     */
    boolean addEquipment(Equipment equipment);

    /**
     * 更新器材
     *
     * @param equipment 器材信息
     * @return 是否更新成功
     */
    boolean updateEquipment(Equipment equipment);

    /**
     * 删除器材
     *
     * @param eqId 器材ID
     * @return 是否删除成功
     */
    boolean deleteEquipment(Long eqId);
}
