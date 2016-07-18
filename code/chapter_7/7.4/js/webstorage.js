
var chart = null;
var size = 90;
var flagToGetData = false;
var timeToDrawChart = 2; // 2 seconds


//----------------------------------------------------------
function startMonitoring( chartContainer ) {
	
	if (typeof(Storage) !== null) {

		if ( localStorage.getItem("time") == null ) {

			var currTime = new Date().getTime();
			
			localStorage.setItem("count", size);
			localStorage.setItem("index", 0);
			localStorage.setItem("time", currTime);
			
			for (var i=0; i<size; i++) {
				localStorage.setItem("data_"+i, '{"sin":0, "cos":0}');
			}

			flagToGetData = true;
		}

		createChart(chartContainer);
		
		getRealTimeData();
		drawRealTimeChart();
		
	} else {
		alert("브라우저가 HTML5를 지원하지 않습니다.");
	}
	
}

//----------------------------------------------------------
function createChart(chartContainer) {

	chart = new CanvasJS.Chart( chartContainer, {
					title:{
						text: "Real-Time",
						fontSize: 25
					},
					data: [{	type: "spline",
								showInLegend: true,
								lineThickness: 2,
								name: "Sin",
								markerType: "square",
								color: "#F08080",
								dataPoints: getChartData(0)
							},
							{	type: "spline",
								showInLegend: true,
								lineThickness: 2,
								name: "Cos",
								color: "#20B2AA",
								dataPoints: getChartData(1)
							}]
	});

    chart.render();
}

//----------------------------------------------------------
function getChartData(no) {

	var count = localStorage.count * 1;
	var index = localStorage.index;
	
	var result = new Array();
	var i, jsonData, value;
	
	for(i=0; i<size; i++) {
		
		if (typeof localStorage["data_"+index] !== null
			&& localStorage["data_"+index] !== null) {
			jsonData = JSON.parse(localStorage["data_"+index]);
		}
		if (no == 0) {
			value = jsonData.sin;
		} else if (no == 1) {
			value = jsonData.cos;
		}
		result.push( {x: count-(size-i+1), y:value} );
		
		index = ((index * 1) + 1) % size;
	}
	
	return result;
}

//----------------------------------------------------------
function drawRealTimeChart() {

	chart.options.data[0].dataPoints = getChartData(0);
	chart.options.data[1].dataPoints = getChartData(1);
	
	chart.render();
	
	setTimeout( drawRealTimeChart, (timeToDrawChart * 1000) );
}

//----------------------------------------------------------
function addStorageData( data ) {

	localStorage.count = (localStorage.count * 1) + 1;
	localStorage.time = new Date().getTime();
	localStorage["data_"+localStorage.index] = data;
	localStorage.index = ((localStorage.index * 1) + 1) % size;	
}

//----------------------------------------------------------
function getRealTimeData() {

	if (flagToGetData) {
		var data = doAjax('./php/ajax_get_data.php');
		addStorageData( data );
		
		setTimeout( getRealTimeData, 2000 );
		return;
	}

	var currTime = new Date().getTime();

	if ((currTime - localStorage.time) > 2500) {
		flagToGetData = true;
	}
	setTimeout( getRealTimeData, 2500 );
}

//----------------------------------------------------------
function doAjax(str_url, input_data) {
	var result;
	$.ajax({
		 url: str_url,
			    type: 'post',
			    async: false,
			    datatype: 'json',
			    data: input_data,
			    error: function() {
			     	alert('Network Error : 서버와의 연결에 문제가 있습니다.');
			    },
					success: function(obj) {
						result = obj;
					}
	});
	return result;
}
