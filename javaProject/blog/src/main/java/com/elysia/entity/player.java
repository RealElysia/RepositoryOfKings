package com.elysia.entity;

public class player {
    private int id;
    private String user;
    private String pwd;

    public player(int id, String user, String pwd){
        this.id = id;
        this.user = user;
        this.pwd = pwd;
    }
    public player(){
        this.id = 16101401;
        this.user = "shy";
        this.pwd = "121314";
    }

    public int getId(){
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Override
    public String toString(){
        return "{" + "id:" + id +
                ", user:" +'\"' + user + '\"' +
                ", pwd:" + '\"' + pwd + '\"' + "}";
    }
    @Override
    public boolean equals(Object obj){
        if (obj == this) { return true; }
        if (!(obj instanceof player py)) {return false;}
        return py.user.equals(this.user) && py.pwd.equals(this.pwd) && py.id == this.id;
    }
}
