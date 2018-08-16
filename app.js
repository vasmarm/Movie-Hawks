
for(y = 2000; y <= 2500; y++) {
    var optn = document.createElement("OPTION");
    optn.text = y;
    optn.value = y;
    
    // if year is 2015 selected
    if (y == 2015) {
        optn.selected = true;
    }
    
    document.getElementById('year').options.add(optn);
}