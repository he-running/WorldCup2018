/**
 * Created by He on 2018/6/28.
 */
var fifaApp=angular.module("fifaApp",["ngRoute"]);

//路由配置
fifaApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/list", {
        templateUrl: "tpls/list.html",
        controller: listCtrl
    }).when("/view/:playerId",{
        templateUrl:"tpls/view.html",
        controller:viewCtrl
    }).when("/view/:playerId/:playerName",{
        templateUrl:"tpls/view.html",
        controller:viewCtrl
    }).when("/add",{
        templateUrl:"tpls/add.html",
        controller:addCtrl
    }).when ("/edit/:playerId",{
        templateUrl:"tpls/edit.html",
        controller:editCtrl
    }).otherwise({
        redirectTo:"/list"
    });
}]);