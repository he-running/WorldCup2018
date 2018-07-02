/**
 * Created by He on 2018/6/28.
 */
//自定义service
angular.module("fifaApp").service("fifaService",["$q", "$http", function ($q,$http) {
    this.getPlayerNames = function () {
        return $http.get("data/players2.json").then(function (resp) {
           if (typeof resp.data === "object") {
               var playerNames = [];
               angular.forEach(resp.data,function (val, key) {
                   console.log("第"+key+"个名字："+val.name);
                   // playerNames.push(val.name.toLowerCase());
                   playerNames.push(val.name);
               });
               return playerNames;
           } else {
               //无效数据
               return $q.reject(resp.data);
           }
        },function (resp) {
            //失败
            return $q.reject(resp.status);
        });
    };
}]);