class CardBattleTestScene extends Scene_Message {
  initialize() {
    super.initialize();
    this.css = 'color: #FFFFFF; font-size: 12px; padding: 5px;';
    this.tests = [];
    this._test = null;
  }

  create() {
    super.create();
    this.createWindowLayer();
    this.createTests();
  }

  data() {
    const cardSpriteTests = [
      // StartOpenCardSpriteTest,
      // StartClosedCardSpriteTest,
      // CloseCardSpriteTest,
      // OpenCardSpriteTest,
      // MoveCardSpriteTest,
      // DisableCardSpriteTest,
      // HoveredCardSpriteTest,
      // SelectedCardSpriteTest,
      // FlashCardSpriteTest,
      DamageAnimationCardSpriteTest,
      // UpdatingPointsCardSpriteTest,
      // ZoomInCardSpriteTest,
      // ZoomOutCardSpriteTest,
      // LeaveCardSpriteTest,
      // QuakeCardSpriteTest,
      // FlipCardToUpSpriteTest,
      // IluminatedCardSpriteTest
    ];
    const cardsetTests = [
      // SetBackgroundAndStartPositionCardsetSpriteTest,
      // SetCardsCardsetSpriteTest,
      // StartPositionCardsCardsetSpriteTest,
      // StartListCardsCardsetSpriteTest,
      // StartClosedAndOpenCardsCardsetSpriteTest,
      // MoveCardsToListCardsetSpriteTest,
      // MoveCardsToPositionCardsetSpriteTest,
      // AddCardAndMoveToListCardsetSpriteTest,
      // SelectModeCardsetSpriteTest,
      // DisableAndEnableCardsCardsetSpriteTest,
      // SelectModeAndEnableChoiceCardsetSpriteTest,
      AnimateQuakeCardsCardsetSpriteTest,
      AnimateFlashCardsCardsetSpriteTest,
      AnimateDamageCardsCardsetSpriteTest,
    ];
    const textWindowTests = [
      OpenAndCloseTextWindowTest,
      SetTextTextWindowTest,
      PositionTextWindowTest,
      SetSizeTextWindowTest,
      DrawTextAndAlignCenterTextWindowTest,
      DrawTextAndLinesTextWindowTest,
      TextColorTextWindowTest,
    ];
    const gameBoardTests = [
      RefreshAndOpenGameBoardWindowTest,
      UpdatingPointsGameBoardTest,
    ];
    const gamePointsTests = [
      RefreshAndOpenGamePointsWindowTest,
      UpdatingPointsGamePointsWindowTest,
    ];
    return [
      // ...cardSpriteTests,
      ...cardsetTests,
    //   ...textWindowTests,
    //   ...gameBoardTests,
    //   ...gamePointsTests,
    ];
  }

  async createTests() {
    this.tests = this.data();
    this.tests = this.tests.map(test => {
      const instance = new test(this);
      instance.create();
      return instance;
    });
  }

  start() {
    super.start();
    this.startTests();
  }

  async startTests() {
    let results = [];
    for (const test of this.tests) {
      this._test = test;
      const result = await this._test.run();
      results.push(result);
      await this.clearScene();
    }
    this.printResults(results);
    this.printResultsTotals(results);
  }

  printResults(results) {
    results.forEach(test => {
      const { passed: isTestPassed, testName, assertsResult } = test;
      if (isTestPassed) {
        this.printSuccess(`Teste: ${test.testName} passou!`);
      } else {
        this.printError(`Teste: ${test.testName} falhou!`);
        assertsResult.forEach(allAsserts => {
          const { passed: isAssertsPassed, assertsName, asserts } = allAsserts;
          if (!isAssertsPassed) {
              this.printError(`Assert: ${assertsName}`);
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

  printResultsTotals(results) {
    const total = results.length;
    const success = results.filter(result => result.passed === true).length;
    const failed = total - success;
    this.printInfo(`Total de testes: ${total}`);
    this.printSuccess(`Testes passados: ${success}`);
    this.printError(`Testes falhados: ${failed}`);
  }

  printInfo(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #5DADE2; ${this.css}`);
  }

  printError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #FF0000; ${this.css}`);
  }

  printSuccess(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #008000; ${this.css}`);
  }

  update() {
    if (this.isActive()) {
      if (this._test) this._test.update();
    }
    super.update();
  }

  isActive() {
    return !this.isBusy();
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

  clearScene() {
    return new Promise(resolve => {
      const children = this.children;
      while (children.length > 1) {
        children.forEach(async child => {
          if (child === this._windowLayer) return;
          await this.removeChild(child);
        });
      }
      const windowChildren = this._windowLayer.children;
      while (windowChildren.length) {
        windowChildren.forEach(async child => {
          await this._windowLayer.removeChild(child);
        });
      }
      resolve(true);
    });
  }
}