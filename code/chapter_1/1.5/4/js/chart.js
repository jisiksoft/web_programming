var repeat;

$(".button").hover(function() {
                    $( this ).css({"background-color":"purple"});
                    }, function() {
                    $( this ).css({"background-color":"#1646a7"});
                   });

$("#button_1").click(function() {
	drawChart();
});

$("#button_2").click(function() {
	clearInterval(repeat);
	
	drawChart();
	repeat = setInterval(function(){ drawChart(); }, 2000);
});

//-----------------------------------------------------------------
function drawChart() {

	var jsonData = doAjax('./ajax_get_data.php');
	
	var obj = JSON.parse(jsonData);
	
	for (var i=0; i<7; i++) {
		var score = obj.chartData[i].score;
		var length = score * 4;
		
		$("#bar_"+(i+1)).css({"width":length+"px"});
		$("#score_"+(i+1)).empty().html(score);
	}
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
        	   alert('Ajax Error.');
           },
           success: function(obj) {
           result = obj;
           }
    });
    
    return result;
}
