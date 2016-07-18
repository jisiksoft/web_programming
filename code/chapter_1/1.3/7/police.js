var arrayPL = [];

runOneLight = function(container) {

    var pl = new PoliceLight(container);
    arrayPL.push(pl);
}

runPoliceLight = function() {
    
    runOneLight("light_1");
    runOneLight("light_2");
    runOneLight("light_3");
    runOneLight("light_4");
}
