package com.test.demo;

import com.google.gson.Gson;
import com.test.entity.Message;
import com.test.entity.Player;
import org.eclipse.jdt.internal.compiler.lookup.SourceTypeCollisionException;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by He on 2018/7/2.
 */
public class PlayerServlet extends HttpServlet {

    private PlayerDaoTest playerDaoTest = new PlayerDaoTest();

    //返回数据
    private Message message;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            //初始化配置
            req.setCharacterEncoding("UTF-8");
            resp.setCharacterEncoding("UTF-8");
            resp.setStatus(200);
            Gson gson = new Gson();

            //读取数据，前端传过来的值是键值对
            String opeType = req.getParameter("opeType");//操作类型

            //前端使用json传输数据
            String json = req.getParameter("jsondata");//使用json传递数据
            Player player = gson.fromJson(json, Player.class);

            String id = player.getId()+"";
            String name = player.getName();
            String position = player.getPosition();
            String num = player.getNum();
            String team = player.getTeam();
            String score = player.getScore();
            String imgUrl = player.getImgUrl();
            //根据操作类型，进行相应的数据库CRUD
            message=new Message();
            switch (opeType) {
                case "1":
                    //新建
                    message.setSuccess(playerDaoTest.saveData(name, position, num, team, score, imgUrl));
                    break;
                case "2":
                    //更新
                    message.setSuccess(playerDaoTest.updateData(id, name, position, num, team, score, imgUrl));
                    break;
                case "3":
                    //删除
                    message.setSuccess(playerDaoTest.deleteData(id));
                    break;
                case "4":
                    //查找全部
                    List<Player> playerList = playerDaoTest.queryAll();
                    if (playerList == null || playerList.size() <= 0) {
                        message.setSuccess(false);
                        message.setMsg("没有数据！");
                    } else {
                        message.setSuccess(true);
                        message.setData(playerList);
                    }
                    break;
                case "5":
                    //查找单个
                    Player mPlayer = playerDaoTest.queryById(id);
                    if (mPlayer == null) {
                        message.setSuccess(false);
                        message.setMsg("没有数据！");
                    } else {
                        message.setSuccess(true);
                        message.setData(mPlayer);
                    }
                    break;
                default:
                    message.setSuccess(false);
                    message.setMsg("没有数据！");
                    break;
            }
            //printWriter输出数据
            PrintWriter printWriter = resp.getWriter();
            String jsonData = gson.toJson(message);
            printWriter.print(jsonData);
            System.out.println("传输数据给前端完毕!");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("-------出错啦------");
        }

    }
}
