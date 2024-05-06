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

// include ../test/integration/SceneTest.js
// tests CARD Sprite
// include ../test/integration/card/StartOpenCardSpriteTest.js
// include ../test/integration/card/StartClosedCardSpriteTest.js
// include ../test/integration/card/OpenCardSpriteTest.js
// include ../test/integration/card/CloseCardSpriteTest.js
// include ../test/integration/card/DisableCardSpriteTest.js
// include ../test/integration/card/EnableCardSpriteTest.js
// include ../test/integration/card/MoveCardSpriteTest.js
// include ../test/integration/card/HoveredCardSpriteTest.js
// include ../test/integration/card/UnhoveredCardSpriteTest.js
// include ../test/integration/card/SelectedCardSpriteTest.js
// include ../test/integration/card/UnselectedCardSpriteTest.js
// include ../test/integration/card/IluminatedCardSpriteTest.js
// include ../test/integration/card/UniluminatedCardSpriteTest.js


// include ../test/integration/card/FlashCardSpriteTest.js
// include ../test/integration/card/DamageAnimationCardSpriteTest.js
// include ../test/integration/card/UpdatingPointsCardSpriteTest.js
// include ../test/integration/card/ZoomAndZoomoutCardSpriteTest.js
// include ../test/integration/card/LeaveCardSpriteTest.js
// include ../test/integration/card/QuakeCardSpriteTest.js
// include ../test/integration/card/FlipCardSpriteTest.js
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
// include ../test/integration/cardbattlewindowbase/OpenCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/CloseCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/CreateOneFourthSizeCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/CreateMiddleSizeCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/CreateThreeFourthSizeCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/CreateFullSizeCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/ChangeBlueColorCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/ChangeRedColorCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/ChangeDefaultColorCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignStartTopCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignStartMiddleCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignStartBottomCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignCenterTopCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignCenterMiddleCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignCenterBottomCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignEndTopCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignEndMiddleCardBattleWindowBaseTest.js
// include ../test/integration/cardbattlewindowbase/AlignEndBottomCardBattleWindowBaseTest.js
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
// include ../test/integration/boardwindow/PassBoardWindowTest.js
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