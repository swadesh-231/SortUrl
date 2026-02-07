package com.backend.security.service;


import com.backend.dto.request.LoginRequest;
import com.backend.dto.request.RegisterRequest;
import com.backend.dto.response.AuthResponse;
import com.backend.dto.response.LoginResponse;

public interface AuthService {
    AuthResponse registerUser(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);

    String refreshToken(String refreshToken);
}