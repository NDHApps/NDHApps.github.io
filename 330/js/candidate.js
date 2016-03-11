$(document).ready(function() {
    
    // Initialize scores to 0
    if(Cookies.get('MySpectrumScore')) {
        var mySpectrumScore = Cookies.get('MySpectrumScore');
        $("#spectrumMe").css("margin-left", "calc(" + mySpectrumScore + "% - 2px)");
    }
    
    var pageId = $("#pageName").text();
    console.log(Cookies.getJSON('MyMatchScores'));
    if(Cookies.getJSON('MyMatchScores')) {
        var myMatchScores = Cookies.getJSON('MyMatchScores');
        console.log(myMatchScores);
        $("#matchScore").text(myMatchScores[pageId]+"% Match");
    }
});