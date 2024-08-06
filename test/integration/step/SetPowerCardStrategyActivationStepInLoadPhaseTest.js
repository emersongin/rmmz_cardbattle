class SetPowerCardStrategyActivationStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    const powerConfig = {
      cardIndex: 1,
      player: GameConst.PLAYER
    };
    const powerActivation = undefined;
    this.step = new ActivationStep(this._scene, phase, powerConfig, powerActivation);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this.manager.drawPlayerCards(6);
    this.manager.drawChallengedCards(6);
    this.mockFunction(this.manager, 'getCardsByPowerfield', () => {
      return [
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
      ];
    });
    this.mockFunction(this.manager, 'getPowerfieldLength', () => {
      return 2;
    });
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de ativação e definir estrategia para cartão de poder na fase de carregar.');
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    // this.expectWasTrue('A janela de tabuleiro do desafiado foi apresentado?', this.step.isChallengedBoardWindowVisible);
    // this.expectWasTrue('A janela de batalha do desafiado foi apresentada?', this.step.isChallengedBattleWindowVisible);
    // this.expectWasTrue('A janela de pontuação do desafiado foi apresentada?', this.step.isChallengedScoreWindowVisible);
    // this.expectWasTrue('A janela de lixo do desafiado foi apresentada?', this.step.isChallengedTrashWindowVisible);
    // this.expectWasTrue('O set de cartas de poder foi apresentado?', this.step.isPowerCardsetSpriteVisible);
  }
}