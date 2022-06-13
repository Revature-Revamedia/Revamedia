package com.revature.Revamedia.dtos;

public class TwoFactorAuthDto {

    private boolean twoFactorAuth;

    public TwoFactorAuthDto() {
    }

    public TwoFactorAuthDto(boolean twoFactorAuth) {
        this.twoFactorAuth = twoFactorAuth;
    }

    public boolean isTwoFactorAuth() {
        return twoFactorAuth;
    }

    public void setTwoFactorAuth(boolean twoFactorAuth) {
        this.twoFactorAuth = twoFactorAuth;
    }
}
