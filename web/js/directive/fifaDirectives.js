/**
 * Created by He on 2018/6/28.
 */
//验证球员号码
angular.module("fifaApp").directive("valPlayerNum", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, mCtrl) {
            function valPlayerNum(value) {
                if (/^([1-9]\d|\d)$/.test(value)) {
                    mCtrl.$setValidity('playerNum', true);
                } else {
                    mCtrl.$setValidity('playerNum', false);
                }
                return value;
            }
            mCtrl.$parsers.push(valPlayerNum);
        }
    };
});