package com.test.entity;

/**
 * 返回消息体
 * Created by He on 2018/7/3.
 */
public class Message<T> {

    private boolean success;//状态
    private String msg;//消息说明
    private T data;//json数据体

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
