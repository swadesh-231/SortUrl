package com.backend.service;


import com.backend.entity.User;

public interface UserService {
    User getUserById(Long id);
    User findByUsername(String name);
}
