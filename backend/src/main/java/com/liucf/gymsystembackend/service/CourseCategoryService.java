package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.dto.course.CourseCategoryQueryRequest;
import com.liucf.gymsystembackend.model.entity.CourseCategory;
import com.liucf.gymsystembackend.model.vo.CourseCategoryVO;

import java.util.List;

/**
* @author yueyue
* @description 针对表【course_category(课程类别表)】的数据库操作Service
* @createDate 2025-04-30 18:56:05
*/
public interface CourseCategoryService extends IService<CourseCategory> {

    /**
     * 获取脱敏的课程类别信息
     *
     * @param courseCategory 课程类别信息
     * @return 脱敏后的课程类别信息
     */
    CourseCategoryVO getCourseCategoryVO(CourseCategory courseCategory);

    /**
     * 获取脱敏的课程类别信息列表
     *
     * @param courseCategoryList 课程类别信息列表
     * @return 脱敏后的课程类别信息列表
     */
    List<CourseCategoryVO> getCourseCategoryVOList(List<CourseCategory> courseCategoryList);

    /**
     * 获取课程类别视图对象分页
     */
    Page<CourseCategoryVO> getCourseCategoryVOPage(Page<CourseCategory> courseCategoryPage);

    /**
     * 获取查询包装器
     *
     * @param courseCategoryQueryRequest 课程类别查询请求
     * @return 查询包装器
     */
    QueryWrapper<CourseCategory> getQueryWrapper(CourseCategoryQueryRequest courseCategoryQueryRequest);



    /**
     * 更新课程类别
     *
     * @param categoryId 类别ID
     * @param categoryName 类别名称
     * @param categoryDesc 类别描述
     * @return 是否更新成功
     */
    boolean updateCategory(Long categoryId, String categoryName, String categoryDesc);

    /**
     * 删除课程类别
     *
     * @param categoryId 类别ID
     * @return 是否删除成功
     */
    boolean deleteCategory(Long categoryId);
}
