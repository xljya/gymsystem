package com.liucf.gymsystembackend.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 会员视图（脱敏）
 */
@Data
public class MemberVO implements Serializable {

    /**
     * 会员ID
     */
    private Long id;

    /**
     * 会员账号
     */
    private String memberAccount;

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

    /**
     * 创建时间
     */
    private Date createTime;

    private static final long serialVersionUID = 1L;
} 