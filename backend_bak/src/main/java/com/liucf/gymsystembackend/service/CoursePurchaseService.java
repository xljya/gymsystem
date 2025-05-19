package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseAddRequest;
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseQueryRequest;
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseUpdateRequest;
import com.liucf.gymsystembackend.model.entity.CoursePurchase;
import com.liucf.gymsystembackend.model.vo.CoursePurchaseVO;

import java.util.List;

/**
 * 课程购买记录服务
 */
public interface CoursePurchaseService extends IService<CoursePurchase> {

    /**
     * 获取脱敏的课程购买记录信息
     *
     * @param coursePurchase 课程购买记录信息
     * @return 脱敏后的课程购买记录信息
     */
    CoursePurchaseVO getCoursePurchaseVO(CoursePurchase coursePurchase);

    /**
     * 获取脱敏的课程购买记录信息列表
     *
     * @param coursePurchaseList 课程购买记录信息列表
     * @return 脱敏后的课程购买记录信息列表
     */
    List<CoursePurchaseVO> getCoursePurchaseVOList(List<CoursePurchase> coursePurchaseList);

    /**
     * 获取查询包装器
     *
     * @param coursePurchaseQueryRequest 课程购买记录查询请求
     * @return 查询包装器
     */
    QueryWrapper<CoursePurchase> getQueryWrapper(CoursePurchaseQueryRequest coursePurchaseQueryRequest);

    /**
     * 新增课程购买记录
     *
     * @param coursePurchaseAddRequest 课程购买记录新增请求
     * @return 新增的课程购买记录ID
     */
    Long addCoursePurchase(CoursePurchaseAddRequest coursePurchaseAddRequest);

    /**
     * 更新课程购买记录
     *
     * @param coursePurchaseUpdateRequest 课程购买记录更新请求
     * @return 是否更新成功
     */
    boolean updateCoursePurchase(CoursePurchaseUpdateRequest coursePurchaseUpdateRequest);
}
