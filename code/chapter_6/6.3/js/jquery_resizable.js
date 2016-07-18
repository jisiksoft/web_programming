var ImageDiv = function(parentContainer, myId, myType, myRect) {

	this.container = parentContainer;
	this.id = myId;
	this.type = myType;
	this.rect = myRect;

	this.createDiv();
};

ImageDiv.prototype = {

	rectLeftBackground : [ 0, 0, 100, 600 ], //[left,top,width,height]
	rectRightBackground : [ 100, 0, 500, 600 ], //[left,top,width,height]

	arrLeftImageDiv : new Array(),
	arrRightImageDiv : new Array(),

	arrTypeColor : [ "#9d3aed", "#ad4aed", "#bd5aed", "#cd6aed", "#dd7aed", "#ed8aed", "#fd9aed", "#fdaaed", "#fdbaed" ],

	indexForId : 1,

	//---------------------------------------------------------
	createDiv : function() {

		var str = '<div id="' + this.id + '" style="position:absolute;left:'
				+ this.rect[0] + 'px;top:' + this.rect[1] + 'px;width:'
				+ this.rect[2] + 'px;height:' + this.rect[3]
				+ 'px;z-index:10;background-color:'
				+ ImageDiv.prototype.arrTypeColor[this.type]
				+ ';text-indent:10px;line-height:40px;">';
		if (this.container == 'right_background') {
			str += this.id;
		}
		str += '</div>';

		$('#' + this.container).append(str);
	},

	//---------------------------------------------------------
	draggableLeftImage : function() {

		var thisDiv = this;

		$('#'+thisDiv.id).draggable({
			cursor : 'move',
			containment : '#all_background',
			stop : function(event, ui) {
				var X = $(this).position().left;
				var Y = $(this).position().top;
	
				if (thisDiv.isMovedIntoDrawArea(X, Y)) {
					var anImageDiv = new ImageDiv(	"right_background",
													ImageDiv.prototype.indexForId,
													thisDiv.type,
													[ X - ImageDiv.prototype.rectRightBackground[0],
													  Y - ImageDiv.prototype.rectRightBackground[1],
													  thisDiv.rect[2],
													  thisDiv.rect[3] ]);
					anImageDiv.draggableRightImage();
					ImageDiv.prototype.arrRightImageDiv.push(anImageDiv);
					ImageDiv.prototype.indexForId += 1;
				}
				thisDiv.moveToOriginPosition();
				return true;
			}
		});
	},

	//---------------------------------------------------------
	draggableRightImage : function() {

		var thisDiv = this;

		$('#' + thisDiv.id).draggable({
			cursor : 'move',
			containment : '#right_background',
			stop : function(event, ui) {
				thisDiv.rect[0] = $(this).position().left;
				thisDiv.rect[1] = $(this).position().top;
				return true;
			}
		}).resizable({
			stop : function(event, ui) {
				thisDiv.rect[2] = ui.size.width;
				thisDiv.rect[3] = ui.size.height;
			}
		});
	},

	//---------------------------------------------------------
	moveToOriginPosition : function() {

		var thisDiv = this;

		$('#' + thisDiv.id).css({
			left : thisDiv.rect[0],
			top : thisDiv.rect[1],
			width : thisDiv.rect[2],
			height : thisDiv.rect[3]
		});
	},

	//---------------------------------------------------------
	isMovedIntoDrawArea : function(X, Y) {

		if ((X > this.rectRightBackground[0])
				&& (X + this.rect[2] < this.rectRightBackground[0]
						+ this.rectRightBackground[2])
				&& (Y > this.rectRightBackground[1])
				&& (Y + this.rect[3] < this.rectRightBackground[1]
						+ this.rectRightBackground[3])) {
			return true;
		} else {
			return false;
		}
	}
}

//----------------------------------------------------------------------------
function init() {

	$('#left_background').css({
		left : ImageDiv.prototype.rectLeftBackground[0],
		top : ImageDiv.prototype.rectLeftBackground[1],
		width : ImageDiv.prototype.rectLeftBackground[2],
		height : ImageDiv.prototype.rectLeftBackground[3]
	});

	$('#right_background').css({
		left : ImageDiv.prototype.rectRightBackground[0],
		top : ImageDiv.prototype.rectRightBackground[1],
		width : ImageDiv.prototype.rectRightBackground[2],
		height : ImageDiv.prototype.rectRightBackground[3]
	});
}

//----------------------------------------------------------------------------
function addLeftImages() {

	for (var i = 0; i < 9; i++) {
		var anImageDiv = new ImageDiv('left_background', 'left_' + i, i, [ 20, 30 + i * 60, 60, 40 ]);
		anImageDiv.draggableLeftImage();
		ImageDiv.prototype.arrLeftImageDiv.push(anImageDiv);
	}
}
