runFunction = function(object, para_2, para_3, para_4, para_5) {
    
    var str = "";
    
    if (object == null)
        return;
    if (para_2 != null)
        str += ' ' + para_2;
    if (para_3 != null)
        str += ' ' + para_3;
    if (para_4 != null)
        str += ' ' + para_4;
    if (para_5 != null)
        str += ' ' + para_5;
        
    object.innerHTML = str;
}
