package com.worknest.modules.exception;

public class ErrorResponse {

    private String message;
    private String path;

    public ErrorResponse(String message, int status, String path) {
        this.message = message;
        this.path = path;
    }

    public String getMessage() {
        return message;
    }


    public String getPath() {
        return path;
    }
}