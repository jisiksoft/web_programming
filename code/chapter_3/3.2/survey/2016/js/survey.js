
//----------------------------------------------------------
function checkRadio(objRadio){
	
	var num = objRadio.length;
	
	for (var i=0; i<num; i++) {
		if(objRadio[i].checked == true) {
			return objRadio[i].value;
		}
	}
	
	return 0;		
}

//----------------------------------------------------------
function checkCheckBox(objCheck){

	var str = '';
	var flag = false;
	
	var num = objCheck.length;
	
	for (var i=0; i<num; i++) {
		if(objCheck[i].checked == true) {
			if (flag) {
				str += '&' + objCheck[i].value;
			} else {
				str += objCheck[i].value;
			}
			flag = true;
		}
	}

	if (flag) {
		return str;
	} else {	
		return 0;	
	}	
}

//----------------------------------------------------------
function register(){
	
	var str, value;
	
	if((value = checkRadio($("input[name='q1']"))) != 0) {
		str = '##' + value;
	} else { 
		alert("Q1의 질문에 답해주시기 바랍니다."); return false; 
	}
	if((value = checkRadio($("input[name='q2']"))) != 0) {
		str += '##' + value;
	} else { 
		alert("Q2의 질문에 답해주시기 바랍니다."); return false; 
	}
	if((value = checkCheckBox($("input[name='q3']"))) != 0) {
		str += '##' + value;
	} else { 
		alert("Q3의 질문에 답해주시기 바랍니다."); return false; 
	}
	if((value = checkRadio($("input[name='q4']"))) != 0) {
		str += '##' + value;
	} else { 
		alert("Q4의 질문에 답해주시기 바랍니다."); return false; 
	}
	if((value = checkRadio($("input[name='q5']"))) != 0) {
		str += '##' + value;
	} else { 
		alert("Q5의 질문에 답해주시기 바랍니다."); return false; 
	}
	if((value = checkCheckBox($("input[name='q6']"))) != 0) {
		str += '##' + value;
	} else { 
		alert("Q6의 질문에 답해주시기 바랍니다."); return false; 
	}
	if((value = checkRadio($("input[name='q7']"))) != 0) {
		str += '##' + value;
	} else { 
		alert("Q7의 질문에 답해주시기 바랍니다."); return false; 
	}
	if((value = checkRadio($("input[name='q8']"))) != 0) {
		str += '##' + value;
	} else { 
		alert("Q8의 질문에 답해주시기 바랍니다."); return false; 
	}
	if((value = checkRadio($("input[name='q9']"))) != 0) {
		str += '##' + value;
	} else { 
		alert("Q9의 질문에 답해주시기 바랍니다."); return false; 
	}

	str += '##' + $("#q10").val() + '##' + $("#q11").val();
	
	var str2;
	
	if(value = $("#myname").val()) {
		str2 = '&&&&' + value;
	} else { 
		alert("이름을 기입해 주시기 바랍니다.."); return false; 
	}
	if(value = $("#phone").val()) {
		str2 += '##' + value;
	} else { 
		alert("핸드폰 번호를 기입해 주시기 바랍니다.."); return false; 
	}
	str2 += str;

	var param = { data : str2 };
	var data = doAjax('./ajax_save_survey.php', param);
	
    if (data == '1') {
    	location.replace("./thanks.html"); 
    }
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
			     	alert('등록이 안 되었습니다. 다시 등록해 주시기 바랍니다.');
			    },
					success: function(obj) {
						result = obj;
					}
	});
	return result;
}
