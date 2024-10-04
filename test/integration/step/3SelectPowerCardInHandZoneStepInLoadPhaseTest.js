class SelectPowerCardInHandZoneStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

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
      selectHandler: index => {
        const powerConfig = { cardIndex: 0, player: GameConst.PLAYER };
        this.step.changeStep(ActivationStep, powerConfig);
        finish();
      },
      moveCursorHandler: () => {},
    };
    this.step = new ZoneStep(this._scene, phase, config, handlers, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this.manager.drawPlayerCards(6);
    this._scene.setStep(this.step);
    const includeOriginal = true;
    this.mockFunction(this.step, 'openZone', () => {
      const index = 1;
      this.step.selectCard(index);
    }, includeOriginal, this.manager);
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
    this.expectTrue('A proxima Etapa é ActivationStep?', this.isStep(ActivationStep));
    this.expectTrue('Eh ActivationStep de desafiado?', this.step.getPlayer() === GameConst.PLAYER);
  }
}