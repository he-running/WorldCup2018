/**
 * Created by He on 2018/6/28.
 */
//自定义service
angular.module("fifaApp").service("fifaService", ["$q", "$http", function ($q, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    this.getPlayerNames = function () {
        return $http.get("data/players2.json").then(function (resp) {
            if (typeof resp.data === "object") {
                var playerNames = [];
                angular.forEach(resp.data, function (val, key) {
                    console.log("第" + key + "个名字：" + val.name);
                    // playerNames.push(val.name.toLowerCase());
                    playerNames.push(val.name);
                });
                return playerNames;
            } else {
                //无效数据
                return $q.reject(resp.data);
            }
        }, function (resp) {
            //失败
            return $q.reject(resp.status);
        });
    };

    //保存新数据
    this.saveData = function (player) {
        var data = {
            opeType: '1',
            jsondata: angular.toJson(player)
        };
        return $http({
            method: 'post',
            url: 'playerServlet',
            data: $.param(data)
        });
    };

    //更新数据
    this.updaData = function (player) {
        var data = {
            opeType: '2',
            jsondata: angular.toJson(player)
        };
        return $http({
            method: 'post',
            url: 'playerServlet',
            data: $.param(data)
        });
    };

    //删除数据
    this.deleteData = function (player) {
        var data = {
            opeType: '3',
            jsondata: angular.toJson(player)
        };
        return $http({
            method: 'post',
            url: 'playerServlet',
            data: $.param(data)
        });
    };

    //查找全部数据
    this.queryAll = function () {
        var data = {
            opeType: '4',
            jsondata: ''
        };
        return $http({
            method: 'post',
            url: 'playerServlet',
            data: $.param(data),
            cache:true
        });
    };

    //查询数据单条数据
    this.queryById = function (player) {
        var data = {
            opeType: '5',
            jsondata: angular.toJson(player)
        };
        return $http({
            method: 'post',
            url: 'playerServlet',
            data: $.param(data)
        });
    };
}]);