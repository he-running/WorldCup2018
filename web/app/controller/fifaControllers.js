/**
 * Created by He on 2018/6/28.
 */

//list controller
function listCtrl($scope, $http, $location, fifaService) {
    $scope.orderProp = "-score"; //默认按票数降序排列

    //初始化数据
    fifaService.queryAll().then(function (resp) {
        if (resp.data.success) {
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
            if (resp.data.success) {
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

    fifaService.queryAll().then(function (resp) {
        if (resp.data.success) {
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

    $scope.isExisted = function () {
        angular.forEach($scope.players,function (val,key) {
           if (val.name == $scope.player.name) {
               return true;
           }
        });
        return false;
    };

    //提交表单
    $scope.addSuccess = false;
    $scope.addFinished = false;
    $scope.submitForm = function () {
        fifaService.saveData($scope.player).then(function (resp) {
            //success
            if (resp.data.success) {
                $scope.addSuccess = true;
            } else {
                //无效
                $scope.addSuccess = false;
            }
            $scope.addFinished = true;
        }, function (resp) {
            //error
            $scope.addSuccess = false;
            $scope.addFinished = true;
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

    //初始化
    $scope.player = {
        id: $routeParams.playerId,
        name: "",
        position: "",
        num: "",
        team: "",
        score: "",
        imgUrl: ""
    };

    fifaService.queryById($scope.player).then(function (resp) {
        if (resp.data.success) {
            //成功
            $scope.player = angular.fromJson(resp.data.data);
            console.log($scope.player.name);
        } else {
            //数据无效
            console.log(resp.data.msg);
        }
    }, function (resp) {
        //错误
        console.log(resp.status);
    });

    //提交表单
    $scope.updateSuccess = false;
    $scope.updateFinished = false;
    $scope.submitForm = function () {
        fifaService.updaData($scope.player).then(function (resp) {
            //success
            if (resp.data.success) {
                $scope.updateSuccess = true;
            } else {
                //无效
                $scope.updateSuccess = false;
            }
            $scope.updateFinished = true;
        }, function (resp) {
            //error
            $scope.updateSuccess = false;
            $scope.updateFinished = true;
        });
    };

}

//view controller
function viewCtrl($scope, $http, $routeParams, fifaService) {
    //初始化
    $scope.player = {
        id: $routeParams.playerId,
        name: "",
        position: "",
        num: "",
        team: "",
        score: "",
        imgUrl: ""
    };

    fifaService.queryById($scope.player).then(function (resp) {
        if (resp.data.success) {
            //成功
            $scope.player = angular.fromJson(resp.data.data);
            console.log($scope.player.name);
        } else {
            //数据无效
            console.log(resp.data.msg);
        }
    }, function (resp) {
        //错误
        console.log(resp.status);
    });

    //添加进球
    $scope.shootSuccess = false;
    $scope.shootFinished = false;
    $scope.scoreBtnText = "进球+";
    $scope.score = function () {
        $scope.player.score = parseInt($scope.player.score) + 1;
        $scope.scoreBtnText = "射门...";
        fifaService.updaData($scope.player).then(function (resp) {
            //success
            $scope.scoreBtnText = "进球+";
            if (resp.data.success) {
                $scope.shootSuccess = true;
            } else {
                //无效
                $scope.shootSuccess = false;
            }
            $scope.shootFinished = true;
        }, function (resp) {
            //error
            $scope.scoreBtnText = "进球+";
            $scope.shootSuccess = false;
            $scope.shootFinished = true;
            // window.alert("进球无效！");
        });
    };

}