class ShouldShowLocationWindowInHandZoneStepLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const config = { location: GameConst.HAND, player: GameConst.PLAYER};
    this.step = new ZoneStep(this._scene, GameConst.LOAD_PHASE, config);
    this.addAssistedHidden(this.step);
  }

  start() {
    const finish = this.getHandler();
    this.spyFunction(this.step, 'openAllWindows', () => {
      this.step.addAction(finish);
    });
    CardBattleManager.setPlayerDeck();
    CardBattleManager.setChallengedDeck();
    CardBattleManager.drawPlayerCards(6);
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve mostrar a janela de localização de estapa de zona de mão em fase de carregamento.');
    this.expectWasTrue('A janela de localização foi apresentado?', this.step.isLocationWindowVisible);
    this.expectTrue('O título da fase foi apresentado como: Player Hand?', this.step.isLocationWindowText('Player Hand'));
    // this.expectWasTrue('A janela de nome de cartão foi apresentado?', this.step.isCardNameWindowVisible);
    // this.expectWasTrue('A janela de descrição de cartão foi apresentado?', this.step.isCardDescriptionWindowVisible);
    // this.expectWasTrue('A janela de propriedades de cartão foi apresentado?', this.step.isCardPropsWindowVisible);
    // this.expectWasTrue('O set de cartas foi apresentado?', this.step.isCardsetSpriteVisible);
    // this.expectTrue('O cursor foi movido?', this.cardIndex >= 0);
  }
}