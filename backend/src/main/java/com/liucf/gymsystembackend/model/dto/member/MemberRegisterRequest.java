package com.liucf.gymsystembackend.model.dto.member;

import lombok.Data;

import java.io.Serializable;

/**
 * @author Stargaze
 * @description
 * @createDate 2025/4/9 15:03
 */

@Data
public class MemberRegisterRequest implements Serializable {

    private static final long serialVersionUID = 3191241716373120793L;

    /**
     * 账号
     */
    private String memberAccount;

    /**
     * 密码
     */
    private String memberPassword;

    /**
     * 确认密码
     */
    private String checkPassword;
}

