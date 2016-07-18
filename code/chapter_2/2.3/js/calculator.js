
var decimalPlace = 0;
var firstOperand = 0;
var secondOperand = null;
var operator = null;

pressBtn = function(input) {
    
    if (input == 'clear') {
        
        decimalPlace = 0;
        firstOperand = 0;
        secondOperand = null;
        operator = null;
        adjustResultSize(firstOperand);
        $("#result").empty().html(firstOperand);
        
    } else if ((input >= 0) && (input <= 9)) {
        
        if (operator == null) {
            if (decimalPlace == 0) {
                firstOperand = (firstOperand * 10) + (input * 1);
            } else {
                var temp = 1;
                for (var i=0; i<decimalPlace; i++) {
                    temp = temp * 0.1;
                }
                firstOperand = firstOperand + (input * temp);
                decimalPlace += 1;
            }
            adjustResultSize(firstOperand);
            $("#result").empty().html(firstOperand);
        } else {
            if (decimalPlace == 0) {
                secondOperand = (secondOperand * 10) + (input * 1);
            } else {
                var temp = 1;
                for (var i=0; i<decimalPlace; i++) {
                    temp = temp * 0.1;
                }
                secondOperand = secondOperand + (input * temp);
                decimalPlace += 1;
            }
            adjustResultSize(secondOperand);
            $("#result").empty().html(secondOperand);
        }
        
    } else if (input == '.') {
        
        if (decimalPlace == 0)
            decimalPlace = 1;
        
    } else if (input == 'sign') {
        
        if (operator == null) {
            firstOperand = firstOperand * '-1';
            adjustResultSize(firstOperand);
            $("#result").empty().html(firstOperand);
        } else {
            secondOperand = secondOperand * '-1';
            adjustResultSize(secondOperand);
            $("#result").empty().html(secondOperand);
        }
        
    } else if (input == 'percent') {
        
        if (operator == null) {
            firstOperand = firstOperand * 0.01;
            adjustResultSize(firstOperand);
            $("#result").empty().html(firstOperand);
        } else {
            secondOperand = secondOperand * 0.01;
            adjustResultSize(secondOperand);
            $("#result").empty().html(secondOperand);
        }
        
    } else if (input == 'divide') {
        
        operator = '/';
        secondOperand = 0;
        decimalPlace = 0;
        
    } else if (input == 'multiply') {
        
        operator = '*';
        secondOperand = 0;
        decimalPlace = 0;
        
    } else if (input == 'minus') {
        
        operator = '-';
        secondOperand = 0;
        decimalPlace = 0;
        
    } else if (input == 'plus') {
        
        operator = '+';
        secondOperand = 0;
        decimalPlace = 0;
        
    } else if (input == 'equal') {
        
        if (operator == null) {
            return;
        } else if (operator == '/') {
            if (secondOperand == 0)
                return;
            firstOperand = firstOperand / secondOperand;
        } else if (operator == '*') {
            firstOperand = firstOperand * secondOperand;
        } else if (operator == '-') {
            firstOperand = firstOperand - secondOperand;
        } else if (operator == '+') {
            firstOperand = firstOperand + secondOperand;
        }
        adjustResultSize(firstOperand);
        $("#result").empty().html(firstOperand);
        decimalPlace = checkDecimalPlace(firstOperand);
        secondOperand = null;
        operator = null;
    }
}

checkDecimalPlace = function(input) {
    var num = input + '.';
    var value = num.split('.')[1].toString().length;
    return value;
}

adjustResultSize = function(input) {
    //var num = input + '';
    var len = input.toString().length;
    if (len < 9) {
        $("#result").css("font-size","50px");
    } else if (len < 10) {
        $("#result").css("font-size","45px");
    } else if (len < 11) {
        $("#result").css("font-size","40px");
    } else if (len < 12) {
        $("#result").css("font-size","37px");
    } else if (len < 13) {
        $("#result").css("font-size","34px");
    } else if (len < 14) {
        $("#result").css("font-size","31px");
    } else if (len < 15) {
        $("#result").css("font-size","28px");
    } else if (len < 16) {
        $("#result").css("font-size","26px");
    } else {
        alert("계산할 수 없습니다.");
    }
}
