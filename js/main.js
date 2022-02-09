// timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            // timer = duration;
            $('.timer').text("Time is almost up!");
            $('.timer2').text("Time is almost up!");
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 8,
        display = document.querySelector('#time');
    display2 = document.querySelector('#time2');
    display3 = document.querySelector('#time3');
    display4 = document.querySelector('#time4');
    display5 = document.querySelector('#time5');
    display6 = document.querySelector('#time6');
    display7 = document.querySelector('#time7');
    display8 = document.querySelector('#time8');
    display9 = document.querySelector('#time9');
    display10 = document.querySelector('#time10');
    display11 = document.querySelector('#time11');
    display12 = document.querySelector('#time12');
    display13 = document.querySelector('#time13');
    display14 = document.querySelector('#time14');
    display15 = document.querySelector('#time15');
    startTimer(fiveMinutes, display);
    startTimer(fiveMinutes, display2);
    startTimer(fiveMinutes, display3);
    startTimer(fiveMinutes, display4);
    startTimer(fiveMinutes, display5);
    startTimer(fiveMinutes, display6);
    startTimer(fiveMinutes, display7);
    startTimer(fiveMinutes, display8);
    startTimer(fiveMinutes, display9);
    startTimer(fiveMinutes, display10);
    startTimer(fiveMinutes, display11);
    startTimer(fiveMinutes, display12);
    startTimer(fiveMinutes, display13);
    startTimer(fiveMinutes, display14);
    startTimer(fiveMinutes, display15);
};
// end of timer
// carousel interval
$('.carousel').carousel({
    interval: 3000
})
// end of carousel interval


// 3 image slider by hand 
$("#answers").find("for-996-none").hide();


$("#questions").on("click", ".for-996-none", function (e) {
    e.preventDefault();
    $("#questions").find(".for-996-none").removeClass('specialClass');
    $(this).addClass('specialClass');
    var qnum = $(this).data('qnum');
    if ($(window).width() < 1550) {
        if ($(".second-slider").hasClass("specialClass")) {
            $(".third-slider").css("margin-left", "auto");
            $(".second-slider").css("margin-left", "0");
        } else if ($(".third-slider").hasClass("specialClass")) {
            $(".second-slider").css("margin-left", "auto");
            $(".third-slider").css("margin-left", "0");
        }
        else if ($(".first-slider").hasClass("specialClass")) {
            $(".third-slider").css("margin-left", "auto");
            $(".second-slider").css("margin-left", "0");
        }
    }



    $("#answers").find(".for-996-none").hide().each(function () {

        var anum = $(this).data('ansnum');
        if (anum == qnum) { $(this).toggle(); }
    });

});

// end of 3 image slider by hand

// message left

const user_pop_up = document.querySelector(".user_pop_up");
const user = document.getElementById("user");
user_pop_up.style.display = 'none';
i = 0;
const users = ['Oliver', 'Amelia', 'Ethan', 'Maddison', 'Sebastian ', 'Aaliyah', 'Lucas', 'Isabelle', 'Charlotte', 'Joseph', 'Grace', 'Matthew ', 'Emma', 'Spencer'];
var messageTimer2;
var messageTimer = setInterval(function () {
    user.innerHTML = users[i];
    $(".user_pop_up").fadeToggle();
    messageTimer2 = setTimeout(() => {
        $(".user_pop_up").fadeToggle();
        if (i === users.length - 1) {
            i = 0;
        } else {
            i++
        }
    }, 4000);
}, 12000);

$(".x-button-exit").click(function () {
    $(".user_pop_up").css("display", "none");
    clearInterval(messageTimer);
    clearTimeout(messageTimer2);
});

// end of message left





// quiz test 


// Quiz result options in a separate object for flexibility
var resultOptions = [
    // {
    //     title: 'You Are This Thing',
    //     desc: '<p>Here, have an Archer</p><img src="https://i.imgur.com/tXTjD9k.jpg"/>'
    // },
    // {
    //     title: 'You Are That Thing',
    //     desc: '<p>Here, have an Archer</p><img src="https://i.imgur.com/dipkE0v.jpg"/>'
    // },
    // {
    //     title: 'You Are This Other Thing',
    //     desc: '<p>Here, have an Archer</p><img src="https://i.imgur.com/WXox0Yv.jpg"/>'
    // },
    // {
    //     title: 'You Are This One Thing',
    //     desc: '<p>Here, have an Archer</p><img src="https://i.imgur.com/NH5cunw.png"/>'
    // },
    // {
    //     title: 'You Are A Type Of Thing',
    //     desc: '<p>Here, have an Archer</p><img src="https://i.imgur.com/NH5cunw.png"/>'
    // }
];

// global variables
var quizSteps = $('#quizzie .quiz-step'),
    totalScore = 0;

// for each step in the quiz, add the selected answer value to the total score
// if an answer has already been selected, subtract the previous value and update total score with the new selected answer value
// toggle a visual active state to show which option has been selected
quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.children('.quiz-answer');
    // for each option per step, add a click listener
    // apply active class and calculate the total score
    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);
        function check() {
            var $this = $(this),
                value = $this.attr('data-quizIndex'),
                answerScore = parseInt(value);
            // check to see if an answer was previously selected
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldScoreValue = wasActive.attr('data-quizIndex'),
                    oldScore = parseInt(oldScoreValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
                totalScore -= oldScoreValue;
                totalScore += answerScore;
                calcResults(totalScore);
            } else {
                // handle visual active state
                $this.addClass('active');
                // handle score calculation
                totalScore += answerScore;
                calcResults(totalScore);
                // handle current step
                updateStep(currentStep);
            }
        }
    });
});

// show current step/hide other steps
function updateStep(currentStep) {
    if (currentStep.hasClass('current')) {
        currentStep.removeClass('current');
        currentStep.next().addClass('current');
    }
}

// display scoring results
function calcResults(totalScore) {
    // only update the results div if all questions have been answered
    if (quizSteps.find('.active').length == quizSteps.length) {
        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc');

        // calc lowest possible score
        var lowestScoreArray = $('#quizzie .low-value').map(function () {
            return $(this).attr('data-quizIndex');
        });
        var minScore = 0;
        for (var i = 0; i < lowestScoreArray.length; i++) {
            minScore += lowestScoreArray[i] << 0;
        }
        // calculate highest possible score
        var highestScoreArray = $('#quizzie .high-value').map(function () {
            return $(this).attr('data-quizIndex');
        });
        var maxScore = 0;
        for (var i = 0; i < highestScoreArray.length; i++) {
            maxScore += highestScoreArray[i] << 0;
        }
        // calc range, number of possible results, and intervals between results
        var range = maxScore - minScore,
            numResults = resultOptions.length,
            interval = range / (numResults - 1),
            increment = '',
            n = 0; //increment index
        // incrementally increase the possible score, starting at the minScore, until totalScore falls into range. then match that increment index (number of times it took to get totalScore into range) and return the corresponding index results from resultOptions object
        while (n < numResults) {
            increment = minScore + (interval * n);
            if (totalScore <= increment) {
                // populate results
                resultsTitle.replaceWith("<h1>" + resultOptions[n].title + "</h1>");
                resultsDesc.replaceWith("<p class='desc'>" + resultOptions[n].desc + "</p>");
                return;
            } else {
                n++;
            }
        }
    }
}
$(".quiz-answer").click(function () {
    if ($(".step2").hasClass("current")) {
        $(".number-step1").addClass("quiz-active");
    }
    else if ($(".step3").hasClass("current")) {
        $(".number-step2").addClass("quiz-active");
    }
    else if ($(".step4").hasClass("current")) {
        $(".number-step3").addClass("quiz-active");
    }
    else if ($("#results").hasClass("current")) {
        $(".number-step4").addClass("quiz-active");
    }
});