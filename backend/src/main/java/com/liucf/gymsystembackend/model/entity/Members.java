package com.liucf.gymsystembackend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 会员信息表
 * @TableName members
 */
@TableName(value ="members")
@Data
public class Members {
    /**
     * 会员ID
     */
    @TableId(type = IdType.AUTO)
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
     * 密码
     */
    private String memberPassword;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除(0-未删除,1-已删除)
     */
    private Integer isDelete;
}