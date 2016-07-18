function countLoop() {

	var count = 0;
	
	for (var i=0; i<80000; i++) {
		for (var j=0; j<80000; j++) {
			count += 1;
		}
	}
	
	postMessage( count );
}

countLoop();
