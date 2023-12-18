(function() {
'use strict';
// include ./window/TextWindow.js
// include ./scene/CardBattleScene.js
// include ./manager/StartPhase.js
// include ./manager/CardBattleManager.js

Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  DataManager.setupNewGame();
  SceneManager.goto(CardBattleScene);
  this.resizeScreen();
  this.updateDocumentTitle();
};
})();