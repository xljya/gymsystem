package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.CourseCategoryMapper;
import com.liucf.gymsystembackend.mapper.CourseMapper;
import com.liucf.gymsystembackend.model.dto.course.CourseCategoryQueryRequest;
import com.liucf.gymsystembackend.model.entity.Course;
import com.liucf.gymsystembackend.model.entity.CourseCategory;
import com.liucf.gymsystembackend.model.vo.CourseCategoryVO;
import com.liucf.gymsystembackend.service.CourseCategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 课程类别服务实现
 */
@Service
public class CourseCategoryServiceImpl extends ServiceImpl<CourseCategoryMapper, CourseCategory>
        implements CourseCategoryService {

    @Resource
    private CourseMapper courseMapper;

    @Override
    public CourseCategoryVO getCourseCategoryVO(CourseCategory courseCategory) {
        if (courseCategory == null) {
            return null;
        }
        CourseCategoryVO vo = new CourseCategoryVO();
        BeanUtils.copyProperties(courseCategory, vo);
        return vo;
    }

    @Override
    public List<CourseCategoryVO> getCourseCategoryVOList(List<CourseCategory> courseCategoryList) {
        if (courseCategoryList == null || courseCategoryList.isEmpty()) {
            return new ArrayList<>();
        }
        return courseCategoryList.stream().map(this::getCourseCategoryVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<CourseCategory> getQueryWrapper(CourseCategoryQueryRequest courseCategoryQueryRequest) {
        // 校验请求参数是否为空
        if (courseCategoryQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        // 获取查询条件：类别ID和类别名称
        Long categoryId = courseCategoryQueryRequest.getCategoryId();
        String categoryName = courseCategoryQueryRequest.getCategoryName();

        QueryWrapper<CourseCategory> queryWrapper = new QueryWrapper<>();
        // 如果categoryId不为空，则作为等值查询条件
        queryWrapper.eq(categoryId != null, "category_id", categoryId);
        // 如果categoryName不为空，则作为模糊查询条件
        queryWrapper.like(StrUtil.isNotBlank(categoryName), "category_name", categoryName);
        // 只查询未被删除的类别
        queryWrapper.eq("is_delete", 0);
        return queryWrapper;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateCategory(Long categoryId, String categoryName, String categoryDesc) {
        // 1. 校验参数
        if (categoryId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "类别ID不能为空");
        }

        // 2. 检查类别是否存在
        CourseCategory category = this.getById(categoryId);
        if (category == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "类别不存在");
        }

        // 3. 如果修改了名称，检查是否重复
        if (StrUtil.isNotBlank(categoryName) && !categoryName.equals(category.getCategoryName())) {
            QueryWrapper<CourseCategory> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("category_name", categoryName);
            long count = this.count(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "类别名称已存在");
            }
        }

        // 4. 更新类别
        if (StrUtil.isNotBlank(categoryName)) {
            category.setCategoryName(categoryName);
        }
        if (StrUtil.isNotBlank(categoryDesc)) {
            category.setCategoryDesc(categoryDesc);
        }
        return this.updateById(category);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteCategory(Long categoryId) {
        // 1. 校验参数
        if (categoryId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "类别ID不能为空");
        }

        // 2. 检查类别是否存在
        CourseCategory category = this.getById(categoryId);
        if (category == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "类别不存在");
        }

        // 3. 检查是否有课程使用该类别
        QueryWrapper<Course> courseQueryWrapper = new QueryWrapper<>();
        courseQueryWrapper.eq("category_id", categoryId);
        long courseCount = courseMapper.selectCount(courseQueryWrapper);
        if (courseCount > 0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "该类别下存在课程，无法删除");
        }

        // 4. 删除类别
        return this.removeById(categoryId);
    }

    @Override
    public Page<CourseCategoryVO> getCourseCategoryVOPage(Page<CourseCategory> courseCategoryPage) {
        if (courseCategoryPage == null || courseCategoryPage.getRecords() == null) {
            return new Page<>();
        }
        Page<CourseCategoryVO> voPage = new Page<>();
        BeanUtils.copyProperties(courseCategoryPage, voPage);
        voPage.setRecords(getCourseCategoryVOList(courseCategoryPage.getRecords()));
        return voPage;
    }
}




