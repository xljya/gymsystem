package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.CoursePurchaseMapper;
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseAddRequest;
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseQueryRequest;
import com.liucf.gymsystembackend.model.dto.purchase.CoursePurchaseUpdateRequest;
import com.liucf.gymsystembackend.model.entity.CoursePurchase;
import com.liucf.gymsystembackend.model.entity.Members;
import com.liucf.gymsystembackend.model.vo.CoursePurchaseVO;
import com.liucf.gymsystembackend.service.CoursePurchaseService;
import com.liucf.gymsystembackend.service.CourseService;
import com.liucf.gymsystembackend.service.MembersService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author yueyue
* @description 针对表【course_purchase(课程购买记录表)】的数据库操作Service实现
* @createDate 2025-04-09 02:36:38
*/
@Service
public class CoursePurchaseServiceImpl extends ServiceImpl<CoursePurchaseMapper, CoursePurchase>
    implements CoursePurchaseService{

    @Resource
    private MembersService memberService;

    @Resource
    private CourseService courseService;

    @Override
    public CoursePurchaseVO getCoursePurchaseVO(CoursePurchase coursePurchase) {
        if (coursePurchase == null) {
            return null;
        }
        CoursePurchaseVO coursePurchaseVO = new CoursePurchaseVO();
        BeanUtils.copyProperties(coursePurchase, coursePurchaseVO);
        return coursePurchaseVO;
    }

    @Override
    public List<CoursePurchaseVO> getCoursePurchaseVOList(List<CoursePurchase> coursePurchaseList) {
        if (coursePurchaseList == null || coursePurchaseList.isEmpty()) {
            return new ArrayList<>();
        }
        return coursePurchaseList.stream().map(this::getCoursePurchaseVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<CoursePurchase> getQueryWrapper(CoursePurchaseQueryRequest coursePurchaseQueryRequest) {
        if (coursePurchaseQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long id = coursePurchaseQueryRequest.getPurchaseId();
        Long memberId = coursePurchaseQueryRequest.getMemberId();
        Long courseId = coursePurchaseQueryRequest.getCourseId();
        Integer status = coursePurchaseQueryRequest.getPaymentStatus();

        QueryWrapper<CoursePurchase> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(id != null, "id", id);
        queryWrapper.eq(memberId != null, "member_id", memberId);
        queryWrapper.eq(courseId != null, "course_id", courseId);
        queryWrapper.eq(status != null, "status", status);
        return queryWrapper;
    }

    @Override
    public Long addCoursePurchase(CoursePurchaseAddRequest coursePurchaseAddRequest) {
        if (coursePurchaseAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long memberId = coursePurchaseAddRequest.getMemberId();
        Long courseId = coursePurchaseAddRequest.getCourseId();
        Long coachId = coursePurchaseAddRequest.getCoachId();
        Integer classCount = coursePurchaseAddRequest.getClassCount();
        if (memberId == null || courseId == null || coachId == null || classCount == null || classCount <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数错误");
        }
        // 检查会员是否存在且未被删除
        QueryWrapper<Members> memberQueryWrapper = new QueryWrapper<>();
        memberQueryWrapper.eq("id", memberId);
        memberQueryWrapper.eq("is_delete", 0);
        Members member = memberService.getOne(memberQueryWrapper);
        if (member == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "会员不存在或已被删除");
        }
        // 检查课程是否存在
        if (courseService.getById(courseId) == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程不存在");
        }
        // 创建课程购买记录
        CoursePurchase coursePurchase = new CoursePurchase();
        coursePurchase.setMemberId(memberId);
        coursePurchase.setCourseId(courseId);
        coursePurchase.setCoachId(coachId);
        coursePurchase.setClassCount(classCount);
        coursePurchase.setTotalPrice(coursePurchaseAddRequest.getTotalPrice());
        coursePurchase.setStatus(1); // 默认有效
        boolean result = this.save(coursePurchase);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "创建课程购买记录失败");
        }
        return coursePurchase.getId();
    }

    @Override
    public boolean updateCoursePurchase(CoursePurchaseUpdateRequest coursePurchaseUpdateRequest) {
        if (coursePurchaseUpdateRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long id = coursePurchaseUpdateRequest.getId();
        if (id == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "课程购买记录ID不能为空");
        }
        // 检查课程购买记录是否存在
        CoursePurchase coursePurchase = this.getById(id);
        if (coursePurchase == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "课程购买记录不存在");
        }
        // 更新课程购买记录
        CoursePurchase updateCoursePurchase = new CoursePurchase();
        updateCoursePurchase.setId(id);
        updateCoursePurchase.setMemberId(coursePurchaseUpdateRequest.getMemberId());
        updateCoursePurchase.setCourseId(coursePurchaseUpdateRequest.getCourseId());
        updateCoursePurchase.setCoachId(coursePurchaseUpdateRequest.getCoachId());
        updateCoursePurchase.setClassCount(coursePurchaseUpdateRequest.getClassCount());
        updateCoursePurchase.setTotalPrice(coursePurchaseUpdateRequest.getTotalPrice());
        updateCoursePurchase.setStatus(coursePurchaseUpdateRequest.getStatus());
        return this.updateById(updateCoursePurchase);
    }
}




