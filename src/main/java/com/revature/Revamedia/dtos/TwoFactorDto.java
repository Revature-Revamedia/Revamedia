package com.revature.Revamedia.dtos;

public class TwoFactorDto {

    private String sixDigitCode;

    public TwoFactorDto() {
    }

    public TwoFactorDto(String sixDigitCode) {
        this.sixDigitCode = sixDigitCode;
    }

    public String getSixDigitCode() {
        return sixDigitCode;
    }

    public void setSixDigitCode(String sixDigitCode) {
        this.sixDigitCode = sixDigitCode;
    }
}
