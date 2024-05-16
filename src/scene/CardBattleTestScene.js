class CardBattleTestScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._css = 'color: #FFFFFF; font-size: 12px; padding: 5px;';
    this._tests = [];
    this._nextTest = null;
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
      instanceCreated.create();
      return instanceCreated;
    });
  }
  
  testsData() {
    const cardSpriteTests = [
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
      UpdatingPointsCardSpriteTest
    ];
    const cardsetSpriteTests = [
      StartPositionCardsetSpriteTest,
      SetCardsCardsetSpriteTest,
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
      AddAllCardsToListCardsetSpriteTest,
      AddCardsToListCardsetSpriteTest,
      DisableCardsCardsetSpriteTest,
      StaticModeCardsetSpriteTest,
      SelectModeCardsetSpriteTest,
      SelectModeWithChoiceCardsetSpriteTest,
      FlashCardsCardsetSpriteTest,
      QuakeCardsCardsetSpriteTest,
      AnimationCardsCardsetSpriteTest,
    ];
    const CardBattleWindowBaseTests = [
      OpenCardBattleWindowBaseTest,
      CloseCardBattleWindowBaseTest,
      CreateOneFourthSizeCardBattleWindowBaseTest,
      CreateMiddleSizeCardBattleWindowBaseTest,
      CreateThreeFourthSizeCardBattleWindowBaseTest,
      CreateFullSizeCardBattleWindowBaseTest,
      ChangeBlueColorCardBattleWindowBaseTest,
      ChangeRedColorCardBattleWindowBaseTest,
      ChangeDefaultColorCardBattleWindowBaseTest,
      AlignStartTopCardBattleWindowBaseTest,
      AlignStartMiddleCardBattleWindowBaseTest,
      AlignStartBottomCardBattleWindowBaseTest,
      AlignCenterTopCardBattleWindowBaseTest,
      AlignCenterMiddleCardBattleWindowBaseTest,
      AlignCenterBottomCardBattleWindowBaseTest,
      AlignEndTopCardBattleWindowBaseTest,
      AlignEndMiddleCardBattleWindowBaseTest,
      AlignEndBottomCardBattleWindowBaseTest,
    ];
    const textWindowTests = [
      DrawTextStartAlignFullSizeTextWindowTest,
      DrawTextStartAlignMiddleSizeTextWindowTest,
      DrawTextCenterAlignFullSizeTextWindowTest,
      DrawTextCenterAlignMiddleSizeTextWindowTest,
      DrawTextEndAlignFullSizeTextWindowTest,
      DrawTextEndAlignMiddleSizeTextWindowTest,
      SetTextColorTextWindowTest,
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
    ];
    const scoreWindow = [
      OneWinUpdatingScoreWindowTest,
      TwoWinsUpdatingScoreWindowTest
    ];
    const commandWindowBase = [
      // CreateFullsizeCommandWindowTest,
      // OpenCommandWindowTest,
      // CloseCommandWindowTest,
      // AlignTopCommandWindowTest,
      // AlignMiddleCommandWindowTest,
      // AlignBottomCommandWindowTest,
      // AlignTextLeftCommandWindowTest,
      // AlignTextCenterCommandWindowTest,
      // AlignTextRightCommandWindowTest,
      // ChangeBlueColorCommandWindowTest,
      // ChangeRedColorCommandWindowTest,
      // ChangeDefaultColorCommandWindowTest,
      TextCommandWindowTest,
      // ChangeTextColorCommandWindowTest,
      // CommandsAndHandlersCommandWindowTest,
    ];
    const askCommandWindow = [
      SelectOptionAskCommandWindowTest,
    ];
    const foldersCommandWindow = [
      SelectFoldersCommandWindowTest,
    ];
    return [
      // ...cardSpriteTests,
      // ...cardsetSpriteTests,
      // ...CardBattleWindowBaseTests,
      // ...textWindowTests,
      // ...boardWindowTests,
      // ...battlePointsWindow,
      // ...trashWindow,
      // ...scoreWindow,
      ...commandWindowBase,
      // ...askCommandWindow,
      // ...foldersCommandWindow,
    ];
  }

  start() {
    super.start();
    this.startTests();
  }

  async startTests() {
    const testsResults = [];
    for (const test of this._tests) {
      this._nextTest = test;
      const result = await this._nextTest.run();
      this._nextTest = null;
      testsResults.push(result);
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
          if (child === this._windowLayer) return;
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
    console.log(`%c${msg.map(t => t.toString())}`,`background: #5DADE2; ${this._css}`);
  }

  printError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #800000; ${this._css}`);
  }

  printTestError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #090000; ${this._css}`);
  }

  printAssertError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #400000; ${this._css}`);
  }

  printSuccess(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #008000; ${this._css}`);
  }

  update() {
    if (this.isActive()) {
      if (this._nextTest) this._nextTest.update();
    }
    super.update();
  }

  isActive() {
    return !this.isBusy();
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

  addAnimationSprite(animationSprite) {
    this._animationSprites.push(animationSprite);
  }

  getLastAnimationSprite() {
    return this._animationSprites[this._animationSprites.length - 1];
  }
}