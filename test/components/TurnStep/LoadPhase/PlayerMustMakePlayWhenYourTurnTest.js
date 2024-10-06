class PlayerMustMakePlayWhenYourTurnLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const handlers = {
      playerPassedHandler: () => {},
      challengedPassedHandler: () => {},
      activePowerfieldHandler: () => {},
    };
    this.step = new TurnStep(this._scene, GameConst.LOAD_PHASE, handlers);
    this.addAssistedHidden(this.step);
  }

  start() {
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandPlayerPlay', () => {
      finish();
    });
    CardBattleManager.folders[0] = {
      name: 'Mock Folder',
      energies: [0, 0, 0, 0, 0, 0],
      set: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
      ]
    };
    CardBattleManager.setPlayerDeck(0);
    CardBattleManager.setChallengedDeck(0);
    const drawNumber = 6;
    const putNumber = 3;
    CardBattleManager.drawPlayerCards(drawNumber);
    CardBattleManager.putPlayerCards(putNumber);
    CardBattleManager.drawChallengedCards(drawNumber);
    CardBattleManager.putChallengedCards(putNumber);
    CardBattleManager.playerStart();
    this.mockFunction(Input, 'isTriggered', () => true);
    this.spyFunction(this.step, 'commandOpenAskWindow', () => {
      const index = 0;
      this.step.selectAskWindowOption(index);
    });
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Jogador deve fazer uma jogada quando for sua vez em fase de carregamento.');
    this.expectWasTrue('A janela de decisão foi aberta?', this.step.isAskWindowVisible);
    this.expectTrue('Jogador tem cartões de poder para jogar?', CardBattleManager.isPlayerHasPowerCardInHand());
    this.expectTrue('A proxima etapa é ZoneStep?', this.isStep(ZoneStep));
  }
}