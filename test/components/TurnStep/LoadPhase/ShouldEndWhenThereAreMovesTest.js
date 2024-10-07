class ShouldEndWhenThereAreMovesLoadPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new TurnStep(this._scene, GameConst.LOAD_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.spyCommandActivePowerZone();
    this.mockFolders();
    this.setDecks();
    this.drawCards(3);
    this.putCards(3);
    this.mockIsTriggered();
    this.spyCommandOpenAskWindow();
    this._scene.setStep(this.step);
    this.step.start();
  }

  spyCommandActivePowerZone() {
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandFinish', () => {
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
      const index = 1;
      this.step.selectAskWindowOption(index);
    });
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve entrar em etapa de zona de poder quando não existirem jogadas e sim pelo menos um cartão de poder em fase de carregamento.');
    this.expectTrue('A proxima etapa é DisplayStep?', this.isStep(DisplayStep));
  }
}