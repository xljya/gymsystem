package com.liucf.gymsystembackend.model.dto.member;

import lombok.Data;

import java.io.Serializable;

/**
 * 会员更新请求
 */
@Data
public class MemberUpdateRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 会员ID
     */
    private Long id;

    /**
     * 会员昵称
     */
    private String memberName;

    /**
     * 会员头像
     */
    private String memberAvatar;

    /**
     * 性别(0-未知,1-男,2-女)
     */
    private Integer gender;

    /**
     * 会员角色：member/admin
     */
    private String memberRole;
} 