class MoveCursorInHandZoneStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;
  cardIndex;

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    const config = {
      location: GameConst.HAND,
      player: GameConst.PLAYER,
      blockBattleCards: true,
      blockPowerCardsInLoadPhase: true
    };
    const handlers = {
      goBackHandler: () => {},
      selectHandler: () => {},
      moveCursorHandler: index => {
        this.cardIndex = index;
        finish();
      },
    };
    this.step = new ZoneStep(this._scene, phase, config, handlers, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this.manager.drawPlayerCards(6);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
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