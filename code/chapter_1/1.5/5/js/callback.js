var timer;

//-----------------------------------------------------------------
$(".button").hover(function() {
                    $( this ).css({"background-color":"purple"});
                    }, function() {
                    $( this ).css({"background-color":"#1646a7"});
                   });

//-----------------------------------------------------------------
$("#button_1").click(function() {
	repeat(0, 100);
});

$("#button_2").click(function() {
	repeat(0, 500);
});

//-----------------------------------------------------------------
repeat = function(min, max) {
	
	clearTimeout(timer);
	
	requestData(min, max, function(jsonData) {

		var obj = JSON.parse(jsonData);
		
		for (var i=0; i<7; i++) {
			var score = obj.chartData[i].score;
			var length = score * (400 / max);
			
			$("#bar_"+(i+1)).css({"width":length+"px"});
			$("#score_"+(i+1)).empty().html(score);
		}
	});
}

//-----------------------------------------------------------------
requestData = function(aMin, aMax, callback) {

	var param = { min:aMin, max:aMax };
	var jsonData = doAjax('./ajax_get_data.php', param);
	
	if (callback && typeof(callback) === "function") {
		callback(jsonData);
	}
	
	timer = setTimeout(function(){ requestData(aMin, aMax, callback); }, 2000);
}

//-----------------------------------------------------------------
doAjax = function(strUrl, inputData) {
    
    var result;
    
    $.ajax({
           url: strUrl,
           type: 'post',
           async: false,
           datatype: 'json',
           data: inputData,
           error: function() {
        	   alert('Ajax Error.');
           },
           success: function(obj) {
           result = obj;
           }
    });
    
    return result;
}
