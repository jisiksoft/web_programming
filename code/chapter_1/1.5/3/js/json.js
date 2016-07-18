var object = {"chart1":[{"score":67},{"score":35}], "chart2":[{"score":89},{"score":72}]};

$("#variable_1").click(function() {
	var result = object.chart2[1].score;
	$(this).append(result);
 });
$("#variable_2").click(function() {
	var result = object.chart1[1];
	result = JSON.stringify(result);	//JSON.stringify() 함수는 JSON 데이터를 문자열고 변환한다.
	$(this).append(result);
 });
$("#variable_3").click(function() {
	var result = object.chart2;
	result = JSON.stringify(result);
	$(this).append(result);
 });
$("#variable_4").click(function() {
	var result = object;
	result = JSON.stringify(result);
	$(this).append(result);
 });
$("#variable_5").click(function() {
	var result = object.chart1;
	result = JSON.stringify(result);
	$(this).append(result);
 });
$("#variable_6").click(function() {
	var result = object.chart1[0];
	result = JSON.stringify(result);
	$(this).append(result);
 });
$("#variable_7").click(function() {
	var result = object.chart1[0].score;
	$(this).append(result);
 });
