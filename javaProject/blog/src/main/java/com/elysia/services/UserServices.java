package com.elysia.services;

import com.elysia.entity.User;
import com.elysia.mapping.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.io.*;
@Service
public class UserServices {
    @Autowired
    private UserMapper userMapper;
    private String str;

    public User getUserById(String id){
        return userMapper.getUserById(id);
    }

    public int delete(String id){return userMapper.delete(id);}

    public int update(User user){return userMapper.update(user);}

    public User save(User user){
        int save = userMapper.saveNew(user);
        return user;
    }

    public List<User> selectAll( ){
        return userMapper.selectAll();
    }

}
