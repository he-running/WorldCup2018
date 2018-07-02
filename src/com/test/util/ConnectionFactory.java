package com.test.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;


/**
 * 通用数据库连接工厂
 * Created by hesh on 2018/4/22.
 */

public class ConnectionFactory {

    private static String driver;
    private static String dburl;
    private static String user;
    private static String password;

    private static final ConnectionFactory factory = new ConnectionFactory();
    private static Connection conn = null;

    static {
        Properties pro = new Properties();
        try {
            InputStream is = ConnectionFactory.class.getClassLoader()
                    .getResourceAsStream("dbconfig.properties");
            pro.load(is);
        } catch (IOException e) {
            e.printStackTrace();
        }

        driver = pro.getProperty("driver");
        dburl = pro.getProperty("dburl");
        user = pro.getProperty("user");
        password = pro.getProperty("password");
    }

    private ConnectionFactory() {

    }

    public static ConnectionFactory getInstance() {
        return factory;
    }

    public Connection getConn() {

        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            conn = DriverManager.getConnection(dburl, user, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return conn;
    }
}
