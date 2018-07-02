package com.test.dao.impl;

import com.test.dao.PlayerDao;
import com.test.entity.Player;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by He on 2018/7/1.
 */
public class PlayerDaoImpl implements PlayerDao {

    private String tb_name = "tb_goal_score";

    @Override
    public void save(Connection conn, Player player) throws SQLException {
        StringBuffer sql = new StringBuffer("insert into ").append(tb_name)
                .append(" (name,position,num,team,score,imgUrl)").append(" values").append(" (?,?,?,?,?,?)");
        PreparedStatement ps = conn.prepareStatement(sql.toString());
        ps.setString(1, player.getName());
        ps.setString(2, player.getPosition());
        ps.setString(3, player.getNum());
        ps.setString(4, player.getTeam());
        ps.setString(5, player.getScore());
        ps.setString(6, player.getImgUrl());

        ps.execute();
    }

    @Override
    public void update(Connection conn, Player player) throws SQLException {
        StringBuffer sql = new StringBuffer("update ").append(tb_name).append(" set")
                .append(" name=?,position=?,num=?,team=?,score=?,imgUrl=?")
                .append(" where id=?");
        PreparedStatement ps = conn.prepareStatement(sql.toString());
        ps.setString(1, player.getName());
        ps.setString(2, player.getPosition());
        ps.setString(3, player.getNum());
        ps.setString(4, player.getTeam());
        ps.setString(5, player.getScore());
        ps.setString(6, player.getImgUrl());
        ps.setString(7, String.valueOf(player.getId()));

        ps.execute();
    }

    @Override
    public void delete(Connection conn, String id) throws SQLException {
        StringBuffer sql = new StringBuffer("delete").append(" from").append(tb_name).append(" where id=?");
        PreparedStatement ps = conn.prepareStatement(sql.toString());
        ps.setInt(1, Integer.parseInt(id));

        ps.execute();
    }

    @Override
    public ResultSet queryAll(Connection conn) throws SQLException {
        StringBuffer sql = new StringBuffer("select * from ").append(tb_name);
        return conn.prepareStatement(sql.toString()).executeQuery();
    }

    @Override
    public ResultSet queryById(Connection conn, String id) throws SQLException {
        StringBuffer sql = new StringBuffer("select * from ").append(tb_name)
                .append(" where id = ?");
        PreparedStatement ps = conn.prepareStatement(sql.toString());
        ps.setInt(1, Integer.parseInt(id));

        return ps.executeQuery();
    }

}
