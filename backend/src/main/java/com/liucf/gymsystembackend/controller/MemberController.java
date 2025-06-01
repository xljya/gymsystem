package com.liucf.gymsystembackend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.liucf.gymsystembackend.annotation.AuthCheck;
import com.liucf.gymsystembackend.common.BaseResponse;
import com.liucf.gymsystembackend.common.DeleteRequest;
import com.liucf.gymsystembackend.common.ResultUtils;
import com.liucf.gymsystembackend.constant.MemberConstant;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.exception.ThrowUtils;
import com.liucf.gymsystembackend.model.dto.member.MemberAddRequest;
import com.liucf.gymsystembackend.model.dto.member.MemberLoginRequest;
import com.liucf.gymsystembackend.model.dto.member.MemberQueryRequest;
import com.liucf.gymsystembackend.model.dto.member.MemberRegisterRequest;
import com.liucf.gymsystembackend.model.dto.member.MemberUpdateRequest;
import com.liucf.gymsystembackend.model.dto.member.MemberPasswordUpdateRequest;
import com.liucf.gymsystembackend.model.entity.Members;
import com.liucf.gymsystembackend.model.vo.LoginMemberVO;
import com.liucf.gymsystembackend.model.vo.MemberVO;
import com.liucf.gymsystembackend.service.MembersService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Stargaze
 * @description
 * @createDate 2025/4/9 18:06
 */

@RestController
@RequestMapping("/member")
public class MemberController {

    @Resource
    private MembersService membersService;

    /**
     * 会员注册
     */
    @PostMapping("/register")
    public BaseResponse<Long> memberRegister(@RequestBody MemberRegisterRequest memberRegisterRequest) {
        ThrowUtils.throwIf(memberRegisterRequest == null, ErrorCode.PARAMS_ERROR);
        String memberAccount = memberRegisterRequest.getMemberAccount();
        String memberPassword = memberRegisterRequest.getMemberPassword();
        String checkPassword = memberRegisterRequest.getCheckPassword();
        long result = membersService.memberRegister(memberAccount, memberPassword, checkPassword);
        return ResultUtils.success(result);
    }

    /**
     * 会员登录
     */
    @PostMapping("/login")
    public BaseResponse<LoginMemberVO> memberLogin(@RequestBody MemberLoginRequest memberLoginRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(memberLoginRequest == null, ErrorCode.PARAMS_ERROR);
        String memberAccount = memberLoginRequest.getMemberAccount();
        String memberPassword = memberLoginRequest.getMemberPassword();
        LoginMemberVO loginMemberVO = membersService.memberLogin(memberAccount, memberPassword, request);
        return ResultUtils.success(loginMemberVO);
    }

    /**
     * 获取当前登录会员
     */
    @GetMapping("/get/login")
    public BaseResponse<LoginMemberVO> getLoginMember(HttpServletRequest request) {
        Members member = membersService.getLoginMember(request);
        return ResultUtils.success(membersService.getLoginMemberVO(member));
    }

    /**
     * 会员注销
     */
    @PostMapping("/logout")
    public BaseResponse<Boolean> memberLogout(HttpServletRequest request) {
        ThrowUtils.throwIf(request == null, ErrorCode.PARAMS_ERROR);
        boolean result = membersService.memberLogout(request);
        return ResultUtils.success(result);
    }

    /**
     * 获取会员列表（仅管理员）
     */
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    @GetMapping("/list")
    public BaseResponse<List<Members>> listMembers() {
        List<Members> members = membersService.list();
        return ResultUtils.success(members);
    }

    /**
     * 创建会员（仅管理员）
     */
    @PostMapping("/add")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Long> addMember(@RequestBody MemberAddRequest memberAddRequest) {
        ThrowUtils.throwIf(memberAddRequest == null, ErrorCode.PARAMS_ERROR);
        Members member = new Members();
        BeanUtils.copyProperties(memberAddRequest, member);
        // 默认密码 12345678
        final String DEFAULT_PASSWORD = "12345678";
        String encryptPassword = membersService.getEncryptPassword(DEFAULT_PASSWORD);
        member.setMemberPassword(encryptPassword);
        boolean result = membersService.save(member);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(member.getId());
    }

    /**
     * 根据 id 获取会员（仅管理员）
     */
    @GetMapping("/get")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Members> getMemberById(long id) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        Members member = membersService.getById(id);
        ThrowUtils.throwIf(member == null, ErrorCode.NOT_FOUND_ERROR);
        return ResultUtils.success(member);
    }

    /**
     * 根据 id 获取脱敏的会员信息
     */
    @GetMapping("/get/vo")
    public BaseResponse<MemberVO> getMemberVOById(long id) {
        BaseResponse<Members> response = getMemberById(id);
        Members member = response.getData();
        return ResultUtils.success(membersService.getMemberVO(member));
    }

    /**
     * 删除会员（仅管理员）
     */
    @PostMapping("/delete")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteMember(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = membersService.removeById(deleteRequest.getId());
        return ResultUtils.success(b);
    }

    /**
     * 更新会员（仅管理员）
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateMember(@RequestBody MemberUpdateRequest memberUpdateRequest) {
        if (memberUpdateRequest == null || memberUpdateRequest.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Members member = new Members();
        BeanUtils.copyProperties(memberUpdateRequest, member);
        boolean result = membersService.updateById(member);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * 分页获取会员列表（仅管理员）
     */
    @PostMapping("/list/page/vo")
    @AuthCheck(mustRole = MemberConstant.ADMIN_ROLE)
    public BaseResponse<Page<MemberVO>> listMemberVOByPage(@RequestBody MemberQueryRequest memberQueryRequest) {
        ThrowUtils.throwIf(memberQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = memberQueryRequest.getCurrent();
        long pageSize = memberQueryRequest.getPageSize();
        Page<Members> memberPage = membersService.page(new Page<>(current, pageSize),
                membersService.getQueryWrapper(memberQueryRequest));
        Page<MemberVO> memberVOPage = new Page<>(current, pageSize, memberPage.getTotal());
        List<MemberVO> memberVOList = membersService.getMemberVOList(memberPage.getRecords());
        memberVOPage.setRecords(memberVOList);
        return ResultUtils.success(memberVOPage);
    }

    /**
     * 获取个人信息（当前登录会员）
     */
    @GetMapping("/get/my")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<MemberVO> getMyMemberInfo(HttpServletRequest request) {
        // 获取当前登录会员
        Members loginMember = membersService.getLoginMember(request);
        // 将完整会员信息转换为脱敏的 MemberVO
        MemberVO memberVO = membersService.getMemberVO(loginMember);
        return ResultUtils.success(memberVO);
    }

    /**
     * 会员修改个人信息
     */
    @PostMapping("/update/my")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<Boolean> updateMyInfo(@RequestBody MemberUpdateRequest memberUpdateRequest, 
                                             HttpServletRequest request) {
        // 参数校验
        ThrowUtils.throwIf(memberUpdateRequest == null, ErrorCode.PARAMS_ERROR);
        
        // 获取当前登录会员
        Members loginMember = membersService.getLoginMember(request);
        Long memberId = loginMember.getId();
        
        // 设置会员ID，确保只能修改自己的信息
        memberUpdateRequest.setId(memberId);
        
        // 创建一个新的 Members 对象用于更新
        Members member = new Members();
        BeanUtils.copyProperties(memberUpdateRequest, member);
        
        // 不允许修改的敏感字段设为 null，避免被更新
        member.setMemberAccount(null);  // 不允许修改账号
        member.setMemberRole(null);     // 不允许修改角色
        member.setMemberPassword(null); // 不允许通过此接口修改密码
        member.setCreateTime(null);     // 不允许修改创建时间
        member.setIsDelete(null);       // 不允许修改删除标记
        
        // 更新会员信息
        boolean result = membersService.updateById(member);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        
        return ResultUtils.success(true);
    }

    /**
     * 会员修改密码
     */
    @PostMapping("/update/password")
    @AuthCheck(mustRole = MemberConstant.MEMBER_ROLE)
    public BaseResponse<Boolean> updatePassword(@RequestBody MemberPasswordUpdateRequest passwordUpdateRequest, 
                                               HttpServletRequest request) {
        // 参数校验
        ThrowUtils.throwIf(passwordUpdateRequest == null, ErrorCode.PARAMS_ERROR);
        
        // 获取当前登录会员
        Members loginMember = membersService.getLoginMember(request);
        Long memberId = loginMember.getId();
        
        // 修改密码
        boolean result = membersService.updatePassword(
            memberId,
            passwordUpdateRequest.getOldPassword(),
            passwordUpdateRequest.getNewPassword(),
            passwordUpdateRequest.getCheckPassword()
        );
        
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }
}

