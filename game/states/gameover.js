
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
