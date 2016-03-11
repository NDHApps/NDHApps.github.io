var candidates;
var myScores;

$(document).ready(function() {
    
    // Initialize scores to 0
    if(Cookies.getJSON('ElectionQuizScores')) {
        myScores = Cookies.getJSON('ElectionQuizScores');
        for (var i = 0; i < 10; i++) {
            $('.question #q' + i).val(myScores[i]);
        }
    } else {
        myScores = ["-","-","-","-","-","-","-","-","-","-"];
    }
    
    // Load candidate scores
    loadJSON('http://ndhapps.com/330/js/data/candidates.json',function(data) {
        candidates = JSON.parse(data).candidates;
        updateMatchScores();
    });
    
    // Update scores when changed
    $('.question input[type=range]').on('input', function() {
        myScores[$(this).attr('id').slice(1)] = parseInt($(this).val());
        Cookies.set('ElectionQuizScores', myScores);
        updateMatchScores();
    });
    
    // Code to expand question desciptions on toggle
    $(".more-toggle").click(function () {
        $header = $(this);
        $content = $header.next();
        $content.slideToggle(100, function () {
            $header.text(function () {
                return $content.is(":visible") ? "...Less" : "More...";
            });
        });
    });
});

function updateMatchScores() {
    var candidate;
    var personalScore;
    var candidateScores = {};
    for (candidate of candidates) {
        var totalMatchScore = 0;
        var scoreCount = 0;
        personalScore = 0;
        for (var i = 0; i < 10; i++) {
            if (myScores[i] != "-") {
                personalScore += myScores[i];
                var score = 125 - (Math.abs(myScores[i] - candidate.scores[i]));
                score = Math.min(110,score);
                score = Math.max(-10,score);
                totalMatchScore += score;
                scoreCount++;
            }
        }
        personalScore = Math.round((100 + (personalScore / scoreCount)) / 2);
        averageMatchScore = totalMatchScore / scoreCount;
        averageMatchScore = Math.min(100,averageMatchScore);
        averageMatchScore = Math.max(0,averageMatchScore);
        if (scoreCount) {
            candidate.matchScore = roundToOne(averageMatchScore);
        }
    }
    candidates.sort(keysrt('matchScore'));
    for (var i = 0; i < candidates.length; i++) {
        $(".candidates #c" + i + " .card-title").text(candidates[i].name);
        $(".candidates #c" + i + " .party").text(candidates[i].party);
        $(".candidates #c" + i + " .position").text(candidates[i].position);
        $(".candidates #c" + i + " .score").text(candidates[i].matchScore);
        $(".candidates #c" + i + " .picture").attr("src",candidates[i].picture);
        $(".candidates #c" + i + " .learn-more").attr("href",candidates[i].id+".html");
        candidateScores[candidates[i].name] = candidates[i].matchScore;
    }
    $(".spectrumX").css("margin-left", "calc(" + personalScore + "% - 2px)");
    Cookies.set('MySpectrumScore',personalScore);
    Cookies.set('MyMatchScores',candidateScores);
}

function keysrt(key) {
  return function(a,b){
   if (a[key] > b[key]) return -1;
   if (a[key] < b[key]) return 1;
   return 0;
  }
}

function roundToOne(num) {    
    return +(Math.round(num + "e+1")  + "e-1");
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