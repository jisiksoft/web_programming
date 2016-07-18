var e1, e2, e3;

function startSent(container1, container2, container3) {
	if(typeof(EventSource) !== "undefined") {
        if(typeof(e1) == "undefined") {
        	e1 = new EventSource("./php/sent1.php");
        	e1.onmessage = function(event) {
        		$('#'+container1).html(event.data);
        	}
        }
        if(typeof(e2) == "undefined") {
        	e2 = new EventSource("./php/sent2.php");
        	e2.onmessage = function(event) {
        		$('#'+container2).html(event.data);
        	}
        }
        if(typeof(e3) == "undefined") {
        	e3 = new EventSource("./php/sent3.php");
        	e3.onmessage = function(event) {
        		$('#'+container3).html(event.data);
        	}
        }
	} else {
		alert("브라우저가 HTML5를 지원하지 않습니다.");
	}
}
