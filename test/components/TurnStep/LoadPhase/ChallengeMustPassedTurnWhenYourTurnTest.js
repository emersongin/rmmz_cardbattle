class ChallengeMustPassedTurnWhenYourTurnLoadPhaseTest extends SceneTest {
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
    const finish = this.getHandler();
    this.spyFunction(this.step, 'commandChallengedPassed', () => {
      finish();
    });
    this.mockFunction(CardBattleManager, 'folders', [
      {
        name: 'Mock Folder',
        energies: [0, 0, 0, 0, 0, 0],
        set: [
          { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        ]
      }
    ]);
    CardBattleManager.setPlayerDeck(0);
    CardBattleManager.setChallengedDeck(0);
    const drawNumber = 1;
    CardBattleManager.drawPlayerCards(drawNumber);
    CardBattleManager.drawChallengedCards(drawNumber);
    this.mockFunction(Input, 'isTriggered', () => true);
    this._scene.setStep(this.step);
    this.step.start();
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Desafiado deve passar a jogada quando for sua vez em fase de carregamento.');
    this.expectTrue('O desafiado passou a jogada?', CardBattleManager.isChallengedPassed());
    this.expectTrue('A janela de tabuleiro do desafiado passou?', this.step.getChallengeBoardWindowHasPassed());
  }
}