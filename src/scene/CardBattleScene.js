class CardBattleScene extends Scene_Message {
  initialize() {
    super.initialize();
    this._phase = null;
    this.tests = [];
  }

  create() {
    super.create();
    this.createDisplayObjects();
    this.loadAssets();
    this.createTests();
  }

  createDisplayObjects() {
    this.createWindowLayer();
  }

  loadAssets() {
    ImageManager.loadCard('default');
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
      // OpenAndCloseTextWindowTest,
      SetTextTextWindowTest,
    ];
    this.tests = [
      // ...cardSpriteTests,
      // ...cardsetTests,
      ...textWindowTests,
    ];
    for (const test of this.tests) {
      this.changePhase(test);
      this._phase.create();
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