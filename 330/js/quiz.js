var candidates; 

$(document).ready(function() {
    loadJSON('http://ndhapps.com/330/js/data/candidates.json',function(data) {
        candidates = JSON.parse(data).candidates;
        console.log(candidates);
    });
    
    $('.question input[type=range]').on('input', function() {
        sessionStorage.setItem($(this).attr('id'), $(this).val());
    });
});

function loadJSON(path, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function loadJSON(path, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}