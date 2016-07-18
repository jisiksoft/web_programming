pressBtn = function(input) {
    
    if (input == 'clear') {
        alert('clear');
    } else if ((input >= 0) && (input <= 9)) {
        alert('number : ' + input);
    } else if (input == '.') {
        alert('.');
    } else if (input == 'sign') {
        alert('sign');
    } else if (input == 'percent') {
        alert('percent');
    } else if (input == 'divide') {
        alert('divide');
    } else if (input == 'multiply') {
        alert('multiply');
    } else if (input == 'minus') {
        alert('minus');
    } else if (input == 'plus') {
        alert('plus');
    } else if (input == 'equal') {
        alert('equal');
    }
}
