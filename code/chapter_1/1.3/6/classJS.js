var index = 0;

var Book = function(object, year, title) {

	this.object = object;
    this.year = year;
    this.title = title;
    this.index = index++;
    
    this.setBook();
}

Book.prototype = {
    
    color : [ '#369ead', '#c24642', '#7f6084' ],
    
    setBook : function() {
    	this.object.style.backgroundColor = this.color[this.index];
    	this.object.style.fontSize = "15px";
    	this.object.style.lineHeight = "38px";
    	this.object.innerHTML = "How-to Series " + (this.index + 1) + "<br>" + this.year + " ?";
    },
    
    getBookInfo : function(object) {
    	object.style.backgroundColor = this.color[this.index];
    	object.style.fontSize = "15px";
    	object.innerHTML = this.title;
    }
}
