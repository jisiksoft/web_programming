var arrayColor = [ '#770000', '#007700', '#000077' ];
var index = 1;

function runButton() {
    index = (index + 1) % 3;
    document.getElementById("btn_1").style.backgroundColor = arrayColor[index];
}

function runText() {
    alert("디버깅을 할때 가장 많이 사용하는 것이 alert() 함수입니다.");
}
