
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

  },
  update: function() {
    
  },
  startGame: function(){
    this.game.state.start('play');
  }
};

module.exports = Menu;
