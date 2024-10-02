// include ./step/Step.js
// include ./step/DisplayStep.js
// include ./step/FolderStep.js
// include ./step/MiniGameStep.js
// include ./step/DrawStep.js
// include ./step/RunPowerfieldStep.js
// include ./step/ActivationStep.js
// include ./step/ZoneStep.js
// include ./step/TurnStep.js

class CardBattleTestScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._status = null;
    this._tests = [];
    this._next = null;
    this._animationSprites = [];
  }

  create() {
    super.create();
    this.createWindowLayer();
    this.createTests();
  }

  async createTests() {
    this._tests = this.testsData();
    this._tests = this._tests.map(test => {
      const instanceCreated = new test(this);
      try {
        instanceCreated.create();
      } catch (error) { 
        this.printAssertError(`Test : ${test.name}, Assert: ${error}`);
        instanceCreated.addError(error);
      }
      return instanceCreated;
    });
  }
  
  testsData() {
    const cardSpriteTests = [
      SizeCardSpriteTest,
      StartOpenCardSpriteTest,
      StartClosedCardSpriteTest,
      OpenCardSpriteTest,
      CloseCardSpriteTest,
      DisableCardSpriteTest,
      EnableCardSpriteTest,
      MoveCardSpriteTest,
      HoveredCardSpriteTest,
      UnhoveredCardSpriteTest,
      SelectedCardSpriteTest,
      UnselectedCardSpriteTest,
      IluminatedCardSpriteTest,
      UniluminatedCardSpriteTest,
      FlashCardSpriteTest,
      AnimationCardSpriteTest,
      QuakeCardSpriteTest,
      ZoomCardSpriteTest,
      ZoomOutCardSpriteTest,
      LeaveCardSpriteTest,
      FlipTurnToUpCardSpriteTest,
      FlipTurnToDownCardSpriteTest,
      UpdatingPointsCardSpriteTest,
      TiggerAcitonCardSpriteTest,
    ];
    const cardsetSpriteTests = [
      StartPositionCardsetSpriteTest,
      AlignAboveOfCardsetSpriteTest,
      AlignBelowOfCardsetSpriteTest,
      AlignCenterMiddleCardsetSpriteTest,
      SetCardsCardsetSpriteTest,
      SetTurnToDownCardsCardsetSpriteTest,
      SetAllCardsInPositionCardsetSpriteTest,
      SetAllCardsInPositionsCardsetSpriteTest,
      ListCardsCardsetSpriteTest,
      StartClosedCardsCardsetSpriteTest,
      OpenAllCardsCardsetSpriteTest,
      OpenCardsCardsetSpriteTest,
      CloseAllCardsCardsetSpriteTest,
      CloseCardsCardsetSpriteTest,
      MoveAllCardsInListCardsetSpriteTest,
      MoveCardsInListCardsetSpriteTest,
      MoveAllCardsToPositionCardsetSpriteTest,
      MoveCardsToPositionCardsetSpriteTest,
      MoveAllCardsToPositionsCardsetSpriteTest,
      AddAllCardsToListCardsetSpriteTest,
      AddCardsToListCardsetSpriteTest,
      DisableCardsCardsetSpriteTest,
      StaticModeCardsetSpriteTest,
      SelectModeCardsetSpriteTest,
      SelectModeNoSelectCardsetSpriteTest,
      SelectModeLimitedCardsetSpriteTest,
      FlashCardsCardsetSpriteTest,
      QuakeCardsCardsetSpriteTest,
      AnimationCardsCardsetSpriteTest,
      ShowOrderingCardsCardsetSpriteTest,
      ShowOrderingCardsByIndexesCardsetSpriteTest,
      ShowReverseOrderingCardsCardsetSpriteTest,
      ShowReverseOrderingByIndexesCardsCardsetSpriteTest,
      ZoomAllCardsCardsetSpriteTest,
      ZoomOutAllCardsCardsetSpriteTest,
      FlipTurnToUpAllCardsCardsetSpriteTest,
      FlipTurnToUpCardsCardsetSpriteTest,
      TriggerActionCardsetSpriteTest,
      OnChangeCursorSelectModeCardsetSpriteTest,
      AddChildToEndCardsetSpriteTest,
      LeaveAllCardsCardsetSpriteTest,
    ];
    const StateWindowTests = [
      CreateOneFourthSizeStateWindowTest,
      CreateMiddleSizeStateWindowTest,
      CreateFullSizeStateWindowTest,
      OpenStateWindowTest,
      CloseStateWindowTest,
      ChangeBlueColorStateWindowTest,
      ChangeRedColorStateWindowTest,
      ChangeDefaultColorStateWindowTest,
      AlignStartTopStateWindowTest,
      AlignStartMiddleStateWindowTest,
      AlignStartBottomStateWindowTest,
      AlignCenterTopStateWindowTest,
      AlignCenterAboveMiddleStateWindowTest,
      AlignCenterMiddleStateWindowTest,
      AlignCenterBelowMiddleStateWindowTest,
      AlignCenterBottomStateWindowTest,
      AlignEndTopStateWindowTest,
      AlignEndMiddleStateWindowTest,
      AlignEndBottomStateWindowTest,
      AlignAboveOfStateWindowTest,
      AlignBelowOfStateWindowTest,
    ];
    const textWindowTests = [
      CreateOneFourthSizeTextWindowTest,
      CreateMiddleSizeTextWindowTest,
      CreateFullSizeTextWindowTest,
      OpenTextWindowTest,
      CloseTextWindowTest,
      ChangeBlueColorTextWindowTest,
      ChangeRedColorTextWindowTest,
      ChangeDefaultColorTextWindowTest,
      AlignStartTopTextWindowTest,
      AlignStartMiddleTextWindowTest,
      AlignStartBottomTextWindowTest,
      AlignCenterTopTextWindowTest,
      AlignCenterAboveMiddleTextWindowTest,
      AlignCenterMiddleTextWindowTest,
      AlignCenterBelowMiddleTextWindowTest,
      AlignCenterBottomTextWindowTest,
      AlignEndTopTextWindowTest,
      AlignEndMiddleTextWindowTest,
      AlignEndBottomTextWindowTest,
      AlignTextLeftTextWindowTest,
      AlignTextCenterTextWindowTest,
      AlignTextRightTextWindowTest,
      TextTextWindowTest,
      ChangeTextColorTextWindowTest,
      AlignAboveOfTextWindowTest,
      AlignBelowOfTextWindowTest,
    ];
    const boardWindowTests = [
      PassBoardWindowTest,
      NoPassBoardWindowTest,
      UpdatingPointsBoardWindowTest,
    ];
    const battlePointsWindow = [
      UpdatingPointsBattlePointsWindowTest,
    ];
    const trashWindow = [
      UpdatingPointsTrashWindowTest,
      OrderedIconsTrashWindowTest,
      ReverseIconsTrashWindowTest,
    ];
    const scoreWindow = [
      OneWinUpdatingScoreWindowTest,
      TwoWinsUpdatingScoreWindowTest
    ];
    const commandWindow = [
      CreateFullsizeCommandWindowTest,
      OpenCommandWindowTest,
      CloseCommandWindowTest,
      ChangeBlueColorCommandWindowTest,
      ChangeRedColorCommandWindowTest,
      ChangeDefaultColorCommandWindowTest,
      AlignTopCommandWindowTest,
      AlignMiddleCommandWindowTest,
      AlignBottomCommandWindowTest,
      AlignTextLeftCommandWindowTest,
      AlignTextCenterCommandWindowTest,
      AlignTextRightCommandWindowTest,
      AlignItemsLeftCommandWindowTest,
      AlignItemsCenterCommandWindowTest,
      AlignItemsRightCommandWindowTest,
      TextCommandWindowTest,
      ChangeTextColorCommandWindowTest,
      CommandHandlerCommandWindowTest,
      CommandHandlerWithTextCommandWindowTest,
    ];
    const folderWindow = [
      CreateFolderWindowTest,
    ];
    const steps = [
      // ShouldShowTitleWindowChallengePhaseTest,
      // ShouldShowDescriptionWindowChallengePhaseTest,
      // ShouldCloseWindowsWhenPressActionChallengePhaseTest,
      // ShouldShowTitleWindowStartPhaseTest,
      // ShouldShowDescriptionWindowStartPhaseTest,
      // ShouldCloseWindowsWhenPressActionStartPhaseTest,
      // ShouldShowTitleWindowDrawPhaseTest,
      // ShouldShowDescriptionWindowDrawPhaseTest,
      // ShouldCloseWindowsWhenPressActionDrawPhaseTest,
      // ShouldShowTitleWindowLoadPhaseTest,
      // ShouldShowDescriptionWindowLoadPhaseTest,
      // ShouldCloseWindowsWhenPressActionLoadPhaseTest,
      // ShouldShowPlayerBoardWindowDrawPhaseTest,
      // ShouldShowPlayerBattleWindowDrawPhaseTest,
      // ShouldShowPlayerTrashWindowDrawPhaseTest,
      // ShouldShowPlayerScoreWindowDrawPhaseTest,
      // ShouldShowPlayerCardsetDrawPhaseTest,
      // ShouldShowChallengedBoardWindowDrawPhaseTest,
      // ShouldShowChallengedBattleWindowDrawPhaseTest,
      // ShouldShowChallengedTrashWindowDrawPhaseTest,
      // ShouldShowChallengedScoreWindowDrawPhaseTest,
      // ShouldShowChallengedCardsetDrawPhaseTest,
      // ShouldCloseBattlefieldsWhenPressActionDrawPhaseTest,
      ShouldLoadBattlefieldsDrawPhaseTest,
    ];
    return [
      // ...cardSpriteTests,
      // ...cardsetSpriteTests,
      // ...commandWindow,
      // ...StateWindowTests,
      // ...textWindowTests,
      // ...boardWindowTests,
      // ...battlePointsWindow,
      // ...trashWindow,
      // ...scoreWindow,
      // ...folderWindow,
      ...steps,
    ];
  }

  start() {
    super.start();
    this.startTests();
  }

  async startTests() {
    const testsResults = [];
    for (const test of this._tests) {
      this._next = test;
      const result = await this._next.run();
      testsResults.push(result);
      this._next.restore();
      this._next = null;
      CardBattleManager.reset();
      await this.clearScene();
    }
    this.printResults(testsResults);
    this.printTotals(testsResults);
  }

  clearScene() {
    return new Promise(async resolve => {
      await this.clearChildren();
      await this.clearWindowLayer();
      resolve(true);
    });
  }

  clearChildren() {
    return new Promise(resolve => {
      const children = this.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this._windowLayer) return false;
          child.destroy();
          await this.removeChild(child);
        });
      }
      resolve(true);
    });
  }

  clearWindowLayer() {
    return new Promise(resolve => {
      const windowChildren = this._windowLayer.children;
      while (windowChildren.length) {
        windowChildren.forEach(async window => {
          window.destroy();
          await this._windowLayer.removeChild(window);
        });
      }
      resolve(true);
    });
  }

  printResults(results) {
    results.forEach(test => {
      const { passed: isTestPassed, testName, assertsResult } = test;
      if (isTestPassed) {
        this.printSuccess(`Teste: ${test.testName} passou!`);
      } else {
        this.printTestError(`Teste: ${test.testName} falhou!`);
        assertsResult.forEach(allAsserts => {
          const { passed: isAssertsPassed, assertsName, asserts } = allAsserts;
          if (!isAssertsPassed) {
              this.printAssertError(`Assert: ${assertsName}`);
              asserts.forEach(assert => {
                const { passed: isAssertPassed, title, message } = assert;
                if (!isAssertPassed) {
                  this.printError(`${title}: ${message}`);
                }
              });
          }
        });
      }
    });
  }

  printTotals(results) {
    const total = results.length;
    const success = results.filter(result => result.passed === true).length;
    const failed = total - success;
    this.printInfo(`Total de testes: ${total}`);
    this.printSuccess(`Testes passados: ${success}`);
    this.printError(`Testes falhados: ${failed}`);
  }

  printInfo(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #5DADE2; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  printError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #800000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  printTestError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #090000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  printAssertError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #400000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  printSuccess(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #008000; color: #FFFFFF; font-size: 12px; padding: 5px;`);
  }

  update() {
    super.update();
    if (this.isActive()) {
      if (this._next) {
        this._next.update();
        this._next.updateTest();
      }
    }
  }

  isActive() {
    return !this.isBusy();
  }

  addAnimationSprite(animationSprite) {
    this._animationSprites.push(animationSprite);
  }

  getLastAnimationSprite() {
    return this._animationSprites[this._animationSprites.length - 1];
  }

  addWindow(window) {
    this._windowLayer.addChild(window);
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

  setStep(step) {
    this._status = step;
  }

  isStep(step) {
    return this._status instanceof step;
  }
}