var w1, w2, w3, w4, w5;

function startWorker(no, container) {
	if(typeof(Worker) !== "undefined") {
		if (no == 1) {
	        if(typeof(w1) == "undefined") {
	        	w1 = new Worker("./js/worker1.js");
	        	w1.onmessage = function(event) {
	        		$('#'+container).html(event.data);
	        	}
	        }
		} else if (no == 2) {
	        if(typeof(w2) == "undefined") {
	        	w2 = new Worker("./js/worker2.js");
	        	w2.onmessage = function(event) {
	        		$('#'+container).html(event.data);
	        	}
	        }
		} else if (no == 3) {
	        if(typeof(w3) == "undefined") {
	        	w3 = new Worker("./js/worker3.js");
	        	w3.onmessage = function(event) {
	        		$('#'+container).html(event.data);
	        	}
	        }
		} else if (no == 4) {
	        if(typeof(w4) == "undefined") {
	        	w4 = new Worker("./js/worker4.js");
	        	w4.onmessage = function(event) {
	        		$('#'+container).html(event.data);
	        	}
	        }
		} else if (no == 5) {
	        if(typeof(w5) == "undefined") {
	        	w5 = new Worker("./js/worker5.js");
	        	w5.onmessage = function(event) {
	        		$('#'+container).html(event.data);
	        	}
	        }
		}
	} else {
		alert("브라우저가 HTML5를 지원하지 않습니다.");
	}
}

function countLoop(container) {

	var count = 0;
	
	for (var i=0; i<80000; i++) {
		for (var j=0; j<80000; j++) {
			count += 1;
		}
	}
	$('#'+container).html(count);
}