package com.liucf.gymsystembackend.model.vo;

/**
 * @author Stargaze
 * @description
 * @createDate 2025/4/9 21:33
 */

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 已登录会员视图（脱敏）
 */
@Data
public class LoginMemberVO implements Serializable {

    /**
     * 会员ID
     */
    private Long id;

    /**
     * 会员昵称
     */
    private String memberName;

    /**
     * 会员账号
     */
    private String memberAccount;

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

    /**
     * 更新时间
     */
    private Date updateTime;

    private static final long serialVersionUID = 1L;
}
