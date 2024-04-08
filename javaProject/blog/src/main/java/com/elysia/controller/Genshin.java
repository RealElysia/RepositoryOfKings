package com.elysia.controller;

import com.elysia.services.UserServices;
import com.elysia.entity.*;
import com.alibaba.fastjson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;
import java.util.HashMap;

@Controller
@RequestMapping("/")
public class Genshin {
    int oneCount=0;
    int tenCount=0;
    int total=0;
    String result;
    @Autowired
    UserServices us;

    private final static Logger logger = LoggerFactory.getLogger(UserController.class);
    // 单次抽卡
    @PostMapping("/getOneRoles")
    @ResponseBody
    public String oneRoles(@RequestParam String role, int yuan){
        // 存储当前抽卡结果
        HashMap<String, Object> resp = new HashMap<>();
        resp.put("code", 0);
        resp.put("success", true);

        if (yuan >= 160){
           HashMap<String, Object> r = oneRoleCards(role, yuan);
           resp.put("role", r.get("role"));
           resp.put("total", r.get("total"));
           resp.put("yuan", r.get("yuan"));
           return JSON.toJSONString(resp);
        }
        return JSON.toJSONString(resp);
    }

    // 十次抽卡
    @PostMapping("/getTenRoles")
    @ResponseBody
    public String tenRoles(@RequestParam String role, int yuan){
        // 存储当前抽卡结果
        HashMap<String, Object> resp = new HashMap<>();
        resp.put("code", 0);
        resp.put("success", true);

        if (yuan >= 1600) {
            HashMap<String, Object> r = tenRoleCards(role, yuan);
            resp.put("roles", r.get("roles"));
            resp.put("total", r.get("total"));
            resp.put("yuan", r.get("yuan"));
            return JSON.toJSONString(resp);
        }
        return JSON.toJSONString(resp);
    }

    // 单次
    public HashMap<String, Object> oneRoleCards(String role, int yuan){
        oneCount++;
        tenCount++;
        total++;
        yuan -= 160;
        // 取出角色信息枚举值
        ArrayList<Object> array = new ArrayList<>();
        HashMap<String, Object> hash = new HashMap<>();
        // 随机数抽取
        Random ran = new Random();
        // 角色选择
        switch (role) {
            case "ayaka" -> array.addAll(Arrays.asList(Ayaka.values()));
            case "yomiya" -> array.addAll(Arrays.asList(Yomiya.values()));
            case "keqing" -> array.addAll(Arrays.asList(KeQing.values()));
        }

        int d = ran.nextInt(array.size());
        String res = array.get(d).toString();
        String bd = array.get(0).toString();  // 金色大保底
        // 保底判断
        if (oneCount==10){
            oneCount = 0;
            int one = ran.nextInt(0, 11);
            String str = array.get(one).toString();
            hash.put("role", str);
            hash.put("total", total);
            hash.put("yuan", yuan);
            if (str.equals(bd)){
                tenCount = 0;
            }
            return hash;
        } else if (oneCount == 80) {
            hash.put("role", bd);
            hash.put("total", 80);
            hash.put("yuan", yuan);
            return hash;
        } else if (res.equals(bd)) {
            hash.put("role", bd);
            hash.put("total", total);
            hash.put("yuan", yuan);
            tenCount = 0;
            oneCount = 0;
            return hash;
        }
        hash.put("role", res);
        hash.put("total", total);
        hash.put("yuan", yuan);
        return hash;
    }
    // 十连抽
    public HashMap<String, Object> tenRoleCards(String role, int yuan){
        tenCount += 10;
        total += 10;
        yuan -= 1600;
        // 取出角色信息枚举值
        ArrayList<Object> array = new ArrayList<>();
        ArrayList<Object> roles = new ArrayList<>();

        HashMap<String, Object> hash = new HashMap<>();
        hash.put("roles", roles);
        // 随机数抽取
        Random ran = new Random();
        // 角色选择
        switch (role) {
            case "ayaka" -> array.addAll(Arrays.asList(Ayaka.values()));
            case "yomiya" -> array.addAll(Arrays.asList(Yomiya.values()));
            case "keqing" -> array.addAll(Arrays.asList(KeQing.values()));
        }
        if (tenCount==80){
            String a = array.get(0).toString();
            roles.add(a);
            for (int i=0; i<9; i++){
                int b = ran.nextInt(22);
                roles.add(array.get(b).toString());
            }
            tenCount = 0;
            hash.put("total", total);
            hash.put("yuan", yuan);
            return hash;
        }
        // 正常操作
        for (int i=0; i<10; i++){
            int b = ran.nextInt(22);
            roles.add(array.get(b).toString());
            String lh = array.get(0).toString();
            if (role.contains(lh)){
                tenCount = 0;
            }
        }
        hash.put("total", total);
        hash.put("yuan", yuan);
        return hash;
    }

    // 充值
    @PostMapping("/money")
    @ResponseBody
    public String Money(@RequestParam int yuan){
        int[] list = {6, 30, 198, 328, 648};
        for (int j : list) {
            if (yuan == j) {
                yuan += (int) (j * 10 + j * 2.5);
            }
        }
        return String.format("{\"success\":true, \"yuan\":\"%d\"}", yuan);
    }
}
