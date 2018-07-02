package com.test.demo;

import com.test.util.ConnectionFactory;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * 用户测试UserDAO.
 * Created by hesh on 2018/4/22.
 */

public class UserDaoTest {

    public static void main(String[] args){
        Connection conn=null;

        try {
            conn= ConnectionFactory.getInstance().getConn();
            conn.setAutoCommit(false);

//            UserDao userDao=new UserDaoImpl();
//            //添加
//            User user=new User();
//            user.setName("siho");
//            user.setPassword("123");
//            user.setEmail("siho@qq.com");
//            userDao.save(conn,user);
//            System.out.println("保存完毕");
//
//            //添加
//            User user2=
//            user.setName("siho");new User();
//            user.setPassword("123");
//            user.setEmail("siho@qq.com");
//            userDao.save(conn,user);
//            System.out.println("保存完毕");
//
//            //添加
//            User user3=new User();
//            user.setName("siho");
//            user.setPassword("123");
//            user.setEmail("siho@qq.com");
//            userDao.save(conn,user);
//            System.out.println("保存完毕");
//
//            //更新
//            User he=new User();
//            he.setName("he");
//            he.setPassword("123");
//            he.setEmail("he@qq.com");
//            userDao.update(conn,11L,he);
//            System.out.println("更新完毕");
//
//            //删除
//            User delete=new User();
//            delete.setId(11L);
//            userDao.delete(conn,delete);
//            System.out.println("删除完毕");

            conn.commit();
        } catch (SQLException e) {
            e.printStackTrace();
            try {
                conn.rollback();

                System.out.println("出错，回滚");
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
        }
    }

}
