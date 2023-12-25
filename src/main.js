(function() {
'use strict';
// include ./constant/CardType.js
// include ./constant/CardColors.js
// include ./data/playerDecksData.js
// include ./helper/uuidv4.js
// include ./window/TextWindow.js
// include ./window/ChooseFolderWindow.js
// include ./object/PowerAction.js
// include ./object/Energy.js
// include ./object/Card.js
// include ./object/CardBattlePlayer.js
// include ./manager/ChallengePhase.js
// include ./manager/ChooseFolderPhase.js
// include ./manager/StartPhase.js
// include ./manager/DrawPhase.js
// include ./sprite/StartBattleTransition.js
// include ./sprite/BackgroundSprite.js
// include ./sprite/CardBattleSpriteset.js
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