package com.elysia.controller;

import com.elysia.entity.player;
import com.elysia.services.playServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/")
public class playController {
    @Autowired
    private playServices ps;
    private final static Logger logger = LoggerFactory.getLogger(UserController.class);

    /*
     * 费尽九牛二虎之力搭建的博客，也是老婆们的档案
     * @author: Bronya
     * */
    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    // 登陆页
    @ResponseBody
    @PostMapping("/loginIn")
    public player loginIn(@RequestParam int id){
        player p = ps.getInfo(id);
        logger.info("数据库查询：{}", p);
        List<player> all = ps.All();
        logger.info("所有信息:" + all);
        if (all.contains(p)){
            return p;
        }else {
            return new player(404, "error", "MsgNotFound");
        }
    }

    // 首页博客
    @RequestMapping("/home")
    public String Home(){
        return "main";
    }
    // 账号注册
    @RequestMapping("/signup")
    public String signUp(){
        return "signUp";
    }

    @PostMapping("/register")
    @ResponseBody
    public player Register(@RequestParam String user, String pwd){
        List<player> allMsg = ps.All();
        if (allMsg.isEmpty()){
            player fs = new player(16101401, user, pwd);
            ps.saveNew(fs);
            return fs;
        }else {
            int id = allMsg.size() + 16101401;
            player other = new player(id,user,pwd);
            ps.saveNew(other);
            return other;
        }
    }
}
