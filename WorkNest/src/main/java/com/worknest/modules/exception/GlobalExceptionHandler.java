package com.worknest.modules.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 👉 Service level exception
    @ExceptionHandler(SuperAdminAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleSuperAdminExists(
            SuperAdminAlreadyExistsException ex,
            HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                400,
                request.getRequestURI()
        );

        return ResponseEntity.badRequest().body(error);
    }

    // 👉 DB level exception
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDBException(
            DataIntegrityViolationException ex,
            HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(
                "Super Admin already exists (DB constraint)",
                400,
                request.getRequestURI()
        );

        return ResponseEntity.badRequest().body(error);
    }
}