/**
 * Created by He on 2018/6/28.
 */
var fifaApp=angular.module("fifaApp",["ngRoute"]);

//路由配置
fifaApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/player/list", {
        templateUrl: "tmpl/player/list.html",
        controller: listCtrl
    }).when("/player/view/:playerId", {
        templateUrl: "tmpl/player/view.html",
        controller: viewCtrl
    }).when("/player/view/:playerId/:playerName", {
        templateUrl: "tmpl/player/view.html",
        controller: viewCtrl
    }).when("/player/add", {
        templateUrl: "tmpl/player/add.html",
        controller: addCtrl
    }).when("/player/edit/:playerId", {
        templateUrl: "tmpl/player/edit.html",
        controller: editCtrl
    }).otherwise({
        redirectTo: "/player/list"
    });
}]);