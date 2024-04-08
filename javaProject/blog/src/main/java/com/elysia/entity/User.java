package com.elysia.entity;

public class User {
    private String name; // 名字
    private String mark; // 刻印/神之眼
    private String id;
    private String firstSight; // 初次见面，打个招呼
    private String heroName; // 称号
    // 无参数时默认的构造方法
    public User(){
        this.id = "2";
        this.mark = "「真我」";
        this.name = "爱莉希雅";
        this.firstSight = "如你所见爱丽希雅就是这样一位如飞花般绚烂的少女";
        this.heroName = "无瑕之人";
    }
    public User(String id, String mark, String name, String firstSight, String heroName){
        this.name = name;
        this.id = id;
        this.mark = mark;
        this.heroName = heroName;
        this.firstSight = firstSight;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getMark() {
        return mark;
    }
    public void setMark(String mark) {
        this.mark = mark;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getFirstSight() {
        return firstSight;
    }
    public void setBless(String firstSight) {
        this.firstSight = firstSight;
    }

    public String getHeroName() {
        return heroName;
    }
    public void setHeroName(String heroName) {
        this.heroName = heroName;
    }
}
