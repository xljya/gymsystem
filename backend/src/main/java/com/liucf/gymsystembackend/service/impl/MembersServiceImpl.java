package com.liucf.gymsystembackend.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.model.dto.member.MemberQueryRequest;
import com.liucf.gymsystembackend.model.entity.Members;
import com.liucf.gymsystembackend.model.enums.MemberRoleEnum;
import com.liucf.gymsystembackend.model.vo.LoginMemberVO;
import com.liucf.gymsystembackend.model.vo.MemberVO;
import com.liucf.gymsystembackend.service.MembersService;
import com.liucf.gymsystembackend.mapper.MembersMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.liucf.gymsystembackend.constant.MemberConstant.MEMBER_LOGIN_STATE;

/**
 * @author yueyue
 * @description 针对表【members(会员信息表)】的数据库操作Service实现
 * @createDate 2025-04-09 02:36:38
 */
@Service
public class MembersServiceImpl extends ServiceImpl<MembersMapper, Members>
        implements MembersService {

    @Override
    public long memberRegister(String memberAccount, String memberPassword, String checkPassword) {
        // 1. 校验
        if (StrUtil.hasBlank(memberAccount, memberPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (memberAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会员账号过短");
        }
        if (memberPassword.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会员密码过短");
        }
        if (!memberPassword.equals(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "两次输入的密码不一致");
        }
        // 2. 检查是否重复
        QueryWrapper<Members> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("member_account", memberAccount);
        long count = this.baseMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号重复");
        }
        // 3. 加密
        String encryptPassword = getEncryptPassword(memberPassword);
        // 4. 插入数据
        Members member = new Members();
        member.setMemberAccount(memberAccount);
        member.setMemberPassword(encryptPassword);
        member.setMemberName("Stargaze");
        member.setMemberRole(MemberRoleEnum.MEMBER.getValue());
        boolean saveResult = this.save(member);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "注册失败，数据库错误");
        }
        return member.getId();
    }

    @Override
    public String getEncryptPassword(String userPassword) {
        // 盐值，混淆密码
        final String SALT = "liucf";
        return DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
    }

    @Override
    public LoginMemberVO memberLogin(String memberAccount, String memberPassword, HttpServletRequest request) {
        // 1. 校验
        if (StrUtil.hasBlank(memberAccount, memberPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (memberAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会员账号过短");
        }
        if (memberPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会员密码过短");
        }
        // 2. 加密
        String encryptPassword = getEncryptPassword(memberPassword);
        // 查询会员是否存在
        QueryWrapper<Members> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("member_account", memberAccount);
        queryWrapper.eq("member_password", encryptPassword);
        Members member = this.baseMapper.selectOne(queryWrapper);
        // 会员不存在
        if (member == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会员不存在或密码错误");
        }
        // 3. 记录会员的登录态
        request.getSession().setAttribute(MEMBER_LOGIN_STATE, member);
        return this.getLoginMemberVO(member);
    }

    @Override
    public Members getLoginMember(HttpServletRequest request) {
        // 先判断是否已登录
        Object memberObj = request.getSession().getAttribute(MEMBER_LOGIN_STATE);
        Members currentMember = (Members) memberObj;
        if (currentMember == null || currentMember.getId() == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 从数据库查询（追求性能的话可以注释，直接返回上述结果）
        long memberId = currentMember.getId();
        currentMember = this.getById(memberId);
        if (currentMember == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        return currentMember;
    }

    @Override
    public LoginMemberVO getLoginMemberVO(Members member) {
        if (member == null) {
            return null;
        }
        LoginMemberVO loginMemberVO = new LoginMemberVO();
        BeanUtils.copyProperties(member, loginMemberVO);
        return loginMemberVO;
    }

    @Override
    public boolean memberLogout(HttpServletRequest request) {
        // 先判断是否已登录
        Object memberObj = request.getSession().getAttribute(MEMBER_LOGIN_STATE);
        if (memberObj == null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "未登录");
        }
        // 移除登录态
        request.getSession().removeAttribute(MEMBER_LOGIN_STATE);
        return true;
    }

    @Override
    public MemberVO getMemberVO(Members member) {
        if (member == null) {
            return null;
        }
        MemberVO memberVO = new MemberVO();
        BeanUtils.copyProperties(member, memberVO);
        return memberVO;
    }

    @Override
    public List<MemberVO> getMemberVOList(List<Members> memberList) {
        if (CollUtil.isEmpty(memberList)) {
            return new ArrayList<>();
        }
        return memberList.stream().map(this::getMemberVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<Members> getQueryWrapper(MemberQueryRequest memberQueryRequest) {
        if (memberQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long id = memberQueryRequest.getId();
        String memberAccount = memberQueryRequest.getMemberAccount();
        String memberName = memberQueryRequest.getMemberName();
        String memberRole = memberQueryRequest.getMemberRole();
        String sortField = memberQueryRequest.getSortField();
        String sortOrder = memberQueryRequest.getSortOrder();

        QueryWrapper<Members> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(id != null, "id", id);
        queryWrapper.eq(StrUtil.isNotBlank(memberRole), "member_role", memberRole);
        queryWrapper.like(StrUtil.isNotBlank(memberAccount), "member_account", memberAccount);
        queryWrapper.like(StrUtil.isNotBlank(memberName), "member_name", memberName);
        queryWrapper.orderBy(StrUtil.isNotBlank(sortField), "ascend".equals(sortOrder), sortField);
        return queryWrapper;
    }
}




