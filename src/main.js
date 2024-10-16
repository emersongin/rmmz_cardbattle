(function() {
'use strict';
// CORE
// include ./core/Input.js
// include ./core/Scene_Boot.js
// include ./core/ImageManager.js

// CONSTANTS
// include ./constant/GameConst.js

// HELPERS
// include ./helper/Helpers.js
// include ./helper/Generators.js

// COMPONENTS
// include ./components/ActionQueue/ActionQueue.js
// include ./components/ActionSprite/ActionSprite.js
// include ./components/CardSprite/CardSprite.js
// include ./components/CardsetSprite/CardsetSprite.js

// WINDOWS
// include ./components/TextWindow/TextWindow.js
// include ./components/CommandWindow/CommandWindow.js
// include ./components/FolderWindow/FolderWindow.js
// include ./components/StateWindow/StateWindow.js
// include ./components/ValuesWindow/ValuesWindow.js
// include ./components/BoardWindow/BoardWindow.js
// include ./components/BattlePointsWindow/BattlePointsWindow.js
// include ./components/TrashWindow/TrashWindow.js
// include ./components/ScoreWindow/ScoreWindow.js



// TESTS
// include ../test/integration/SceneTest.js
// CARD SPRITE
// include ../test/integration/card/SizeCardSpriteTest.js
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
// include ../test/integration/card/TiggerAcitonCardSpriteTest.js
// CARDSET SPRITE
// include ../test/integration/cardset/StartPositionCardsetSpriteTest.js
// include ../test/integration/cardset/SetCardsCardsetSpriteTest.js
// include ../test/integration/cardset/SetTurnToDownCardsCardsetSpriteTest.js
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
// include ../test/integration/cardset/SelectModeCardsetSpriteTest.js
// include ../test/integration/cardset/SelectModeNoSelectCardsetSpriteTest.js
// include ../test/integration/cardset/SelectModeLimitedCardsetSpriteTest.js
// include ../test/integration/cardset/FlashCardsCardsetSpriteTest.js
// include ../test/integration/cardset/QuakeCardsCardsetSpriteTest.js
// include ../test/integration/cardset/AnimationCardsCardsetSpriteTest.js
// include ../test/integration/cardset/ShowOrderingCardsCardsetSpriteTest.js
// include ../test/integration/cardset/ShowReverseOrderingCardsCardsetSpriteTest.js
// include ../test/integration/cardset/ShowOrderingCardsByIndexesCardsetSpriteTest.js
// include ../test/integration/cardset/ShowReverseOrderingByIndexesCardsCardsetSpriteTest.js
// include ../test/integration/cardset/ZoomAllCardsCardsetSpriteTest.js
// include ../test/integration/cardset/ZoomOutAllCardsCardsetSpriteTest.js
// include ../test/integration/cardset/FlipTurnToUpAllCardsCardsetSpriteTest.js
// include ../test/integration/cardset/FlipTurnToUpCardsCardsetSpriteTest.js
// include ../test/integration/cardset/AlignAboveOfCardsetSpriteTest.js
// include ../test/integration/cardset/AlignBelowOfCardsetSpriteTest.js
// include ../test/integration/cardset/AlignCenterMiddleCardsetSpriteTest.js
// include ../test/integration/cardset/TriggerActionCardsetSpriteTest.js
// include ../test/integration/cardset/OnChangeCursorSelectModeCardsetSpriteTest.js
// include ../test/integration/cardset/AddChildToEndCardsetSpriteTest.js
// include ../test/integration/cardset/LeaveAllCardsCardsetSpriteTest.js
// STETE WINDOW
// include ../test/integration/statewindow/OpenStateWindowTest.js
// include ../test/integration/statewindow/CloseStateWindowTest.js
// include ../test/integration/statewindow/CreateOneFourthSizeStateWindowTest.js
// include ../test/integration/statewindow/CreateMiddleSizeStateWindowTest.js
// include ../test/integration/statewindow/CreateFullSizeStateWindowTest.js
// include ../test/integration/statewindow/ChangeBlueColorStateWindowTest.js
// include ../test/integration/statewindow/ChangeRedColorStateWindowTest.js
// include ../test/integration/statewindow/ChangeDefaultColorStateWindowTest.js
// include ../test/integration/statewindow/AlignStartTopStateWindowTest.js
// include ../test/integration/statewindow/AlignStartMiddleStateWindowTest.js
// include ../test/integration/statewindow/AlignStartBottomStateWindowTest.js
// include ../test/integration/statewindow/AlignCenterTopStateWindowTest.js
// include ../test/integration/statewindow/AlignCenterAboveMiddleStateWindowTest.js
// include ../test/integration/statewindow/AlignCenterMiddleStateWindowTest.js
// include ../test/integration/statewindow/AlignCenterBelowMiddleStateWindowTest.js
// include ../test/integration/statewindow/AlignCenterBottomStateWindowTest.js
// include ../test/integration/statewindow/AlignEndTopStateWindowTest.js
// include ../test/integration/statewindow/AlignEndMiddleStateWindowTest.js
// include ../test/integration/statewindow/AlignEndBottomStateWindowTest.js
// include ../test/integration/statewindow/AlignAboveOfStateWindowTest.js
// include ../test/integration/statewindow/AlignBelowOfStateWindowTest.js
// BOARD WINDOW
// include ../test/integration/boardwindow/PassBoardWindowTest.js
// include ../test/integration/boardwindow/NoPassBoardWindowTest.js
// include ../test/integration/boardwindow/UpdatingPointsBoardWindowTest.js
// BATTLE POINTS WINDOW
// include ../test/components/BattlePointsWindow/ShouldUpdatePointsOfWindow.js
// TRASH WINDOW
// include ../test/integration/trashwindow/UpdatingPointsTrashWindowTest.js
// include ../test/integration/trashwindow/OrderedIconsTrashWindowTest.js
// include ../test/integration/trashwindow/ReverseIconsTrashWindowTest.js
// SCORE WINDOW
// include ../test/integration/scorewindow/OneWinUpdatingScoreWindowTest.js
// include ../test/integration/scorewindow/TwoWinsUpdatingScoreWindowTest.js
// TEXT WINDOW
// include ../test/integration/textwindow/CreateOneFourthSizeTextWindowTest.js
// include ../test/integration/textwindow/CreateMiddleSizeTextWindowTest.js
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
// include ../test/integration/textwindow/AlignAboveOfTextWindowTest.js
// include ../test/integration/textwindow/AlignBelowOfTextWindowTest.js
// COMMAND WINDOW
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
// FOLDER WINDOW
// include ../test/integration/folderwindow/CreateFolderWindowTest.js
// STEPS
// include ../test/components/DisplayStep/ChallengePhase/ShouldShowTitleWindowTest.js
// include ../test/components/DisplayStep/ChallengePhase/ShouldShowDescriptionWindowTest.js
// include ../test/components/DisplayStep/ChallengePhase/ShouldCloseWindowsWhenPressActionTest.js
// include ../test/components/DisplayStep/StartPhase/ShouldShowTitleWindowTest.js
// include ../test/components/DisplayStep/StartPhase/ShouldShowDescriptionWindowTest.js
// include ../test/components/DisplayStep/StartPhase/ShouldCloseWindowsWhenPressActionTest.js
// include ../test/components/DisplayStep/DrawPhase/ShouldShowTitleWindowTest.js
// include ../test/components/DisplayStep/DrawPhase/ShouldShowDescriptionWindowTest.js
// include ../test/components/DisplayStep/DrawPhase/ShouldCloseWindowsWhenPressActionTest.js
// include ../test/components/DisplayStep/LoadPhase/ShouldShowTitleWindowTest.js
// include ../test/components/DisplayStep/LoadPhase/ShouldShowDescriptionWindowTest.js
// include ../test/components/DisplayStep/LoadPhase/ShouldCloseWindowsWhenPressActionTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowPlayerBoardWindowTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowPlayerBattleWindowTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowPlayerScoreWindowTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowPlayerTrashWindowTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowPlayerCardsetTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowChallengedBoardWindowTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowChallengedBattleWindowTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowChallengedScoreWindowTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowChallengedTrashWindowTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldShowChallengedCardsetTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldCloseBattlefieldsWhenPressActionTest.js
// include ../test/components/DrawStep/DrawPhase/ShouldLoadBattlefieldsTest.js
// include ../test/components/FolderStep/ChallengePhase/ShouldShowPlayerFolderWindowTest.js
// include ../test/components/FolderStep/ChallengePhase/ShouldCloseFolderWindowWhenSelectedFolderTest.js
// include ../test/components/MiniGameStep/StartPhase/ShouldShowMiniGameCardsetTest.js
// include ../test/components/MiniGameStep/StartPhase/ShouldShufflerCardsTest.js
// include ../test/components/MiniGameStep/StartPhase/ShouldShowGameResultWindowCardsTest.js
// include ../test/components/MiniGameStep/StartPhase/ShouldCloseMiniGameOnSelectedCardTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowChallengedBattleWindowTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowChallengedBoardWindowTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowChallengedScoreWindowTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowChallengedTrashWindowTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowChallengedCardsetTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowPlayerBattleWindowTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowPlayerBoardWindowTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowPlayerScoreWindowTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowPlayerTrashWindowTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowPlayerCardsetTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldShowTextWindowTest.js
// include ../test/components/TurnStep/LoadPhase/PlayerMustPlayedFirstWhenWinningMiniGameTest.js
// include ../test/components/TurnStep/LoadPhase/PlayerMustPlayedNextWhenLosingMiniGameTest.js
// include ../test/components/TurnStep/LoadPhase/PlayerMustMakePlayWhenYourTurnTest.js
// include ../test/components/TurnStep/LoadPhase/PlayerMustPassedTurnWhenYourTurnTest.js
// include ../test/components/TurnStep/LoadPhase/ChallengedMustMakePlayWhenYourTurnTest.js
// include ../test/components/TurnStep/LoadPhase/ChallengeMustPassedTurnWhenYourTurnTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldActivatePowerZoneWhenItHasCardTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldActivatePowerZoneWhenReachLimiteTest.js
// include ../test/components/TurnStep/LoadPhase/ShouldEndWhenThereAreMovesTest.js
// include ../test/components/ZoneStep/LoadPhase/ShouldShowLocationWindowInHandZoneStepTest.js
// include ../test/components/ZoneStep/LoadPhase/ShouldShowCardNameWindowInHandZoneStepTest.js
// include ../test/components/ZoneStep/LoadPhase/ShouldShowCardDescriptionWindowInHandZoneStepTest.js
// include ../test/components/ZoneStep/LoadPhase/ShouldShowCardPropsWindowInHandZoneStepTest.js
// include ../test/components/ZoneStep/LoadPhase/ShouldChangeCardOnMoveCursorInHandZoneStepTest.js
// include ../test/components/ZoneStep/LoadPhase/ShouldCloseAndChangeStepWhenGoingBackInHandZoneStepTest.js
// include ../test/components/ZoneStep/LoadPhase/ShouldSelectCardToPlayHandZoneStepTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowChallengedTrashWindowTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowChallengedBattleWindowTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowChallengedBoardWindowTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowChallengedScoreWindowTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowPlayerTrashWindowTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowPlayerBattleWindowTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowPlayerBoardWindowTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowPlayerScoreWindowTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldShowCardSpriteSelectedTest.js
// include ../test/components/SlotStep/LoadPhase/ShouldMoveCardToPowerFieldWhenFinishingStrategyTest.js

// include ./manager/CardBattleManager.js
// include ./components/Scene/CardBattleTestScene.js
// include ./components/Scene/CardBattleScene.js
})();
