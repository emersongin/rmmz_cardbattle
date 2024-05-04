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
      StartClosedAndStartOpenCardSpriteTest,
      CloseAndOpenCardSpriteTest,
      MoveCardSpriteTest,
      DisableAndEnableCardSpriteTest,
      HoveredCardSpriteTest,
      SelectedCardSpriteTest,
      FlashCardSpriteTest,
      DamageAnimationCardSpriteTest,
      UpdatingPointsCardSpriteTest,
      ZoomAndZoomoutCardSpriteTest,
      LeaveCardSpriteTest,
      QuakeCardSpriteTest,
      FlipCardSpriteTest,
      IluminatedCardSpriteTest
    ];
    const cardsetTests = [
      SetBackgroundAndStartPositionCardsetSpriteTest,
      SetCardsCardsetSpriteTest,
      StartPositionCardsCardsetSpriteTest,
      StartListCardsCardsetSpriteTest,
      StartClosedAndOpenCardsCardsetSpriteTest,
      StartClosedAndOpenCardsDelayCardsetSpriteTest,
      MoveCardsToListCardsetSpriteTest,
      MoveCardsToListDelayCardsetSpriteTest,
      MoveCardsToPositionCardsetSpriteTest,
      AddCardAndMoveToListCardsetSpriteTest,
      AddCardAndMoveToListDelayCardsetSpriteTest,
      SelectModeCardsetSpriteTest,
      DisableAndEnableCardsCardsetSpriteTest,
      SelectModeAndEnableChoiceCardsetSpriteTest,
      AnimateQuakeCardsCardsetSpriteTest,
      AnimateFlashCardsCardsetSpriteTest,
      AnimateDamageCardsCardsetSpriteTest,
    ];
    const CardBattleWindowBaseTests = [
      OpenAndCloseCardBattleWindowBaseTest,
      ChangeColorCardBattleWindowBaseTest,
      SetMiddleSizeCardBattleWindowBaseTest,
      SetFullSizeCardBattleWindowBaseTest,
      AlignMiddleSizeCardBattleWindowBaseTest,
      AlignFullSizeCardBattleWindowBaseTest,
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
      UpdatingBoardWindowTest,
    ];
    const battlePointsWindow = [
      UpdatingBattlePointsWindowTest,
    ];
    const trashWindow = [
      UpdatingTrashWindowTest,
    ];
    const scoreWindow = [
      UpdatingScoreWindowTest,
    ];
    const others = [
      WindowTest
    ];
    return [
      ...cardSpriteTests,
      ...cardsetTests,
      ...CardBattleWindowBaseTests,
      ...textWindowTests,
      ...boardWindowTests,
      ...battlePointsWindow,
      ...trashWindow,
      ...scoreWindow,
      // ...others,
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
    let index = 0;
    for (const test of this.tests) {
      this._test = test;
      const result = await this._test.run();
      results.push(result);
      await this.clearScene();
      this._test = null;
      index++;
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
    console.log(`%c${msg.map(t => t.toString())}`,`background: #AA0000; ${this.css}`);
  }

  printTestError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #800000; ${this.css}`);
  }

  printAssertError(...msg) {
    console.log(`%c${msg.map(t => t.toString())}`,`background: #400000; ${this.css}`);
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
          child.destroy();
          await this.removeChild(child);
        });
      }
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
}