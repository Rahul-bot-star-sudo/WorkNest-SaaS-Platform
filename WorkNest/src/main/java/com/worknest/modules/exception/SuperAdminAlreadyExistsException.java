package com.worknest.modules.exception;

public class SuperAdminAlreadyExistsException extends RuntimeException {

    public SuperAdminAlreadyExistsException(String message) {
        super(message);
    }
}