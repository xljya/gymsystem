package com.liucf.gymsystembackend.model.dto.member;

import lombok.Data;

import java.io.Serializable;

/**
 * 会员修改密码请求
 */
@Data
public class MemberPasswordUpdateRequest implements Serializable {

    /**
     * 旧密码
     */
    private String oldPassword;

    /**
     * 新密码
     */
    private String newPassword;

    /**
     * 确认新密码
     */
    private String checkPassword;

    private static final long serialVersionUID = 1L;
} 