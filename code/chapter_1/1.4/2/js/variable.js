
$("#variable_1").click(function() {
	var value = 5;
	value = value + 2;
	$(this).append(value);
 });
$("#variable_2").click(function() {
	var value = "5";
	value = value + 2;
	$(this).append(value);
 });
$("#variable_3").click(function() {
	var value = 5;
	value = value + "2";
	$(this).append(value);
 });
$("#variable_4").click(function() {
	var value = "5";
	value = (value * 1) + 2;
	$(this).append(value);
 });
$("#variable_5").click(function() {
	var value = "text";
	value = value + 2;
	$(this).append(value);
 });
$("#variable_6").click(function() {
	var value = "text";
	value = (value * 1) + 2;
	$(this).append(value);
 });
