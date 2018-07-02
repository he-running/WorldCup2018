package com.test.demo;

import com.test.dao.PlayerDao;
import com.test.dao.impl.PlayerDaoImpl;
import com.test.entity.Player;
import com.test.util.ConnectionFactory;
import jdk.nashorn.internal.runtime.ECMAException;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by He on 2018/7/2.
 */
public class PlayerDaoTest {
    private static Connection conn = null;

    private static PlayerDao playerDao = new PlayerDaoImpl();

    private static Player player = new Player();

    public static void main(String[] args) {
        try {
            conn = ConnectionFactory.getInstance().getConn();
            conn.setAutoCommit(false);

            Player player = new Player();
            player.setName("C-Ronaldo");
            player.setPosition("FW");
            player.setNum("7");
            player.setTeam("葡萄牙");
            player.setScore("3");
            player.setImgUrl("");

            playerDao.save(conn, player);
            conn.commit();
        } catch (Exception e) {
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
        }
    }

    public static void saveData(String name, String position, String num, String team, String score, String imgUrl) throws SQLException {
        player.setName(name);
        player.setPosition(position);
        player.setNum(num);
        player.setTeam(team);
        player.setScore(score);
        player.setImgUrl(imgUrl);

        playerDao.save(conn, player);
    }

    public static void updateData(String id, String name, String position, String num, String team, String score,
                                  String imgUrl) throws SQLException {
        player.setId(Integer.parseInt(id));
        player.setName(name);
        player.setPosition(position);
        player.setNum(num);
        player.setTeam(team);
        player.setScore(score);
        player.setImgUrl(imgUrl);

        playerDao.update(conn, player);
    }

    public static void deleteData(String id) throws SQLException {
        playerDao.delete(conn, id);
    }

    public static ResultSet queryAll() throws SQLException {
        return playerDao.queryAll(conn);
    }

    public static ResultSet queryById(String id) throws SQLException {
        return playerDao.queryById(conn, id);
    }
}
