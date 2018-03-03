/** Script for tivial trivia game */

var quizShow = {
    startGame: function(){
        this.initTime();
    },
    stopGame: function(msg){
        // var msg = msg.length ? msg : "Times Up!";
        this.killTime();
        this.$timer().html(msg);
        this.getAnswers();
        this.printScore();
    },
    $timer: function(){
        return $('#timer');
    },
    intervalId: 0,
    goodAnswers: 0,
    badAnswers: 0,
    unAnswers: 0,
    countDown: 60,
    answers: {
        'one': 'Solid State Drive',
        'two': 'The Legend of Zelda',
        'three': 'Bitcoin',
        'four': 'Universal Serial Bus',
        'five': 'Liquid Crystal Display',
        'six': 'Read-only Memory'
    },
    getAnswers: function(){
        for(var elId in quizShow.answers){
            userAnswer = $("#"+ elId +" input:checked").val();
            quizShow.checkAnswer(userAnswer, quizShow.answers[elId]);
        }
        
    },
    printScore: function(){
        var un = quizShow.unAnswers;
        var good = quizShow.goodAnswers;
        var bad = quizShow.badAnswers;
        this.$timer().append(`<br>Correct Answers: ${good}<br>
        Incorrect Answers: ${bad}<br>
        Un-Answered: ${un}`);
    },
    checkAnswer: function( a, b ){
        // check if answer was good, if its not good do we have garbo? not garbo just dumbo.
        ( a === b ) ? this.goodAnswers++ : ( a === undefined || b === undefined ) ? this.unAnswers++ : this.badAnswers++;
    },
    initTime: function(){
        quizShow.intervalId = setInterval(quizShow.setTimer, 1000);
    },
    setTimer: function(){
        quizShow.countDown--;
        quizShow.$timer().html( quizShow.countDown + " seconds left!");
        quizShow.checkTime(quizShow.countDown);
    },
    checkTime: function(time){
        if(time === 0){
            quizShow.stopGame("Time's Up!");
        }
    },
    killTime: function(){
        clearInterval(quizShow.intervalId);
        quizShow.intervalId = false;
    }
}

$('#getStarted').on('click', function(){
    $(this).hide();
    quizShow.startGame();
    quizShow.$timer().html("START!");
})

$('#imDone').on('click', function(){
    quizShow.stopGame("all done!");
});