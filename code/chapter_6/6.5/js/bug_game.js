var index = 0;
var cntKilled = 0;

//----------------------------------------------------------------------------
function makeBugs() {

	var noClick = 1; //the number of clicking to kill a bug.

	var WIDTH = $('#bug').width();
	var HEIGHT = $('#bug').height();

	var str = '';
	
	for (var i = 0; i < 5; i++) {

		var direction = Math.floor(Math.random() * 4);
		var randomX = Math.random() * WIDTH;
		var randomY = Math.random() * HEIGHT;
		var myId = 'bug' + index;

		str += '<div class="iamabug" id="' + myId + '" name="' + noClick + '" '
			+ 'onclick="hitBug(this.id)" style="position:absolute;';

		if (direction == 0) {
			str += 'left:' + randomX + 'px;top:-15px;';
		} else if (direction == 1) {
			str += 'left:-30px;top:' + randomY + 'px;';
		} else if (direction == 2) {
			str += 'left:' + randomX + 'px;top:' + HEIGHT + 'px;';
		} else {
			str += 'left:' + WIDTH + 'px;top:' + randomY + 'px;';
		}
		str += 'cursor:pointer;">iAmAbUG:click</div>';

		index += 1;
	}

	$('#bug').append(str);

	setTimeout(function() {
		makeBugs();
	}, 4000);
}

//----------------------------------------------------------------------------
function moveBugs() {

	var originX = $('#bug').offset().left;
	var originY = $('#bug').offset().top;
	var centerX = $('#bug').width() / 2;
	var centerY = $('#bug').height() / 2;
	var curPosX, curPosY;

	$('.iamabug').each(function() {

		curPosX = $(this).offset().left - originX;
		curPosY = $(this).offset().top - originY;

		$(this).css({
			left : (curPosX * 40 + centerX) / 41,
			top : (curPosY * 40 + centerY) / 41
		});
	});

	setTimeout(function() {
		moveBugs();
	}, 500);
}

//----------------------------------------------------------------------------
function hitBug(myId) {

	var myObject = $('#'+myId);
	
	var no = myObject.attr('name');
	no -= 1;
	myObject.attr('name', no);

	if (no == 0) {
		myObject.css('display', 'none');
		cntKilled += 1;
		$('#count').html(cntKilled);
	}
}
