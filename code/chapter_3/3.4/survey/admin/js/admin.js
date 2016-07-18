
var dataPerson = new Array();  //this array has every research data.
	
var aChart = new Array();

var arrNumQuestion = [ 6 , 3, 6, 2, 6, 7, 4, 5, 5 ];

window.onload = function(){
	
	getCountData();
};

//----------------------------------------------------------
function getCountData(){
	
	data = doAjax('ajax_get_count.php');

	$('#count').html(data);

	setTimeout(getCountData,5000);

}

//----------------------------------------------------------
function downloadFile(){

	var passwd = $("#passwd").val();
	
	window.location = './download_file.php?password='+passwd;
}

//----------------------------------------------------------
function drawChart() {
	
	var i, j, temp;
	
	var numQuestion = 9;
	var numAnswer = 10;
	
	var answer = new Array();
	
	for (i=0; i<numQuestion; i++) {		//initialize answers
		answer[i] = new Array();
		for (j=0; j<numAnswer; j++) {
			answer[i][j] = 0;
		}
	}
	
	for (i=0; i<dataPerson.length; i++) {
		answer[0][dataPerson[i][2]-1] += 1;
		answer[1][dataPerson[i][3]-1] += 1;
		
		temp = dataPerson[i][4].split('&');
		for(j=0; j<temp.length; j++) {
			answer[2][temp[j]-1] += 1;
		}
		
		answer[3][dataPerson[i][5]-1] += 1;
		answer[4][dataPerson[i][6]-1] += 1;
		
		temp = dataPerson[i][7].split('&');
		for(j=0; j<temp.length; j++) {
			answer[5][temp[j]-1] += 1;
		}
		answer[6][dataPerson[i][8]-1] += 1;
		answer[7][dataPerson[i][9]-1] += 1;
		answer[8][dataPerson[i][10]-1] += 1;
	}

	var dataChart;
	
	for (i=0; i<numQuestion; i++) {
		dataChart = '[';
		for (j=0; j<arrNumQuestion[i]; j++) {
			if (j != 0) { dataChart += ','; }
			dataChart += '{x:'+(j+1)+',y:'+answer[i][j]+'}';
		}
		dataChart += ']';
		
		aChart[i] = new CanvasJS.Chart("chart"+(i+1),
 				{
 					animationEnabled: true,
 					data: [
 					       {
 					    	   type: "column",
 					    	   dataPoints: eval(dataChart)
 					       }
 					      ]
 				});

 		aChart[i].render();
	}

}

//----------------------------------------------------------
function getAllData(){
	
	var passwd = $("#passwd").val();
	
	var param = { password : passwd };

	data = doAjax('ajax_get_alldata.php', param);

	if (data == 0) {
		alert("Error: 올바른 비밀번호를 입력하세요.");
		return false;
	}
	
	var people = data.split('&&&&');
	
	for (var i=0; i<people.length-1; i++) {
		dataPerson[i] = people[i+1].split('##');
	}
	
	drawChart();
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
