package com.test.entity;

import java.io.Serializable;

/**
 * 所有实体类的父类，主键定义
 * Created by hesh on 2018/4/22.
 */

public abstract class IdEntity implements Serializable{

    protected int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
