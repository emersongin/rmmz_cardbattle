class ShouldMoveCursorInHandZoneStepLoadPhaseTest extends SceneTest {
  step;
  cardIndex;

  create() {
    this.createHandler();
    const config = { location: GameConst.HAND, player: GameConst.PLAYER};
    this.step = new ZoneStep(this._scene, GameConst.LOAD_PHASE, config);
    this.addAssistedHidden(this.step);
  }

  start() {
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
    this.describe('Deve apresentar etapa de seleção de cartão de poder de mão do jogador na fase de carregar');
    this.expectWasTrue('A janela de localização foi apresentado?', this.step.isLocationWindowVisible);
    this.expectWasTrue('A janela de nome de cartão foi apresentado?', this.step.isCardNameWindowVisible);
    this.expectWasTrue('A janela de descrição de cartão foi apresentado?', this.step.isCardDescriptionWindowVisible);
    this.expectWasTrue('A janela de propriedades de cartão foi apresentado?', this.step.isCardPropsWindowVisible);
    this.expectWasTrue('O set de cartas foi apresentado?', this.step.isCardsetSpriteVisible);
    this.expectTrue('O cursor foi movido?', this.cardIndex >= 0);
  }
}