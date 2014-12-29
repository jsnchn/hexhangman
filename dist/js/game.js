(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(320, 480, Phaser.AUTO, 'hex-hangman');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {
  this.answer = [];
}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {

    // console.log(this.result);

    this.showAnswer();

    var winlose = this.result ? 'win' : 'lose' ;

    var style = { font: '56px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY-50, 'You ' + winlose, style);
    this.titleText.anchor.setTo(0.5, 0.5);

    var style = { font: '32px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 50, 'play again', style);
    this.titleText.anchor.setTo(0.5, 0.5);
    this.titleText.inputEnabled = true;
    this.titleText.input.useHandCursor = true;
    this.titleText.events.onInputDown.add(this.startOver,this);

    var style2 = { font: '32px Arial', fill: '#ffffff', align: 'center'};
    this.titleText_2 = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'back to menu', style2);
    this.titleText_2.anchor.setTo(0.5, 0.5);
    this.titleText_2.inputEnabled = true;
    this.titleText_2.input.useHandCursor = true;
    this.titleText_2.events.onInputDown.add(this.backToMenu,this);
  },
  update: function () {
    
  },
  showAnswer: function(){
    var style = { font: '48px Arial', fill: '#ffffff', align: 'center'};

    var hashChar = this.game.add.text(50, this.game.world.centerY-150, '#', style);
    hashChar.anchor.setTo(0.5, 0.5);

    for (var j = 0;j < this.splitAnswer.length; j++){
      this.answer[j] = this.game.add.text((j*36) + 90, this.game.world.centerY-150, this.splitAnswer[j], style);
      this.answer[j].anchor.setTo(0.5, 0.5);
    }
  },
  startOver: function(){
    this.game.state.start('play');
  },
  backToMenu: function(){
    this.game.state.start('menu');
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Start', style);
    this.titleText.anchor.setTo(0.5, 0.5);
    this.titleText.inputEnabled = true;
    this.titleText.input.useHandCursor = true;
    this.titleText.events.onInputDown.add(this.startGame,this);

    var style = { font: '20px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, 'Guess the color.', style);
    this.titleText.anchor.setTo(0.5, 0.5);

  },
  update: function() {
    
  },
  startGame: function(){
    this.game.state.start('play');
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

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
},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    //must load at least one thing?
    this.load.image('yeoman', 'assets/yeoman-logo.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])