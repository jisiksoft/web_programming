var count = 0;

function addCount() {
	count = count + 10;
	postMessage( count );
	setTimeout( addCount, 1000 );
}

addCount();
