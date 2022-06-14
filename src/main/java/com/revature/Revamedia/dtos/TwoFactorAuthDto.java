package com.revature.Revamedia.dtos;

public class TwoFactorAuthDto {

    private boolean twoFactorAuth;
    private String mode;

    public TwoFactorAuthDto() {
    }

    public TwoFactorAuthDto(boolean twoFactorAuth, String mode) {
        this.twoFactorAuth = twoFactorAuth;
        this.mode = mode;
    }

    public boolean isTwoFactorAuth() {
        return twoFactorAuth;
    }

    public void setTwoFactorAuth(boolean twoFactorAuth) {
        this.twoFactorAuth = twoFactorAuth;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
}
