(function() {
'use strict';
// include ./core/Input.js
// include ./core/Scene_Boot.js
// include ./core/ImageManager.js
// include ./constant/GameConst.js
// include ./data/playerDecksData.js
// include ./helper/Helpers.js
// include ./helper/Generators.js
// include ./window/CardBattleWindowBase.js
// include ./window/ValuesWindow.js
// include ./window/TextWindow.js
// include ./window/BoardWindow.js
// include ./window/BattlePointsWindow.js
// include ./window/TrashWindow.js
// include ./window/ScoreWindow.js
// include ./window/ChooseFolderWindow.js
// include ./object/PowerAction.js
// include ./object/Energy.js
// include ./object/Card.js
// include ./object/CardBattlePlayer.js
// include ./sprite/ActionSprite.js
// include ./sprite/CardSprite.js
// include ./sprite/CardsetSprite.js
// include ./sprite/BackgroundSprite.js
// include ./sprite/CardBattleSpriteset.js

// include ./scene/phase/CardBattlePhase.js

// tests CARD
// include ../test/integration/SceneTest.js
// include ../test/integration/card/StartClosedAndStartOpenCardSpriteTest.js
// include ../test/integration/card/CloseAndOpenCardSpriteTest.js
// include ../test/integration/card/MoveCardSpriteTest.js
// include ../test/integration/card/HoveredCardSpriteTest.js
// include ../test/integration/card/SelectedCardSpriteTest.js
// include ../test/integration/card/FlashCardSpriteTest.js
// include ../test/integration/card/DamageAnimationCardSpriteTest.js
// include ../test/integration/card/UpdatingPointsCardSpriteTest.js
// include ../test/integration/card/DisableAndEnableCardSpriteTest.js
// include ../test/integration/card/ZoomAndZoomoutCardSpriteTest.js
// include ../test/integration/card/LeaveCardSpriteTest.js
// include ../test/integration/card/QuakeCardSpriteTest.js
// include ../test/integration/card/FlipCardSpriteTest.js
// include ../test/integration/card/IluminatedCardSpriteTest.js
// tests CARDSET
// include ../test/integration/cardset/SetBackgroundAndStartPositionCardsetSpriteTest.js
// include ../test/integration/cardset/SetCardsCardsetSpriteTest.js
// include ../test/integration/cardset/StartPositionCardsCardsetSpriteTest.js
// include ../test/integration/cardset/StartListCardsCardsetSpriteTest.js
// include ../test/integration/cardset/StartClosedAndOpenCardsCardsetSpriteTest.js
// include ../test/integration/cardset/StartClosedAndOpenCardsDelayCardsetSpriteTest.js
// include ../test/integration/cardset/MoveCardsToListCardsetSpriteTest.js
// include ../test/integration/cardset/MoveCardsToListDelayCardsetSpriteTest.js
// include ../test/integration/cardset/MoveCardsToPositionCardsetSpriteTest.js
// include ../test/integration/cardset/AddCardAndMoveToListCardsetSpriteTest.js
// include ../test/integration/cardset/AddCardAndMoveToListDelayCardsetSpriteTest.js
// include ../test/integration/cardset/SelectModeCardsetSpriteTest.js
// include ../test/integration/cardset/SelectModeAndEnableChoiceCardsetSpriteTest.js
// include ../test/integration/cardset/AnimateQuakeCardsCardsetSpriteTest.js
// include ../test/integration/cardset/AnimateFlashCardsCardsetSpriteTest.js
// include ../test/integration/cardset/AnimateDamageCardsCardsetSpriteTest.js
// include ../test/integration/cardset/DisableAndEnableCardsCardsetSpriteTest.js
// tests CARD BATTLE WINDOW BASE
// include ../test/integration/cardbattlewindowbase/OpenAndCloseCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/ChangeColorCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/SetMiddleSizeCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/SetFullSizeCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignMiddleSizeCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignFullSizeCardBattleWindowBaseTest.js
// tests TEXT WINDOW
// include ../test/integration/textwindow/DrawTextStartAlignFullSizeTextWindowTest.js
// include ../test/integration/textwindow/DrawTextStartAlignMiddleSizeTextWindowTest.js
// include ../test/integration/textwindow/DrawTextCenterAlignFullSizeTextWindowTest.js
// include ../test/integration/textwindow/DrawTextCenterAlignMiddleSizeTextWindowTest.js
// include ../test/integration/textwindow/DrawTextEndAlignFullSizeTextWindowTest.js
// include ../test/integration/textwindow/DrawTextEndAlignMiddleSizeTextWindowTest.js
// include ../test/integration/textwindow/SetTextColorTextWindowTest.js
// tests BOARD WINDOW
// include ../test/integration/boardwindow/UpdatingBoardWindowTest.js
// tests BATTLE POINTS WINDOW
// include ../test/integration/battlepointswindow/UpdatingBattlePointsWindowTest.js
// tests TRASH WINDOW
// include ../test/integration/trashwindow/UpdatingTrashWindowTest.js
// tests SCORE WINDOW
// include ../test/integration/scorewindow/UpdatingScoreWindowTest.js

// include ../test/integration/window/WindowTest.js

// include ./scene/CardBattleScene.js
// include ./scene/CardBattleTestScene.js
// include ./manager/CardBattleManager.js

})();