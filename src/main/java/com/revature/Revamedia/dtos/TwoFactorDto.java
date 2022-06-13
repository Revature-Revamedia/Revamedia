package com.revature.Revamedia.dtos;

public class TwoFactorDto {

    private String sixDigitCode;
    private String username;

    public TwoFactorDto() {
    }

    public TwoFactorDto(String sixDigitCode, String username) {
        this.sixDigitCode = sixDigitCode;
        this.username = username;
    }

    public String getSixDigitCode() {
        return sixDigitCode;
    }

    public void setSixDigitCode(String sixDigitCode) {
        this.sixDigitCode = sixDigitCode;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "TwoFactorDto{" +
                "sixDigitCode='" + sixDigitCode + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
