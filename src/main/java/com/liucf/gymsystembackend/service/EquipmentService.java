package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentAddRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentQueryRequest;
import com.liucf.gymsystembackend.model.dto.equipment.EquipmentUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Equipment;
import com.liucf.gymsystembackend.model.vo.EquipmentVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 器材服务
 */
public interface EquipmentService extends IService<Equipment> {

    /**
     * 校验器材参数是否符合要求
     * @param equipment 器材实体
     * @param add 是否为添加操作
     */
    void validEquipment(Equipment equipment, boolean add);

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
     * @param equipmentAddRequest 器材添加请求DTO
     * @return 新增器材的ID
     */
    Long addEquipment(EquipmentAddRequest equipmentAddRequest);

    /**
     * 更新器材
     *
     * @param equipmentUpdateRequest 器材更新请求DTO
     * @return 是否更新成功
     */
    boolean updateEquipment(EquipmentUpdateRequest equipmentUpdateRequest);

    /**
     * 删除器材
     *
     * @param eqId 器材ID
     * @return 是否删除成功
     */
    boolean deleteEquipment(Long eqId);

    /**
     * 根据ID获取器材VO
     *
     * @param eqId 器材ID
     * @return 器材VO
     */
    EquipmentVO getEquipmentVOById(Long eqId, HttpServletRequest request);

    /**
     * 分页获取器材VO
     *
     * @param equipmentQueryRequest 器材查询请求DTO
     * @param request HTTP请求
     * @return 分页器材VO
     */
    IPage<EquipmentVO> getEquipmentVOPage(EquipmentQueryRequest equipmentQueryRequest, HttpServletRequest request);
}
