var timerMove = null;
var curIndex = 0;

//----------------------------------------------------------------------------
var valPos = [ //z-index, top, left, width
               [ 6, 50, 210, 150 ], [ 5, 100, 370, 90 ], [ 4, 120, 464, 60 ],
               [ 3, 130, 507, 47 ], [ 2, 135, 400, 42 ], [ 1, 140, 370, 40 ],
               [ 0, 150, 275, 30 ], [ 1, 140, 145, 40 ], [ 2, 135, 50, 42 ],
               [ 3, 130, 15, 47 ], [ 4, 120, 45, 60 ], [ 5, 100, 110, 90 ] 
             ];

var pos = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
var temp = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];

//----------------------------------------------------------------------------
function movePicture(id) {

	var prefix = id.substring(0, 1);
	var numId = id.substring(1) * 1;
	var direction = 0;
	var gap = 0;

	curIndex = numId;

	if (pos.indexOf(numId) > 3 && pos.indexOf(numId) < 9) {
		return false;
	}
	if (pos.indexOf(numId) < 4) {
		direction = -1;
		gap = pos.indexOf(numId);
	}
	if (pos.indexOf(numId) > 8) {
		direction = 1;
		gap = 12 - pos.indexOf(numId);
	}

	for (var i = 0; i < gap; i++) {
		for (var j = 0; j < 12; j++) {

			if (direction === 1) {
				temp[j] = pos[(j + 11) % 12];
			} else {
				temp[j] = pos[(j + 1) % 12];
			}

			$("#" + prefix + temp[j]).animate({
				"z-index" : valPos[j][0],
				"top" : valPos[j][1]+"px",
				"left" : valPos[j][2]+"px",
				"width" : valPos[j][3]+"px"
			}, 1000);
		}

		for (var j = 0; j < 12; j++) {
			pos[j] = temp[j];
		}
	}
};

//----------------------------------------------------------------------------
function moveLeft() {
	curIndex += 1;
	curIndex = curIndex % 12;
	movePicture('p' + curIndex);
}

//----------------------------------------------------------------------------
function moveRight() {
	curIndex += 11;
	curIndex = curIndex % 12;
	movePicture('p' + curIndex);
}

//----------------------------------------------------------------------------
function move(action) {

	clearTimeout(timerMove);

	if (action == 1) {
		moveLeft();
		timerMove = setInterval("moveLeft()", 2000);
	} else if (action == 2) {
		moveRight();
		timerMove = setInterval("moveRight()", 2000);
	}
}

//----------------------------------------------------------------------------
function getImages() {

	var str = '';

	for (var i = 0; i < 12; i++) {
		str += '<div id="p'+i+'" style="position:absolute;'
				+'z-index:'+valPos[i][0]+';'
				+'top:'+valPos[i][1]+'px;'
				+'left:'+valPos[i][2]+'px;'
				+'width:'+valPos[i][3]+'px;"'
				+' onclick="movePicture(this.id)">'
				+'<img src="./img/'+(i+1)+'.jpg" style="width:100%;"></img>'
				+'</div>';
	}
	return str;
}
