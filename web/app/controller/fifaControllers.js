/**
 * Created by He on 2018/6/28.
 */

//list controller
function listCtrl($scope, $http) {
    $http.get("data/players2.json").then(function (resp) {
        $scope.players = resp.data;
    }, function (resp) {
        console.log("加载失败：" + resp.status);
    });

    $scope.orderProp = "-votes"; //默认按票数降序排列

    //删除
    $scope.removePlayer = function (ev, id) {
        ev.preventDefault();
        angular.forEach($scope.players, function (val, key) {
            if (id === val.id) {
                $scope.players.splice(key, 1);//删除从key开始的1位
            }
        });
    };
}

//add controller
function addCtrl($scope, $http, $location, fifaService) {
    //初始化位置信息
    $scope.positions = [
        {val: "FW", txt: "前锋"},
        {val: "CMF", txt: "中前卫"},
        {val: "DMF", txt: "后腰"},
        {val: "SB", txt: "边后卫"},
        {val: "CB", txt: "中后卫"},
        {val: "GK", txt: "门将"}
    ];
    //初始化球队信息
    $scope.teams = ["英格兰", "葡萄牙", "西班牙", "比利时", "俄罗斯", "法国", "突尼斯", "乌拉圭"];

    //提交表单
    $scope.submitForm = function () {
        fifaService.getPlayerNames().then(function (data) {
            if (data.indexOf($scope.player.name) >= 0) {
                $scope.isExisted = true;
            } else {
                $http.post("/backend/actionUrl", $scope.player).then(function (resp) {
                    $location.path("#/player/list");
                }, function (resp) {
                    $location.path("#/player/list");
                });
            }
        });
    };
}

//edit controller
function editCtrl($scope, $http, $location, $routeParams) {
    //初始化位置信息
    $scope.positions = [
        {val: "FW", txt: "前锋"},
        {val: "CMF", txt: "中前卫"},
        {val: "DMF", txt: "后腰"},
        {val: "SB", txt: "边后卫"},
        {val: "CB", txt: "中后卫"},
        {val: "GK", txt: "门将"}
    ];
    //初始化球队信息
    $scope.teams = ["英格兰", "葡萄牙", "西班牙", "比利时", "俄罗斯", "法国", "突尼斯", "乌拉圭"];

    //获取被编辑的球员信息
    $http.get("data/players2.json").success(function (data) {
        var i = parseInt($routeParams.playerId) - 1;
        $scope.player = data [i];
    });

    //提交表单
    $scope.submitForm = function () {
        $http.post("/backend/actionUrl", $scope.player).then(function (resp) {
            //成功
            $location.path("#/player/list");
        }, function (resp) {
            //失败
            $location.path("#/player/list");
        });
    };
}

//view controller
function viewCtrl($scope, $http, $routeParams, fifaService) {
    $http.get("data/players2.json").success(function (data) {
        var i = parseInt($routeParams.playerId) - 1;
        $scope.player = data[i];
        if ($routeParams.playerName) {
            console.log("接收到球员名字： " + $routeParams.playerName);
        }
    });

    //获取头像图片名称
    $scope.getThumb = function (playerThumb) {
        console.log("获取头像照片名称：" + playerThumb);
    };

    //投票
    $scope.voteBtnText = "投票";
    $scope.vote = function () {
        $scope.player.votes = $scope.player.votes + 1;
        // $scope.voteBtnText = "已投票";
        // $scope.isVoted = true;

        var playerBoy = {
            id: "1",
            name: "",
            position: "",
            num: "",
            team: "",
            score: "",
            imgUrl: ""
        }

        var players = [];

        fifaService.queryById(playerBoy).then(function (resp) {
            if (resp.data.isSuccess) {
                //成功
                players = angular.fromJson(resp.data.data);
                console.log(players.length);
            } else {
                //数据无效
                console.log(resp.data.msg);
            }
        }, function (resp) {
            //错误
        });
    };


}