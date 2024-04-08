package com.elysia.config;

public class JsonResult<T> {
    private T data;
    private String code;
    private String msg;
    // 无数据返回的默认情况
    public JsonResult(){
        this.code = "0";
        this.msg = "操作成功！";
    }
    // 无数据返回指定的参数
    public JsonResult(String code, String msg){
        this.code = code;
        this.msg = msg;
    }
    // 存在数据返回的默认响应
    public JsonResult(T data){
        this.data = data;
        this.code = "0";
        this.msg = "操作成功！";
    }
    // 存在数据返回的指定响应
    public JsonResult(T data, String msg){
        this.data = data;
        this.code = "0";
        this.msg = msg;
    }
    public T getData(){
        return data;
    }
    public void setData(T data){
        this.data = data;
    }
    public String getCode(){
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
