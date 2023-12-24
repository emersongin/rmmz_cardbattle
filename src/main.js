(function() {
'use strict';
// include ./window/TextWindow.js
// include ./window/ChooseFolderWindow.js
// include ./object/CardBattlePlayer.js
// include ./manager/ChallengePhase.js
// include ./manager/ChooseFolderPhase.js
// include ./manager/StartPhase.js
// include ./manager/DrawPhase.js
// include ./scene/CardBattleScene.js
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