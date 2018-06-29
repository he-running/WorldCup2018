/**
 * Created by He on 2018/6/28.
 */

//list controller
function listCtrl($scope, $http) {
    $http.get("data/players.json").then(function (resp) {
        $scope.players = resp.data;
    }, function (resp) {
        console.log("加载失败：" + resp.status);
    });

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
        {val: "PG", txt: "控球后卫"},
        {val: "SG", txt: "得分后卫"},
        {val: "SF", txt: "小前锋"},
        {val: "PF", txt: "大前锋"},
        {val: "C", txt: "中锋"}
    ];
    //初始化球队信息
    $scope.teams = ["骑士", "勇士", "尼克斯", "快船", "火箭", "篮网", "公牛", "雷霆"];

    //提交表单
    $scope.submitForm = function () {
        fifaService.getPlayerNames().then(function (data) {
            if (data.indexOf($scope.player.name) >= 0) {
                $scope.isExisted = true;
            } else {
                $http.post("/backend/actionUrl", $scope.player).then(function (resp) {
                    $location.path("#/list");
                }, function (resp) {
                    $location.path("#/list");
                });
            }
        });
    };
}

//edit controller
function editCtrl($scope, $http, $location, $routeParams) {
    //初始化位置信息
    $scope.positions = [
        {val: "PG", txt: "控球后卫"},
        {val: "SG", txt: "得分后卫"},
        {val: "SF", txt: "小前锋"},
        {val: "PF", txt: "大前锋"},
        {val: "C", txt: "中锋"}
    ];
    //初始化球队信息
    $scope.teams = ["骑士", "勇士", "尼克斯", "快船", "火箭", "篮网", "公牛", "雷霆"];

    //获取被编辑的球员信息
    $http.get("data/players.json").success(function (data) {
        var i = parseInt($routeParams.playerId) - 1;
        $scope.player = data [i];
    });

    //提交表单
    $scope.submitForm = function () {
        $http.post("/backend/actionUrl", $scope.player).then(function (resp) {
            //成功
            $location.path("#/list");
        }, function (resp) {
            //失败
            $location.path("#/list");
        });
    };
}

//view controller
function viewCtrl($scope, $http, $routeParams) {
    $http.get("data/players.json").success(function (data) {
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
        $scope.voteBtnText = "已投票";
        $scope.isVoted = true;
    };
}