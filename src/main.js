(function() {
'use strict';
// include ./window/TextWindow.js
// include ./scene/CardBattleScene.js
// include ./manager/StartPhase.js
// include ./manager/CardBattleManager.js

SceneManager.goto = function(sceneClass, params = []) {
  if (sceneClass) {
    this._nextScene = new sceneClass(...params);
  }
  if (this._scene) {
    this._scene.stop();
  }
};

Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  DataManager.setupNewGame();
  SceneManager.goto(CardBattleScene, [CardBattleManager]);
  this.resizeScreen();
  this.updateDocumentTitle();
};
})();