class PlayerMustMakePlayWhenYourTurnLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    const handlers = {
      activePowerfieldHandler: () => {},
    };
    this.step = new TurnStep(this._scene, GameConst.LOAD_PHASE, handlers);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.spyCommandPlayerPlay();
    this.mockFolders();
    this.setDecks();
    this.drawCards(6);
    this.putCards(3);
    CardBattleManager.playerStart();
    this.mockIsTriggered();
    this.spyCommandOpenAskWindow();
    this._scene.setStep(this.step);
    this.step.start();
  }

  spyCommandPlayerPlay() {
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandPlayerPlay', () => {
      finish();
    });
  }

  mockFolders() {
    this.mockFunction(CardBattleManager, 'folders', [
      {
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
      }
    ]);
  }

  setDecks() {
    CardBattleManager.setPlayerDeck(0);
    CardBattleManager.setChallengedDeck(0);
  }

  drawCards(drawNumber) {
    CardBattleManager.drawPlayerCards(drawNumber);
    CardBattleManager.drawChallengedCards(drawNumber);
  }

  putCards(putNumber) {
    CardBattleManager.putPlayerCards(putNumber);
    CardBattleManager.putChallengedCards(putNumber);
  }

  mockIsTriggered() {
    this.mockFunction(Input, 'isTriggered', () => true);
  }

  spyCommandOpenAskWindow() {
    this.spyFunction(this.step, 'commandOpenAskWindow', () => {
      const index = 0;
      this.step.selectAskWindowOption(index);
    });
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