// include ./step/Step.js
// include ./step/DisplayStep.js
// include ./step/FolderStep.js
// include ./step/MiniGameStep.js
// include ./step/DrawStep.js
// include ./step/PowerZoneStep.js
// include ./step/SlotStep.js
// include ./step/ZoneStep.js
// include ./step/TurnStep.js

class CardBattleTestScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._status = null;
    this._tests = [];
    this._next = null;
    this._animationSprites = [];
    this._finishWindow = null;
    this._startTestDate = new Date();
    this._endTestDate = null;
    this._collisions = [];
  }

  create() {
    super.create();
    this.createWindowLayer();
    this.createFinishWindow();
    this.createTests();
  }

  createFinishWindow() {
    const objHeight = 72;
    const rect = new Rectangle(0, 0, Graphics.boxWidth, objHeight);
    this._finishWindow = new Window_Base(rect);
    const y = ScreenHelper.getAboveMiddlePosition(objHeight / 2);
    this._finishWindow.y = y;
    this._finishWindow.contents.fontSize = 24;
    this._finishWindow.hide();
    this._finishWindow.close();
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
    const battlePointsWindowTests = [
      UpdatingPointsBattlePointsWindowTest,
    ];
    const trashWindowTests = [
      UpdatingPointsTrashWindowTest,
      OrderedIconsTrashWindowTest,
      ReverseIconsTrashWindowTest,
    ];
    const scoreWindowTests = [
      OneWinUpdatingScoreWindowTest,
      TwoWinsUpdatingScoreWindowTest
    ];
    const commandWindowTests = [
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
    const folderWindowTests = [
      CreateFolderWindowTest,
    ];
    const stepsTests = [
      // // DisplayStep
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

      // // DrawStep
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
      // ShouldLoadBattlefieldsDrawPhaseTest,

      // // FolderStep
      // ShouldShowPlayerFolderWindowTest,
      // ShouldCloseFolderWindowWhenSelectedFolderTest,

      // // MiniGameStep
      // ShouldShowMiniGameCardsetTest,
      // ShouldShufflerCardsTest,
      // ShouldShowGameResultWindowCardsTest,
      // ShouldCloseMiniGameOnSelectedCardTest,

      // // TurnStep
      // ShouldShowChallengedBoardWindowLoadPhaseTest,
      // ShouldShowChallengedBattleWindowLoadPhaseTest,
      // ShouldShowChallengedScoreWindowLoadPhaseTest,
      // ShouldShowChallengedTrashWindowLoadPhaseTest,
      // ShouldShowPlayerBoardWindowLoadPhaseTest,
      // ShouldShowPlayerBattleWindowLoadPhaseTest,
      // ShouldShowPlayerTrashWindowLoadPhaseTest,
      // ShouldShowPlayerScoreWindowLoadPhaseTest,
      // ShouldShowChallengedCardsetLoadPhaseTest,
      // ShouldShowPlayerCardsetLoadPhaseTest,
      // ShouldShowTextWindowLoadPhaseTest,
      // PlayerMustPlayedFirstWhenWinningMiniGameLoadPhaseTest,
      // PlayerMustPlayedNextWhenLosingMiniGameLoadPhaseTest,
      // PlayerMustMakePlayWhenYourTurnLoadPhaseTest,
      // ChallengedMustMakePlayWhenYourTurnLoadPhaseTest,
      // PlayerMustPassedTurnYourTurnLoadPhaseTest,
      // ChallengeMustPassedTurnWhenYourTurnLoadPhaseTest,
      // ShouldActivatePowerZoneWhenItHasCardLoadPhaseTest,
      // ShouldActivatePowerZoneWhenReachLimiteLoadPhaseTest,
      // ShouldEndWhenThereAreMovesLoadPhaseTest,

      // // ZoneStep
      // ShouldShowLocationWindowInHandZoneStepLoadPhaseTest,
      // ShouldShowCardNameWindowInHandZoneStepLoadPhaseTest,
      // ShouldShowCardDescriptionWindowInHandZoneStepLoadPhaseTest,
      // ShouldShowCardPropsWindowInHandZoneStepLoadPhaseTest,
      // ShouldChangeCardOnMoveCursorInHandZoneStepLoadPhaseTest,
      // ShouldCloseAndChangeStepWhenGoingBackInHandZoneStepLoadPhaseTest,
      // ShouldSelectCardToPlayHandZoneStepLoadPhaseTest,

      // // SlotStep
      // ShouldShowChallengedTrashWindowOnSlotStepInLoadPhaseTest,
      // ShouldShowChallengedBattleWindowOnSlotStepInLoadPhaseTest,
      // ShouldShowChallengedBoardWindowOnSlotStepInLoadPhaseTest,
      // ShouldShowChallengedScoreWindowOnSlotStepInLoadPhaseTest,
      // ShouldShowPlayerTrashWindowOnSlotStepInLoadPhaseTest,
      // ShouldShowPlayerBattleWindowOnSlotStepInLoadPhaseTest,
      // ShouldShowPlayerBoardWindowOnSlotStepInLoadPhaseTest,
      // ShouldShowPlayerScoreWindowOnSlotStepInLoadPhaseTest,
      ShouldShowCardSpriteSelectedOnSlotStepInLoadPhaseTest,
    ];
    return [
      // ...cardSpriteTests,
      // ...cardsetSpriteTests,
      // ...commandWindowTests,
      // ...StateWindowTests,
      // ...textWindowTests,
      // ...boardWindowTests,
      // ...battlePointsWindowTests,
      // ...trashWindowTests,
      // ...scoreWindowTests,
      // ...folderWindowTests,
      ...stepsTests,
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
    this._endTestDate = new Date();
    this.printResults(testsResults);
    this.printTotals(testsResults);
    this.openFinishWindow();
  }

  clearScene() {
    return new Promise(async resolve => {
      this.clearCollisions();
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

  clearCollisions() {
    this._collisions = [];
  }

  openFinishWindow() {
    const time = this.calculateDifferenceInMinutesAndSeconds(this._startTestDate, this._endTestDate);
    this._finishWindow.contents.clear();
    this._finishWindow.contents.fontSize = 24;
    this._finishWindow.contents.drawText(`Testes finalizados em: ${time} segundos!`, 0, 0, Graphics.boxWidth, 48, 'center');
    this.addWindow(this._finishWindow);
    this._finishWindow.show();
    this._finishWindow.open();
  }

  calculateDifferenceInMinutesAndSeconds(startDate, endData) {
    const timestamp1 = new Date(startDate).getTime();
    const timestamp2 = new Date(endData).getTime();
    let difference = Math.abs(timestamp2 - timestamp1);
    difference = Math.floor(difference / 1000);
    const minutes = Math.floor(difference / 60);
    const seconds = difference % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
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
      this.updateCollisions();
    }
  }

  updateCollisions() {
    if (this.hasCollision()) {
      this._collisions.forEach(collision => {
        const { collider, target, react } = collision;
        if (this.wasCollision(collider, target)) {
          react();
          this.removeCollision(collision);
        }
      });
    }
  }

  hasCollision() {
    return this._collisions.length > 0;
  }

  wasCollision(collider, target) {
    const { x: xCollider, y: yCollider, width: widthCollider, height: heightCollider } = collider;
    const { x: xTarget, y: yTarget, width: widthTarget, height: heightTarget } = target;
    const widthBorderCollider = xCollider + widthCollider;
    const heightBorderCollider = yCollider + heightCollider;
    const widthBorderTarget = xTarget + widthTarget;
    const heightBorderTarget = yTarget + heightTarget;
    return xCollider <= widthBorderTarget && 
      widthBorderCollider >= xTarget && 
      yCollider <= heightBorderTarget && 
      heightBorderCollider >= yTarget;
  }

  removeCollision(collision) {
    this._collisions = this._collisions.filter(c => c !== collision);
  }

  addCollision(collider, target, react) {
    if (!(collider instanceof Sprite) || !(target instanceof Sprite)) {
      throw new Error('Collider and Target must be instance of Sprite');
    }
    if (typeof react !== 'function') {
      throw new Error('React must be a function');
    }
    this._collisions.push({ collider, target, react });
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

  getStep() {
    return this._status;
  }

  setStep(step) {
    this._status = step;
  }

  isStep(step) {
    return this._status instanceof step;
  }
}