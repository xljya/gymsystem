package com.liucf.gymsystembackend.model.enums;

import lombok.Getter;

/**
 * 会员角色枚举
 */
@Getter
public enum MemberRoleEnum {

    MEMBER("member", "会员"),
    ADMIN("admin", "管理员");

    private final String value;
    private final String text;

    MemberRoleEnum(String value, String text) {
        this.value = value;
        this.text = text;
    }

    /**
     * 根据 value 获取枚举
     */
    public static MemberRoleEnum getEnumByValue(String value) {
        if (value == null) {
            return null;
        }
        for (MemberRoleEnum roleEnum : MemberRoleEnum.values()) {
            if (roleEnum.getValue().equals(value)) {
                return roleEnum;
            }
        }
        return null;
    }
}
