
  'use strict';
  function Play() {
    this.guessesLeft = 
    this.score = 
    this.colorCode =
    this.splitAnswer = null;
    this.answer = [];
    this.answerChars = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F'];
  }
  Play.prototype = {
    create: function() {

      //reset per game
      this.guessesLeft = 10;

      this.setColor();
      this.initGuessChars();
      this.initAnswerChars();
      this.initScore();

      var style = { font: '24px Arial', fill: '#ffffff', align: 'center'};
      this.titleText = this.game.add.text(this.game.world.width - 10, this.game.world.height - 10, 'Give Up', style);
      this.titleText.anchor.setTo(1, 1);
      this.titleText.inputEnabled = true;
      this.titleText.input.useHandCursor = true;
      this.titleText.events.onInputDown.add(this.gameover,this);

    },
    update: function() {

    },
    initGuessChars: function(){
      for (var i = 0;i < this.answerChars.length; i++){
        var style = { font: '32px Arial', fill: '#ffffff', align: 'center'};
        var ansChar = this.game.add.text(((i%4)*50) + 86, this.game.world.centerY + ((Math.floor((i/16)*4)+1)*50) - 100, this.answerChars[i], style);
        ansChar.anchor.setTo(0.5, 0);
        ansChar.name = this.answerChars[i];
        ansChar.inputEnabled = true;
        ansChar.input.useHandCursor = true;
        ansChar.events.onInputDown.add(this.guess,this);
      }
    },
    initAnswerChars: function(){
      var style = { font: '48px Arial', fill: '#ffffff', align: 'center'};

      var hashChar = this.game.add.text(50, this.game.world.centerY - 150, '#', style);
      hashChar.anchor.setTo(0.5, 0.5);

      for (var j = 0;j < this.splitAnswer.length; j++){
        this.answer[j] = this.game.add.text((j*36) + 90, this.game.world.centerY - 150, '_', style);
        this.answer[j].anchor.setTo(0.5, 0.5);
        this.answer[j].name = this.splitAnswer[j];
      }
    },
    initScore: function(){
      var style = { font: '24px Arial', fill: '#ffffff', align: 'center'};
      this.score = this.game.add.text(10, this.game.world.height - 10, this.guessesLeft, style);
      this.score.anchor.setTo(0, 1);
    },
    setColor: function(){
      this.colorCode = this.randColor();
      this.game.stage.backgroundColor = '#' + this.colorCode;
      this.splitAnswer = this.colorCode.split('');
      // console.log(this.colorCode);
    },
    randColor: function(){
      var letters = '0123456789ABCDEF'.split('');
      var cCode = '';
      for (var k = 0; k < 6; k++ ) {
          cCode += letters[Math.floor(Math.random() * 16)];
      }
      return cCode;
    },
    guess: function(chosenChar){
      var wrongGuess = true;
      for (var m = 0;m < this.answer.length; m++){
        if (this.answer[m].name == chosenChar.text){
          this.answer[m].text = this.answer[m].name;
          wrongGuess = false;
        }
      }

      if (wrongGuess){
        this.guessesLeft--;
      }

      this.checkScore();

      chosenChar.alpha = 0;
      chosenChar.inputEnabled = false;
      chosenChar.input.useHandCursor = false;

    },
    checkScore: function(){
      if (this.guessesLeft > 0){
        //check win
        this.checkWin();
        //update score
        this.score.text = this.guessesLeft;
      }else{
        this.gameover(false);
      }
    },
    checkWin: function(){
      var numGuessedCorrectly = 0;
      for (var m = 0;m < this.answer.length; m++){
        if (this.answer[m].name == this.answer[m].text){
          numGuessedCorrectly++;
        }
      }
      if (numGuessedCorrectly == this.answer.length){
        this.gameover(true);
      }
    },
    gameover: function(win) {
      this.game.state.states['gameover'].result = typeof win == 'boolean' ? win : false;
      this.game.state.states['gameover'].splitAnswer = this.splitAnswer;
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;