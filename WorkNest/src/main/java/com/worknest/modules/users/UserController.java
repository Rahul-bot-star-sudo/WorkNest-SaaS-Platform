// ==============================
// USER CONTROLLER
// package: com.worknest.modules.users
// ==============================

package com.worknest.modules.users;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.worknest.modules.users.dto.ApiResponse;
import com.worknest.modules.users.dto.CreateUserRequestDto;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createUser(
            @RequestBody CreateUserRequestDto dto) {

        return ResponseEntity.ok(userService.createUser(dto));
    }
}