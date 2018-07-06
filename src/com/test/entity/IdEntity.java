package com.test.entity;

import java.io.Serializable;

/**
 * 所有实体类的父类，主键定义
 * Created by hesh on 2018/4/22.
 */

public abstract class IdEntity implements Serializable{

    protected String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
