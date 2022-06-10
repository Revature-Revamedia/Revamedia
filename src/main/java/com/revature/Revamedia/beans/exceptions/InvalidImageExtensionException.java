package com.revature.Revamedia.beans.exceptions;

import java.util.List;

public class InvalidImageExtensionException extends RuntimeException {

    List<String> validExtensions;

    public InvalidImageExtensionException(List<String> validExtensions) {
        this.validExtensions = validExtensions;
    }
}
