package com.elysia.controller;

import com.elysia.entity.User;
import com.elysia.services.UserServices;
import com.web.Weibo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping("/")
public class UserController {
    private final static Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserServices us;

    // 纸片人老婆们
    @GetMapping("/laopo")
    public String getResult(){
        return "laopo";
    }
    // 这是第一个，爱莉希雅
    @GetMapping("/elysia")
    public String Elysia(@RequestParam String id, Model md){
        User ely = us.getUserById(id);
        md.addAttribute("elysia", ely);
        return "MyGirl/Elysia";
    }
    // 第二个，神里绫华
    @GetMapping("/ayaka")
    public String Ayaka(Model md, @RequestParam String id){
        User ayaka = us.getUserById(id);
        md.addAttribute("ayaka", ayaka);
        return "MyGirl/Ayaka";
    }
    // 刻晴
    @GetMapping("/keqing")
    public String Keqing(Model md, @RequestParam String id){
        User kq = us.getUserById(id);
        md.addAttribute("kq", kq);
        return "MyGirl/Keqing";
    }
    // 宵宫
    @GetMapping("/Yoimiya")
    public String Yoimiya(Model md, @RequestParam String id){
        User yo = us.getUserById(id);
        md.addAttribute("yo", yo);
        return "MyGirl/Yoimiya";
    }

    @GetMapping("/study")
    public String Study(){
        return "study";
    }

    @GetMapping("/selfWeb")
    public String SelfWeb(){
        return "SelfWeb";
    }

    @GetMapping("/study1")
    public String Study_1(){
        return "txt/study_1";
    }

    @GetMapping("/study2")
    public String Study_2(){
        return "txt/study_2";
    }

    @PostMapping("/selfWeb")
    @ResponseBody
    public String Web(@RequestParam String ck, String uid, int page) throws IOException {
        Weibo wb = new Weibo();
        File flo = new File("/usr/local/apache-tomcat-10.1.11/webapps/blog/miao");
        final String URL = "https://weibo.com/ajax/profile/getImageWall";

        if (flo.exists() && flo.isDirectory()){
            File[] f = flo.listFiles();
            if (f != null){
                for (File fi: f) {
                    if (fi.isFile()){
                        fi.delete();
                    }
                }
            }
        }

        for (int i=0; i<=page; i++){
            wb.save(URL, uid, ck);
        }
        return "{\"success\": true}";
    }
}
