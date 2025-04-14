package com.liucf.gymsystembackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.liucf.gymsystembackend.exception.BusinessException;
import com.liucf.gymsystembackend.exception.ErrorCode;
import com.liucf.gymsystembackend.model.dto.member.MemberQueryRequest;
import com.liucf.gymsystembackend.model.entity.Members;
import com.baomidou.mybatisplus.extension.service.IService;
import com.liucf.gymsystembackend.model.vo.LoginMemberVO;
import com.liucf.gymsystembackend.model.vo.MemberVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* @author yueyue
* @description 针对表【members(会员信息表)】的数据库操作Service
* @createDate 2025-04-09 02:36:38
*/
public interface MembersService extends IService<Members> {

    /**
     * 会员注册
     *
     * @param memberAccount 会员账户
     * @param memberPassword 会员密码
     * @param checkPassword 校验密码
     * @return 新会员 id
     */
    long memberRegister(String memberAccount,String memberPassword,String checkPassword);

    /**
     * 获取加密后的密码
     *
     * @param userPassword
     * @return
     */
    String getEncryptPassword(String userPassword);

    /**
     * 会员登录
     *
     * @param memberAccount 会员账户
     * @param memberPassword 会员密码
     * @param request
     * @return 脱敏后的会员信息
     */
    LoginMemberVO memberLogin(String memberAccount,String memberPassword, HttpServletRequest request);

    /**
     * 获取当前登录会员
     *
     * @param request 请求对象
     * @return 当前登录会员
     */
    Members getLoginMember(HttpServletRequest request);

    /**
     * 获取脱敏的已登录会员信息
     *
     * @param member 会员信息
     * @return 脱敏后的会员信息
     */
    LoginMemberVO getLoginMemberVO(Members member);

    /**
     * 会员注销
     *
     * @param request 请求对象
     * @return 是否注销成功
     */
    boolean memberLogout(HttpServletRequest request);

    /**
     * 获取脱敏的会员信息
     *
     * @param member 会员信息
     * @return 脱敏后的会员信息
     */
    MemberVO getMemberVO(Members member);

    /**
     * 获取脱敏的会员信息列表
     *
     * @param memberList 会员信息列表
     * @return 脱敏后的会员信息列表
     */
    List<MemberVO> getMemberVOList(List<Members> memberList);

    /**
     * 获取查询包装器
     *
     * @param memberQueryRequest 会员查询请求
     * @return 查询包装器
     */
    QueryWrapper<Members> getQueryWrapper(MemberQueryRequest memberQueryRequest);
}
