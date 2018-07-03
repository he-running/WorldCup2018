package com.test.demo;

import com.test.dao.PlayerDao;
import com.test.dao.impl.PlayerDaoImpl;
import com.test.entity.Player;
import com.test.util.ConnectionFactory;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by He on 2018/7/2.
 */
public class PlayerDaoTest {
    private Connection conn = null;

    private PlayerDao playerDao = new PlayerDaoImpl();

    public PlayerDaoTest() {

    }

    private void initConn() {
        if (conn == null) {
            conn = ConnectionFactory.getInstance().getConn();
        }
    }

    public void close() {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean saveData(String name, String position, String num, String team, String score, String imgUrl) {
        try {
            initConn();
            Player player = new Player();
            player.setName(name);
            player.setPosition(position);
            player.setNum(num);
            player.setTeam(team);
            player.setScore(score);
            player.setImgUrl(imgUrl);
            playerDao.save(conn, player);
            conn.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean updateData(String id, String name, String position, String num, String team, String score, String imgUrl) {
        try {
            initConn();
            Player player = new Player();
            player.setId(Integer.parseInt(id));
            player.setName(name);
            player.setPosition(position);
            player.setNum(num);
            player.setTeam(team);
            player.setScore(score);
            player.setImgUrl(imgUrl);
            playerDao.update(conn, player);
            conn.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteData(String id){
        try {
            initConn();
            playerDao.delete(conn, id);
            conn.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public List<Player> queryAll() {
        try {
            initConn();
            List<Player> playerList = new ArrayList<>();
            ResultSet rs = playerDao.queryAll(conn);

            while (rs.next()) {
                Player player = new Player();
                player.setId(rs.getInt("id"));
                player.setName(rs.getString("name"));
                player.setPosition(rs.getString("position"));
                player.setNum(rs.getString("num"));
                player.setTeam(rs.getString("team"));
                player.setScore(rs.getString("score"));
                player.setImgUrl(rs.getString("imgUrl"));

                playerList.add(player);
            }
            rs.close();
            return playerList;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public Player queryById(String id) {
        try {
            initConn();
            Player player = new Player();
            ResultSet rs = playerDao.queryById(conn,id);

            if (rs.first()) {
                player.setId(rs.getInt("id"));
                player.setName(rs.getString("name"));
                player.setPosition(rs.getString("position"));
                player.setNum(rs.getString("num"));
                player.setTeam(rs.getString("team"));
                player.setScore(rs.getString("score"));
                player.setImgUrl(rs.getString("imgUrl"));
            }
            rs.close();
            return player;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
