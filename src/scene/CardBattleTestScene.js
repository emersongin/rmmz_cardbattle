class CardBattleTestScene extends Scene_Message {
  initialize() {
    super.initialize();
    this.tests = [];
    this._test = null;
  }

  create() {
    super.create();
    this.createWindowLayer();
    this.createTests();
  }

  async createTests() {
    const cardSpriteTests = [
      StartOpenCardSpriteTest,
      StartClosedCardSpriteTest,
      CloseCardSpriteTest,
      OpenCardSpriteTest,
      MoveCardSpriteTest,
      DisableCardSpriteTest,
      HoveredCardSpriteTest,
      SelectedCardSpriteTest,
      FlashCardSpriteTest,
      DamageAnimationCardSpriteTest,
      UpdatingPointsCardSpriteTest,
      ZoomInCardSpriteTest,
      ZoomOutCardSpriteTest,
      LeaveCardSpriteTest,
      QuakeCardSpriteTest,
      FlipCardToUpSpriteTest,
      IluminatedCardSpriteTest
    ];
    const cardsetTests = [
      SetBackgroundAndStartPositionCardsetSpriteTest,
      SetCardsCardsetSpriteTest,
      StartPositionCardsCardsetSpriteTest,
      StartListCardsCardsetSpriteTest,
      StartClosedAndOpenCardsCardsetSpriteTest,
      MoveCardsToListCardsetSpriteTest,
      MoveCardsToPositionCardsetSpriteTest,
      AddCardAndMoveToListCardsetSpriteTest,
      SelectModeCardsetSpriteTest,
      DisableAndEnableCardsCardsetSpriteTest,
      SelectModeAndEnableChoiceCardsetSpriteTest,
      AnimateCardsCardsetSpriteTest
    ];
    const textWindowTests = [
      OpenAndCloseTextWindowTest,
      SetTextTextWindowTest,
      PositionTextWindowTest,
      SetSizeTextWindowTest,
      DrawTextAndAlignCenterTextWindowTest,
      DrawTextAndLinesTextWindowTest,
    ];
    const gameBoardTests = [
      // OpenAndCloseGameBoardWindowTest,
      RefreshGameBoardWindowTest,
    ];
    this.tests = [
      // ...cardSpriteTests,
      // ...cardsetTests,
      // ...textWindowTests,
      ...gameBoardTests
    ];
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
    console.log(this.tests);
    for (const test of this.tests) {
      this._test = test;
      await this._test.start();
      await this._test.clearScene();
    }
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

  isBusy() {
    return super.isBusy();
  };

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };
}