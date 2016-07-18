var count = 0;

function addCount() {
	count = count + 6;
	postMessage( count );
	setTimeout( addCount, 600 );
}

addCount();
