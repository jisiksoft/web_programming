var timerMove = null;  //a global variable for timer event
var timerMake = null; 

var currMenu = "menu_1";
var currSubMenu = "smenu_1_1";
var currPage = "smenu_1_1";

//-----------------------------------------------------------------
function mouseOverMenu(mId) {
    $("#"+currMenu).css({ "color": "#666666" });
    $("#s"+currMenu).css({ "display": "none" });
    $("#"+mId).css({ "color": "#1646a7" });
    $("#s"+mId).css({ "display": "block" });
    currMenu = mId;
}

function clickedMenu(mId) {
	
    clickedSubMenu('s'+mId+'_1');
}

//-----------------------------------------------------------------
function mouseOverSubMenu(smId) {
    $("#"+smId).css({ "color": "#ffffff", "background-color": "#1646a7" });
    currSubMenu = smId;
}

function mouseOutSubMenu(smId) {
    if (currPage != currSubMenu) {
        $("#"+smId).css({ "color": "#1646a7", "background-color": "#ffffff" });
    }
}

function clickedSubMenu(smId) {
	
	clearTimeout(timerMove);
	clearTimeout(timerMake);
	
    $("#"+currPage).css({ "color": "#1646a7", "background-color": "#ffffff" });
    $("#"+smId).css({ "color": "#ffffff", "background-color": "#1646a7" });
    currPage = smId;
    
    var param = { dataId:smId };
    var result = doAjax('./data/ajax_get_data.php', param);
    $("#container").empty().html(result);
}

//-----------------------------------------------------------------
var currContainerMain;

function mouseOverContainerMenu(cmId) {
    $("#"+cmId).css({ "color": "#ffffff", "background-color": "#1646a7" });
}

function mouseOutContainerMenu(cmId) {
    if (cmId != currContainerMain) {
        $("#"+cmId).css({ "color": "#1646a7", "background-color": "#ffffff" });
    }
}

function clickedContainerMenu(cmId) {

	clearTimeout(timerMove);
	clearTimeout(timerMake);
	
    $("#"+currContainerMain).css({ "color": "#1646a7", "background-color": "#ffffff" });
    $("#"+cmId).css({ "color": "#ffffff", "background-color": "#1646a7" });
    currContainerMain = cmId;
    
    var param = { dataId: currPage + "/" + cmId };
    var result = doAjax('./data/ajax_get_data.php', param);
    $("#container_second").empty().html(result);
}

//-----------------------------------------------------------------
function initialize() {

    var param = { dataId:"header" };
    var result = doAjax('./data/ajax_get_data.php', param);
    $("#header").empty().html(result);
    
    var param = { dataId:"info" };
    var result = doAjax('./data/ajax_get_data.php', param);
    $("#info").empty().html(result);

	mouseOverMenu("menu_1");
	clickedSubMenu("smenu_1_1");
	
    var param = { dataId:"footer" };
    var result = doAjax('./data/ajax_get_data.php', param);
    $("#footer").empty().html(result);
}

//-----------------------------------------------------------------
function doAjax(strUrl, inputData) {
    
    var result;
    
    $.ajax({
           url: strUrl,
           type: 'post',
           async: false,
           datatype: 'json',
           data: inputData,
           error: function() {
        	   alert('Use Chrome or FireFox instead of Explorer.');
           },
           success: function(obj) {
           result = obj;
           }
           });
    return result;
}
