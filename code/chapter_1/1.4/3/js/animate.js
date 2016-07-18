var width, height;

move = function(container) {
    
    var opacColor = Math.random() + 0.3;
    var posX = Math.random() * (width-10);
    var posY = Math.random() * (height-10);
    var moveTime = Math.random() * 2000 + 500;
    var delayTime = Math.random() * 5000;
    var sizeCircle = (Math.random() * 150) + 20;
    
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
    
    setTimeout(function(){ move(container); }, delayTime);
}

initialize = function() {
    
    width = $(window).width();
    height = $(window).height();
    
    move("circle_1");
    move("circle_2");
    move("circle_3");
    move("circle_4");
}
