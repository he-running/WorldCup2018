/**
 * Created by He on 2018/6/28.
 */
//格式化球员位置
angular.module("fifaApp").filter("posFilter", function() {
    return function(val) {
        var pos = "Unknown";
        switch (val) {
            // case "PG":
            //     pos = "控球后卫(PG)";
            //     break;
            // case "SG":
            //     pos = "得分后卫(SG)";
            //     break;
            // case "SF":
            //     pos = "小前锋(SF)";
            //     break;
            // case "PF":
            //     pos = "大前锋(PF)";
            //     break;
            // case "C":
            //     pos = "中锋(C)";
            //     break;
            // default:
            //     break;
            case "FW":
                pos = "前锋(FW)";
                break;
            case "CMF":
                pos = "中前卫(CMF)";
                break;
            case "DMF":
                pos = "后腰(DMF)";
                break;
            case "SB":
                pos = "边后卫(SB)";
                break;
            case "CB":
                pos = "中后卫(CB)";
                break;
            case "GK":
                pos = "门将(GK)";
                break;
            default:
                break;
        }
        return pos;
    }
});