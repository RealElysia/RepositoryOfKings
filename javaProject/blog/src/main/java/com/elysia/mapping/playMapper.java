package com.elysia.mapping;

import com.elysia.entity.player;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface playMapper {
    player getInfo(int id);

    int saveNew(player pa);

    int updateInfo(player pa);
    int deleteInfo(int id);

    List<player> selectAll();
}
