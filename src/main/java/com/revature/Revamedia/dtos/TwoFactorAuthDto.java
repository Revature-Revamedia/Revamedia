package com.revature.Revamedia.dtos;

public class TwoFactorAuthDto {

    private Integer userId;
    private boolean twoFactorAuth;

    public TwoFactorAuthDto() {
    }

    public TwoFactorAuthDto(Integer userId, boolean twoFactorAuth) {
        this.userId = userId;
        this.twoFactorAuth = twoFactorAuth;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public boolean isTwoFactorAuth() {
        return twoFactorAuth;
    }

    public void setTwoFactorAuth(boolean twoFactorAuth) {
        this.twoFactorAuth = twoFactorAuth;
    }
}
