var PoliceLight = function(container) {
    
    this.flagLight = false;
    this.timeChange = null;
    this.leftLight = null;
    this.rightLight = null;
    
    this.setLight(container);
    this.turnOnLight();
}

PoliceLight.prototype = {
    
    twoColor : [ '#0000ff', '#ff0000' ],
    
    setLight : function(container) {
        
        var object = document.getElementById(container);
        
        var width = object.style.width;
        var height = object.style.height;
        
        var halfWidth = (width.split('px')[0] / 2) + 'px';
        
        var str = '<div id="'+container+'_left" style="width:'+halfWidth+'; \
                    height:'+height+';float:left;"></div> \
                    <div id="'+container+'_right" style="width:'+halfWidth+'; \
                    height:'+height+';float:left;"></div>';
        
        object.innerHTML = str;
        
        this.timeChange = parseInt(Math.random() * 1000) + 200;
        
        this.leftLight = document.getElementById(container+'_left');
        this.rightLight = document.getElementById(container+'_right');

    },
    
    turnOnLight : function() {
        
        if (this.flagLight) {
            this.leftLight.style.backgroundColor = this.twoColor[0];
            this.rightLight.style.backgroundColor = this.twoColor[1];
            this.flagLight = false;
        } else {
            this.leftLight.style.backgroundColor = this.twoColor[1];
            this.rightLight.style.backgroundColor = this.twoColor[0];
            this.flagLight = true;
        }
        
        var aThis = this;
        
        setTimeout(function() { aThis.turnOnLight(); }, aThis.timeChange);
    }
}


