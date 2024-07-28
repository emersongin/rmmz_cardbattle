class ActivetePowerFieldByLimitTurnStepInLoadPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.LOAD_PHASE;
    const finish = this.createHandler();
    const dummyFn = () => {};
    this.step = new TurnStep(this._scene, phase, dummyFn, dummyFn, dummyFn, dummyFn, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.playerPassed();
    this.manager.challengedPassed();
    const powerCard = { 
      type: GameConst.POWER, 
      color: GameConst.BLACK, 
      figureName: 'default', 
      attack: 10, 
      health: 10,
    };
    this.manager.addPowerCardToPowerfield(powerCard);
    this.manager.addPowerCardToPowerfield(powerCard);
    this.manager.addPowerCardToPowerfield(powerCard);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de turno e ativar o campo de poder na fase de carregar.');
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiado foi apresentado?', this.step.isChallengedBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiado foi apresentada?', this.step.isChallengedBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiado foi apresentada?', this.step.isChallengedScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiado foi apresentada?', this.step.isChallengedTrashWindowVisible);
    this.expectTrue('Foi ativado com limite de 3?', this.manager.getPowerfieldLength() === 3);
    this.expectTrue('A proxima Etapa é ActivatePowerCardStep?', this.isStep(RunPowerfieldStep));
  }
}