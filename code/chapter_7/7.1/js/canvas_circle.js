//==============================================================================
var InnerCircle = function() {
};

InnerCircle.prototype = {

	color : [[ '#0f0','#1f1','#2f3','#3f3','#4f4','#5f5','#6f6','#7f7','#8f8','#9f9','#afa','#bfb','#cfc','#dfd','#efe','#fff' ],
			 [ '#ff0','#ff1','#ff2','#ff3','#ff4','#ff5','#ff6','#ff7','#ff8','#ff9','#ffa','#ffb','#ffc','#ffd','#ffe','#fff' ],
			 [ '#f00','#f11','#f22','#f33','#f44','#f55','#f66','#f77','#f88','#f99','#faa','#fbb','#fcc','#fdd','#fee','#fff' ]],

	radius : 15,
	colorType : 0,

	posX : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	posY : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],

	//---------------------------------------------------------
	draw : function(context) {
		for (var i = 15; i >= 0; i--) {
			context.fillStyle = this.color[this.colorType][i];
			context.beginPath();
			context.arc(this.posX[i], this.posY[i], this.radius, 0, Math.PI * 2);
			context.fill();
		}
	}
}

//==============================================================================
var Circle = function(container) {

	var context = null;
	var innerCircle = null;
	var centerPoint = null;
	var widthCanvas = null;

	this.innerCircle = new InnerCircle();
	
	this.setCircle(container);
	this.changeSpeed(0);
};

Circle.prototype = {
		
	timerDraw : null,

	arrVolume : [ 0.07, 0.11, 0.2 ],
	arrSpeed : [ 200, 80, 20 ],
	arrColor : [ 'green', 'yellow', 'red' ],

	radius : null,
	angle : 0,
	volume : 0.07,
	speed : 200,

	//---------------------------------------------------------
	setCircle : function(container) {

		this.context = document.getElementById(container).getContext('2d');
		this.widthCanvas = $('#' + container).width();
		this.centerPoint = this.widthCanvas / 2;
		this.radius = this.widthCanvas / 3;

		var startX = this.centerPoint + Math.cos(this.angle) * this.radius;
		var startY = this.centerPoint + Math.sin(this.angle) * this.radius;

		for (var i = 0; i < 15; i++) {
			this.innerCircle.posX[i] = startX;
			this.innerCircle.posY[i] = startY;
		}
	},

	//---------------------------------------------------------
	draw : function() {

		for (var i = 15; i > 0; i--) {
			this.innerCircle.posX[i] = this.innerCircle.posX[i - 1];
			this.innerCircle.posY[i] = this.innerCircle.posY[i - 1];
		}

		this.angle += this.volume;
		
		this.innerCircle.posX[0] = this.centerPoint + Math.cos(this.angle) * this.radius;
		this.innerCircle.posY[0] = this.centerPoint + Math.sin(this.angle) * this.radius;

		this.context.clearRect(0, 0, this.widthCanvas, this.widthCanvas);
		this.innerCircle.draw(this.context);
	},

	//---------------------------------------------------------
	changeColor : function(color) {
		var index = this.arrColor.indexOf(color);
		if ((index < 0) || (index >= this.arrColor.length)) { return false; }
		
		this.innerCircle.colorType = index;
	},

	//---------------------------------------------------------
	changeVolume : function(value) {
		
		if (value < 0) { value = 0; }
		if (value > 2) { value = 2; }

		this.volume = this.arrVolume[value];
	},

	//---------------------------------------------------------
	changeSpeed : function(value) {
		
		if (value < 0) { value = 0; }
		if (value > 2) { value = 2; }

		this.speed = this.arrSpeed[value];

		clearInterval( this.timerDraw );
		
		var circle = this;
		
		this.timerDraw = setInterval(function() {
			circle.draw();
		}, circle.speed);
		
	},

	//---------------------------------------------------------
	increaseCircle : function() {
		if (this.radius > 150) { return false; }
		
		this.radius += 3;
	},

	//---------------------------------------------------------
	decreaseCircle : function() {
		if (this.radius < 10) { return false; }
		
		this.radius -= 3;
	},

	//---------------------------------------------------------
	increaseInnerCircle : function() {
		if (this.innerCircle.radius > 30) { return false; }
		
		this.innerCircle.radius += 3;
	},

	//---------------------------------------------------------
	decreaseInnerCircle : function() {
		if (this.innerCircle.radius < 1) { return false; }
		
		this.innerCircle.radius -= 3;
	}
}
