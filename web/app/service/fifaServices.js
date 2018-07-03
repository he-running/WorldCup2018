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

    //保存数据
    this.saveData = function (player) {
        //全都使用键值对传输

        //使用json传输
        var opeType = "1";
        var jsondata = player.toJSON();

        $http({
            method: 'POST',
            url: 'playerServlet',
            data: {
                opeType: opeType,
                jsonData: jsondata
            }
        }).then(function (resp) {
            //返回成功
            if (resp.data.success) {
                console.log("成功");
            } else {
                console.log("数据无效");
            }
        }, function (resp) {
            //失败
            console.log("失败：" + resp.status);
        });
    };

    //查询数据单条数据
    this.queryById = function (player) {
        var data = {
            opeType: "5",
            jsondata: angular.toJson(player)
        };
       return $http({
            method: 'post',
            url: 'playerServlet',
            data: $.param(data)
        });
    };
}]);