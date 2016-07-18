var count = 0;

function addCount() {
	count = count + 3;
	postMessage( count );
	setTimeout( addCount, 300 );
}

addCount();
