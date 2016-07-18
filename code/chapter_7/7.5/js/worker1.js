var count = 0;

function addCount() {
	count = count + 1;
	postMessage( count );
	setTimeout( addCount, 100 );
}

addCount();
