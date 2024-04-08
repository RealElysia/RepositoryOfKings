package com.elysia.mapping;

import com.elysia.entity.User;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface UserMapper {
    // 查询
    User getUserById(String id);
    // 查询所有信息
    List<User> selectAll();
    // 新增
    int saveNew(User user);
    // 修改
    int update(User user);
    // 删除
    int delete(String id);
}
