(function() {
'use strict';
// include ./core/Input.js
// include ./core/Scene_Boot.js
// include ./core/ImageManager.js
// include ./constant/GameConst.js

// include ./data/playerDecksData.js

// include ./helper/Helpers.js
// include ./helper/Generators.js
// include ./window/TextWindow.js
// include ./window/CommandWindow.js
// include ./window/FolderWindow.js
// include ./window/StateWindow.js
// include ./window/ValuesWindow.js
// include ./window/BoardWindow.js
// include ./window/BattlePointsWindow.js
// include ./window/TrashWindow.js
// include ./window/ScoreWindow.js

// include ./object/PowerAction.js
// include ./object/Energy.js
// include ./object/Card.js
// include ./object/CardBattlePlayer.js
// include ./sprite/ActionSprite.js
// include ./sprite/CardSprite.js
// include ./sprite/CardsetSprite.js
// include ./sprite/BackgroundSprite.js
// include ./sprite/CardBattleSpriteset.js

// include ./scene/phase/Phase.js
// include ./scene/phase/ChallengePhase.js
// include ./scene/phase/StartPhase.js
// include ../test/integration/SceneTest.js

// tests CARD Sprite
// include ../test/integration/card/ErroOnCreateCardSpriteTest.js
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
// include ../test/integration/cardset/SetAllCardsInPositionCardsetSpriteTest.js
// include ../test/integration/cardset/SetAllCardsInPositionsCardsetSpriteTest.js
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
// include ../test/integration/cardset/MoveAllCardsToPositionsCardsetSpriteTest.js
// include ../test/integration/cardset/AddAllCardsToListCardsetSpriteTest.js
// include ../test/integration/cardset/AddCardsToListCardsetSpriteTest.js
// include ../test/integration/cardset/DisableCardsCardsetSpriteTest.js
// include ../test/integration/cardset/StaticModeCardsetSpriteTest.js
// include ../test/integration/cardset/SelectModeWithoutChoiceCardsetSpriteTest.js
// include ../test/integration/cardset/SingleSelectModeCardsetSpriteTest.js
// include ../test/integration/cardset/SelectModeCardsetSpriteTest.js
// include ../test/integration/cardset/FlashCardsCardsetSpriteTest.js
// include ../test/integration/cardset/QuakeCardsCardsetSpriteTest.js
// include ../test/integration/cardset/AnimationCardsCardsetSpriteTest.js
// include ../test/integration/cardset/ShowOrderingCardsCardsetSpriteTest.js
// include ../test/integration/cardset/ShowReverseOrderingCardsCardsetSpriteTest.js
// tests STATE WINDOW
// include ../test/integration/statewindow/OpenStateWindowTest.js
// include ../test/integration/statewindow/CloseStateWindowTest.js
// include ../test/integration/statewindow/CreateOneFourthSizeStateWindowTest.js
// include ../test/integration/statewindow/CreateMiddleSizeStateWindowTest.js
// include ../test/integration/statewindow/CreateThreeFourthSizeStateWindowTest.js
// include ../test/integration/statewindow/CreateFullSizeStateWindowTest.js
// include ../test/integration/statewindow/ChangeBlueColorStateWindowTest.js
// include ../test/integration/statewindow/ChangeRedColorStateWindowTest.js
// include ../test/integration/statewindow/ChangeDefaultColorStateWindowTest.js
// include ../test/integration/statewindow/AlignStartTopStateWindowTest.js
// include ../test/integration/statewindow/AlignStartMiddleStateWindowTest.js
// include ../test/integration/statewindow/AlignStartBottomStateWindowTest.js
// include ../test/integration/statewindow/AlignCenterTopStateWindowTest.js
// include ../test/integration/statewindow/AlignCenterMiddleStateWindowTest.js
// include ../test/integration/statewindow/AlignCenterBottomStateWindowTest.js
// include ../test/integration/statewindow/AlignEndTopStateWindowTest.js
// include ../test/integration/statewindow/AlignEndMiddleStateWindowTest.js
// include ../test/integration/statewindow/AlignEndBottomStateWindowTest.js
// tests BOARD WINDOW
// include ../test/integration/boardwindow/PassBoardWindowTest.js
// include ../test/integration/boardwindow/NoPassBoardWindowTest.js
// include ../test/integration/boardwindow/UpdatingPointsBoardWindowTest.js
// tests BATTLE POINTS WINDOW
// include ../test/integration/battlepointswindow/UpdatingPointsBattlePointsWindowTest.js
// tests TRASH WINDOW
// include ../test/integration/trashwindow/UpdatingPointsTrashWindowTest.js
// include ../test/integration/trashwindow/OrderedIconsTrashWindowTest.js
// include ../test/integration/trashwindow/ReverseIconsTrashWindowTest.js
// tests SCORE WINDOW
// include ../test/integration/scorewindow/OneWinUpdatingScoreWindowTest.js
// include ../test/integration/scorewindow/TwoWinsUpdatingScoreWindowTest.js
// tests TEXT WINDOW
// include ../test/integration/textwindow/CreateOneFourthSizeTextWindowTest.js
// include ../test/integration/textwindow/CreateMiddleSizeTextWindowTest.js
// include ../test/integration/textwindow/CreateThreeFourthSizeTextWindowTest.js
// include ../test/integration/textwindow/CreateFullsizeTextWindowTest.js
// include ../test/integration/textwindow/OpenTextWindowTest.js
// include ../test/integration/textwindow/CloseTextWindowTest.js
// include ../test/integration/textwindow/ChangeBlueColorTextWindowTest.js
// include ../test/integration/textwindow/ChangeRedColorTextWindowTest.js
// include ../test/integration/textwindow/ChangeDefaultColorTextWindowTest.js
// include ../test/integration/textwindow/AlignCenterBottomTextWindowTest.js
// include ../test/integration/textwindow/AlignCenterAboveMiddleTextWindowTest.js
// include ../test/integration/textwindow/AlignCenterMiddleTextWindowTest.js
// include ../test/integration/textwindow/AlignCenterBelowMiddleTextWindowTest.js
// include ../test/integration/textwindow/AlignCenterTopTextWindowTest.js
// include ../test/integration/textwindow/AlignEndBottomTextWindowTest.js
// include ../test/integration/textwindow/AlignEndMiddleTextWindowTest.js
// include ../test/integration/textwindow/AlignEndTopTextWindowTest.js
// include ../test/integration/textwindow/AlignStartBottomTextWindowTest.js
// include ../test/integration/textwindow/AlignStartMiddleTextWindowTest.js
// include ../test/integration/textwindow/AlignStartTopTextWindowTest.js
// include ../test/integration/textwindow/AlignTextCenterTextWindowTest.js
// include ../test/integration/textwindow/AlignTextLeftTextWindowTest.js
// include ../test/integration/textwindow/AlignTextRightTextWindowTest.js
// include ../test/integration/textwindow/TextTextWindowTest.js
// include ../test/integration/textwindow/ChangeTextColorTextWindowTest.js
// tests COMMAND WINDOW
// include ../test/integration/commandwindow/CreateFullsizeCommandWindowTest.js
// include ../test/integration/commandwindow/OpenCommandWindowTest.js
// include ../test/integration/commandwindow/CloseCommandWindowTest.js
// include ../test/integration/commandwindow/ChangeBlueColorCommandWindowTest.js
// include ../test/integration/commandwindow/ChangeRedColorCommandWindowTest.js
// include ../test/integration/commandwindow/ChangeDefaultColorCommandWindowTest.js
// include ../test/integration/commandwindow/AlignTopCommandWindowTest.js
// include ../test/integration/commandwindow/AlignMiddleCommandWindowTest.js
// include ../test/integration/commandwindow/AlignBottomCommandWindowTest.js
// include ../test/integration/commandwindow/AlignTextLeftCommandWindowTest.js
// include ../test/integration/commandwindow/AlignTextCenterCommandWindowTest.js
// include ../test/integration/commandwindow/AlignTextRightCommandWindowTest.js
// include ../test/integration/commandwindow/AlignItemsLeftCommandWindowTest.js
// include ../test/integration/commandwindow/AlignItemsCenterCommandWindowTest.js
// include ../test/integration/commandwindow/AlignItemsRightCommandWindowTest.js
// include ../test/integration/commandwindow/TextCommandWindowTest.js
// include ../test/integration/commandwindow/ChangeTextColorCommandWindowTest.js
// include ../test/integration/commandwindow/CommandHandlerCommandWindowTest.js
// include ../test/integration/commandwindow/CommandHandlerWithTextCommandWindowTest.js
// test FOLDER WINDOW
// include ../test/integration/folderwindow/CreateFolderWindowTest.js

// test PHASE
// include ../test/integration/phase/ChallengePhaseTest.js
// include ../test/integration/phase/StartPhaseTest.js

// include ./scene/CardBattleScene.js
// include ./scene/CardBattleTestScene.js
// include ./manager/CardBattleManager.js

})();