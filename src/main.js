(function() {
'use strict';
// include ./core/Input.js
// include ./core/Scene_Boot.js
// include ./core/ImageManager.js
// include ./constant/GameConst.js

// include ./data/playerDecksData.js


// include ./helper/Helpers.js
// include ./helper/Generators.js

// include ./window/CommandWindow.js

// include ./window/CardBattleWindowBase.js
// include ./window/ValuesWindow.js
// include ./window/TextWindow.js
// include ./window/BoardWindow.js
// include ./window/BattlePointsWindow.js
// include ./window/TrashWindow.js
// include ./window/ScoreWindow.js

// include ./window/AskCommandWindow.js
// include ./window/FoldersCommandWindow.js
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
// include ../test/integration/card/AnimationCardSpriteTest.js
// include ../test/integration/card/QuakeCardSpriteTest.js
// include ../test/integration/card/ZoomCardSpriteTest.js
// include ../test/integration/card/ZoomOutCardSpriteTest.js
// include ../test/integration/card/LeaveCardSpriteTest.js
// include ../test/integration/card/FlipTurnToUpCardSpriteTest.js
// include ../test/integration/card/FlipTurnToDownCardSpriteTest.js
// include ../test/integration/card/UpdatingPointsCardSpriteTest.js
// tests CARDSET
// include ../test/integration/cardset/StartPositionCardsetSpriteTest.js
// include ../test/integration/cardset/SetCardsCardsetSpriteTest.js
// include ../test/integration/cardset/ListCardsCardsetSpriteTest.js
// include ../test/integration/cardset/StartClosedCardsCardsetSpriteTest.js
// include ../test/integration/cardset/OpenAllCardsCardsetSpriteTest.js
// include ../test/integration/cardset/OpenCardsCardsetSpriteTest.js
// include ../test/integration/cardset/CloseAllCardsCardsetSpriteTest.js
// include ../test/integration/cardset/CloseCardsCardsetSpriteTest.js
// include ../test/integration/cardset/MoveAllCardsInListCardsetSpriteTest.js
// include ../test/integration/cardset/MoveCardsInListCardsetSpriteTest.js
// include ../test/integration/cardset/MoveAllCardsToPositionCardsetSpriteTest.js
// include ../test/integration/cardset/MoveCardsToPositionCardsetSpriteTest.js
// include ../test/integration/cardset/AddAllCardsToListCardsetSpriteTest.js
// include ../test/integration/cardset/AddCardsToListCardsetSpriteTest.js
// include ../test/integration/cardset/DisableCardsCardsetSpriteTest.js
// include ../test/integration/cardset/SelectModeCardsetSpriteTest.js
// include ../test/integration/cardset/StaticModeCardsetSpriteTest.js
// include ../test/integration/cardset/SelectModeWithChoiceCardsetSpriteTest.js
// include ../test/integration/cardset/FlashCardsCardsetSpriteTest.js
// include ../test/integration/cardset/QuakeCardsCardsetSpriteTest.js
// include ../test/integration/cardset/AnimationCardsCardsetSpriteTest.js
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
// include ../test/integration/boardwindow/PassBoardWindowTest.js
// include ../test/integration/boardwindow/NoPassBoardWindowTest.js
// include ../test/integration/boardwindow/UpdatingPointsBoardWindowTest.js
// tests BATTLE POINTS WINDOW
// include ../test/integration/battlepointswindow/UpdatingPointsBattlePointsWindowTest.js
// tests TRASH WINDOW
// include ../test/integration/trashwindow/UpdatingPointsTrashWindowTest.js
// tests SCORE WINDOW
// include ../test/integration/scorewindow/OneWinUpdatingScoreWindowTest.js
// include ../test/integration/scorewindow/TwoWinsUpdatingScoreWindowTest.js
// tests COMMAND WINDOW BASE
// include ../test/integration/commandwindow/OpenCommandWindowTest.js
// include ../test/integration/commandwindow/CloseCommandWindowTest.js
// include ../test/integration/commandwindow/ChangeBlueColorCommandWindowTest.js
// include ../test/integration/commandwindow/ChangeRedColorCommandWindowTest.js
// include ../test/integration/commandwindow/ChangeDefaultColorCommandWindowTest.js
// include ../test/integration/commandwindow/AlignTopCommandWindowTest.js
// include ../test/integration/commandwindow/AlignMiddleCommandWindowTest.js
// include ../test/integration/commandwindow/AlignBottomCommandWindowTest.js
// include ../test/integration/commandwindow/TextCommandWindowTest.js
// include ../test/integration/commandwindow/AlignTextLeftCommandWindowTest.js
// include ../test/integration/commandwindow/AlignTextCenterCommandWindowTest.js
// include ../test/integration/commandwindow/AlignTextRightCommandWindowTest.js
// include ../test/integration/commandwindow/ChangeTextColorCommandWindowTest.js
// include ../test/integration/commandwindow/CommandsAndHandlersCommandWindowTest.js
// tests ASK COMMAND WINDOW 
// include ../test/integration/askcommandwindow/SelectOptionAskCommandWindowTest.js
// tests FOLDRES COMMAND WINDOW 
// include ../test/integration/folderscommandwindow/SelectFoldersCommandWindowTest.js

// include ./scene/CardBattleScene.js
// include ./scene/CardBattleTestScene.js
// include ./manager/CardBattleManager.js

})();