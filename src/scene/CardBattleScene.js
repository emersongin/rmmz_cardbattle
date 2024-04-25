class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._phase = null;
  }

  create() {
    super.create();
    this.createDisplayObjects();
    this.loadAssets();
  }

  createDisplayObjects() {
    this.createWindowLayer();
  }

  loadAssets() {
    ImageManager.loadCard('default');
  }

  start() {
    super.start();
    this.startTests();
  }

  async startTests() {
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
    const tests = [
      ...cardSpriteTests,
      // ...cardsetTests
    ];
    for (const test of tests) {
      this.changePhase(test);
      await this._phase.start();
      this._phase.clearScene();
    }
  }

  update() {
    if (this.isActive()) {
      if (this._phase) this._phase.update();
    }
    super.update();
  }

  changePhase(phase) {
    this._phase = new phase(this);
  }

  isActive() {
    return !this.isBusy();
  }

  isBusy() {
    return super.isBusy();
  };

  stop() {
    super.stop();
  }

  terminate() {
    super.terminate();
  }

  removeWindow(window) {
    this._windowLayer.removeChild(window);
  };

}