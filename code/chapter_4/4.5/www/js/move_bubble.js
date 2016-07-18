var width, height;
var numCircle = 12;

//-----------------------------------------------------------------
function move(container) {

    var opacColor = (Math.random() * 0.09) + 0.01;
    var posX = Math.random() * width;
    var posY = Math.random() * height;
    var moveTime = Math.random() * 10000 + 7000;
    var sizeCircle = (Math.random() * 400) + 50;
    
    var distWidth = 0;
    if ((posX + sizeCircle) > width)
        distWidth = width - sizeCircle;
    var distHeight = 0;
    if ((posY + sizeCircle) > height)
        distHeight = height - sizeCircle;
    
    $( "#"+container ).animate({
                               opacity: opacColor,
                               left: (posX - distWidth)+'px',
                               top: (posY - distHeight)+'px',
                               width: sizeCircle+'px',
                               height: sizeCircle+'px'
                               }, moveTime);
    
    setTimeout(function(){ move(container); }, moveTime);
}

//-----------------------------------------------------------------
function initLocation(container) {

    var opacColor = (Math.random() * 0.09) + 0.01;
    var posX = Math.random() * width;
    var posY = Math.random() * height;
    var sizeCircle = (Math.random() * 300) + 100;
    
    var distWidth = 0;
    if ((posX + sizeCircle) > width)
        distWidth = width - sizeCircle;
    var distHeight = 0;
    if ((posY + sizeCircle) > height)
        distHeight = height - sizeCircle;
    
    $( "#"+container ).css({
                               opacity: opacColor,
                               left: (posX - distWidth)+'px',
                               top: (posY - distHeight)+'px',
                               width: sizeCircle+'px',
                               height: sizeCircle+'px'
                           });
}

//-----------------------------------------------------------------
function makeBubble(container) {
    
    width = $(window).width();
    height = $(window).height();
    
    var i;
    var str = '';
    for (i=0; i<numCircle; i++) {
    	str += '<div class="circle" id="circle_'+i+'"></div>';
    }
    $('#'+container).html( str );

    for (i=0; i<numCircle; i++) {
    	initLocation('circle_'+i);
    }
    for (i=0; i<numCircle; i++) {
        move('circle_'+i);
    }
}

//-----------------------------------------------------------------
$(window).bind("resize", function() {
    width = $(window).width();
    height = $(window).height();
});
