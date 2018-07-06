/**
 * Created by He on 2018/6/28.
 */

//list controller
function listCtrl($scope, $http, $location, fifaService) {
    $scope.orderProp = "-score"; //默认按票数降序排列

    //初始化数据
    fifaService.queryAll().then(function (resp) {
        if (resp.data.isSuccess) {
            $scope.players = angular.fromJson(resp.data.data);
        } else {
            //数据无效
            $scope.players = null;
            console.log("数据无效：" + resp.data.msg);
        }
    }, function (resp) {
        //失败
        $scope.players = null;
        console.log("加载失败：" + resp.status);
    });

    //删除
    $scope.removePlayer = function (ev, player) {
        ev.preventDefault();
        fifaService.deleteData(player).then(function (resp) {
            if (resp.data.isSuccess) {
                console.log("删除成功");
                $location.path("#/player/list");//更新
            } else {
                console.log("删除失败");
            }
        });
    };
}

//add controller
function addCtrl($scope, $http, $location, fifaService) {
    $scope.player = {
        id: "",
        name: "",
        position: "",
        num: "",
        team: "",
        score: "",
        imgUrl: ""
    };

    //初始化位置信息
    $scope.positions = [
        {val: "FW", txt: "前锋"},
        {val: "CMF", txt: "中前卫"},
        {val: "DMF", txt: "后腰"},
        {val: "SB", txt: "边后卫"},
        {val: "CB", txt: "中后卫"},
        {val: "GK", txt: "门将"}
    ];

    //提交表单
    $scope.submitForm = function () {
        fifaService.saveData($scope.player).then(function (resp) {
            console.log("新建成功 ？: " + resp.data.isSuccess);
            $location.path("#/player/list");
        }, function (resp) {
            console.log("新建失败");
            $location.path("#/player/list");
        });
    };
}

//edit controller
function editCtrl($scope, $http, $location, $routeParams, fifaService) {
    //初始化位置信息
    $scope.positions = [
        {val: "FW", txt: "前锋"},
        {val: "CMF", txt: "中前卫"},
        {val: "DMF", txt: "后腰"},
        {val: "SB", txt: "边后卫"},
        {val: "CB", txt: "中后卫"},
        {val: "GK", txt: "门将"}
    ];

    //获取被编辑的球员信息
    $scope.player = $scope.players[$routeParams.player.id];

    //提交表单
    $scope.submitForm = function () {
        fifaService.updaData($scope.player).then(function (resp) {
            if (resp.data.isSuccess) {
                console.log("更新成功");
            } else {
                console.log("更新失败");
            }
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
        $scope.player.score = $scope.player.score + 1;
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
        };

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