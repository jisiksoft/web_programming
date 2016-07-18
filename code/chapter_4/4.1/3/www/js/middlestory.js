//-----------------------------------------------------------------
function initialize() {

    var param = { dataId:"header" };
    var result = doAjax('./data/ajax_get_data.php', param);
    $("#header").empty().html(result);

    var param = { dataId:"container" };
    var result = doAjax('./data/ajax_get_data.php', param);
    $("#container").empty().html(result);

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
