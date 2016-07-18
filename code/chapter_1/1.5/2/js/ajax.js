
$("#button").hover(function() {
                    $( this ).css({"background-color":"purple"});
                    }, function() {
                    $( this ).css({"background-color":"#1646a7"});
                   });

$("#button").click(function() {
	var aName = $("#name").val();
	var aId = $("#id").val();
	var param = { name:aName, id:aId };
	var result = doAjax('./post_method.php', param);
	$("#message").empty().html(result);
});

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
