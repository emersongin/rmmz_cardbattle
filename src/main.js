(function() {
'use strict';
// include ./constant/CardTypes.js
// include ./constant/CardColors.js
// include ./constant/CardSpriteStates.js
// include ./data/playerDecksData.js
// include ./helper/uuidv4.js
// include ./window/TextWindow.js
// include ./window/ChooseFolderWindow.js
// include ./object/PowerAction.js
// include ./object/Energy.js
// include ./object/Card.js
// include ./object/CardBattlePlayer.js
// include ./sprite/CardSprite.js
// include ./sprite/CardsetSprite.js
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