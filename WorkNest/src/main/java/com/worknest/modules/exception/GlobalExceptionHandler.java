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

    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
        org.springframework.web.bind.MethodArgumentNotValidException ex,
        HttpServletRequest request) {

    String errorMessage = ex.getBindingResult()
            .getFieldError()
            .getDefaultMessage();

    ErrorResponse error = new ErrorResponse(
            errorMessage,
            400,
            request.getRequestURI()
    );

    return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(UserNotFoundException.class)
public ResponseEntity<ErrorResponse> handleUserNotFound(
        UserNotFoundException ex,
        HttpServletRequest request) {

    ErrorResponse error = new ErrorResponse(
            ex.getMessage(),
            404,
            request.getRequestURI()
    );

    return ResponseEntity.status(404).body(error);
}


@ExceptionHandler(InvalidPasswordException.class)
public ResponseEntity<ErrorResponse> handleInvalidPassword(
        InvalidPasswordException ex,
        HttpServletRequest request) {

    ErrorResponse error = new ErrorResponse(
            ex.getMessage(),
            401,
            request.getRequestURI()
    );

    return ResponseEntity.status(401).body(error);
}

}