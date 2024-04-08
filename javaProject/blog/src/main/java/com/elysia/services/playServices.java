package com.elysia.services;

import com.elysia.entity.player;
import com.elysia.mapping.playMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class playServices {
    @Autowired
    private playMapper play;

    public player getInfo(int id){
        return play.getInfo(id);
    }

    public int deleteInfo(int id){
        return play.deleteInfo(id);
    }

    public int updateInfo(player pa){
        return play.updateInfo(pa);
    }

    public int saveNew(player pa){
        return play.saveNew(pa);
    }

    public List<player> All(){return  play.selectAll();}
}
