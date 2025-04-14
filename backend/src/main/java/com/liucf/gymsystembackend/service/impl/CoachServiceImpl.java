package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.mapper.CoachMapper;
import com.liucf.gymsystembackend.model.dto.coach.CoachQueryRequest;
import com.liucf.gymsystembackend.model.entity.Coach;
import com.liucf.gymsystembackend.model.vo.CoachVO;
import com.liucf.gymsystembackend.service.CoachService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author yueyue
* @description 针对表【coach(教练信息表)】的数据库操作Service实现
* @createDate 2025-04-09 02:36:38
*/
@Service
public class CoachServiceImpl extends ServiceImpl<CoachMapper, Coach>
    implements CoachService{

    @Override
    public long coachRegister(String coachAccount, String coachName, String coachAvatar, Integer gender,
                            Integer coachAge, Date entryDate, String courseType, String coachSalary, String coachAddress) {
        // 1. 校验
        if (StrUtil.hasBlank(coachAccount, coachName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (coachAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "教练账号过短");
        }
        // 2. 检查是否重复
        QueryWrapper<Coach> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("coach_account", coachAccount);
        long count = this.baseMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号重复");
        }
        // 3. 插入数据
        Coach coach = new Coach();
        coach.setCoachAccount(coachAccount);
        coach.setCoachName(coachName);
        coach.setCoachAvatar(coachAvatar);
        coach.setGender(gender);
        coach.setCoachAge(coachAge);
        coach.setEntryDate(entryDate);
        coach.setCourseType(courseType);
        coach.setCoachSalary(coachSalary);
        coach.setCoachAddress(coachAddress);
        // 设置默认状态为在职
        coach.setCoachStatus(0);
        boolean saveResult = this.save(coach);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "注册失败，数据库错误");
        }
        return coach.getCoachId();
    }

    @Override
    public CoachVO getCoachVO(Coach coach) {
        if (coach == null) {
            return null;
        }
        CoachVO coachVO = new CoachVO();
        BeanUtils.copyProperties(coach, coachVO);
        return coachVO;
    }

    @Override
    public List<CoachVO> getCoachVOList(List<Coach> coachList) {
        if (coachList == null || coachList.isEmpty()) {
            return new ArrayList<>();
        }
        return coachList.stream().map(this::getCoachVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<Coach> getQueryWrapper(CoachQueryRequest coachQueryRequest) {
        if (coachQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long coachId = coachQueryRequest.getCoachId();
        String coachName = coachQueryRequest.getCoachName();
        String coachAccount = coachQueryRequest.getCoachAccount();
        Integer gender = coachQueryRequest.getGender();
        String courseType = coachQueryRequest.getCourseType();
        Integer coachStatus = coachQueryRequest.getCoachStatus();

        QueryWrapper<Coach> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(coachId != null, "coach_id", coachId);
        queryWrapper.eq(gender != null, "gender", gender);
        queryWrapper.eq(coachStatus != null, "coach_status", coachStatus);
        queryWrapper.like(StrUtil.isNotBlank(coachName), "coach_name", coachName);
        queryWrapper.like(StrUtil.isNotBlank(coachAccount), "coach_account", coachAccount);
        queryWrapper.like(StrUtil.isNotBlank(courseType), "course_type", courseType);
        return queryWrapper;
    }
}




