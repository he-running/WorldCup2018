package com.test.dao;

import com.test.entity.Player;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by He on 2018/7/1.
 */
public interface PlayerDao {

    /**
     * 保存数据
     * @param conn
     * @param player
     * @throws SQLException
     */
    void save(Connection conn, Player player) throws SQLException;

    /**
     * 更新数据
     * @param conn
     * @param player
     * @throws SQLException
     */
    void update(Connection conn, Player player) throws SQLException;

    /**
     * 删除数据
     * @param conn
     * @param id
     * @throws SQLException
     */
    void delete(Connection conn,String id) throws SQLException;

    /**
     * 查询数据
     * @param conn
     * @return
     * @throws SQLException
     */
    ResultSet queryAll (Connection conn) throws SQLException;

    /**
     * 通过ID查询数据
     * @param conn
     * @param id
     * @return
     * @throws SQLException
     */
    ResultSet queryById (Connection conn, String id) throws SQLException;
}
