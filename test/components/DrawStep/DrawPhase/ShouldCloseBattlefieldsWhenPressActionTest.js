class ShouldCloseBattlefieldsWhenPressActionDrawPhaseTest extends SceneTest {
  step;

  create() {
    this.createHandler();
    this.step = new DrawStep(this._scene, GameConst.DRAW_PHASE);
    this.addAssistedHidden(this.step);
  }

  start() {
    CardBattleManager.setPlayerDeck();
    CardBattleManager.setChallengedDeck();
    this._scene.setStep(this.step);
    this.step.start();
    const finish = this.getHandler();
    this.mockFunction(Input, 'isTriggered', () => true);
    const commandFinish = this.step.commandFinish;
    this.spyFunction(this.step, 'commandFinish', () => {
      finish();
    });
  }

  update() {
    this.step.update();
  }
  
  asserts() {
    this.describe('Deve fecha os campos de batalha ao realizar ação e definir a proxima etap de apresentação na fase de carregamento.');
    this.expectTrue('A janela de tabuleiro do jogador foi fechada?', this.step.isPlayerBoardWindowClosed());
    this.expectTrue('A janela de batalha do jogador foi fechada?', this.step.isPlayerBattleWindowClosed());
    this.expectTrue('A janela de pontuação do jogador foi fechada?', this.step.isPlayerScoreWindowClosed());
    this.expectTrue('A janela de lixo do jogador foi fechada?', this.step.isPlayerTrashWindowClosed());
    this.expectTrue('O conjunto de cartões do jogador foi retirado?', this.step.isPlayerCardsetClosed());
    this.expectTrue('A janela de tabuleiro do desafiado foi fechada?', this.step.isChallengedBoardWindowClosed());
    this.expectTrue('A janela de batalha do desafiado foi fechada?', this.step.isChallengedBattleWindowClosed());
    this.expectTrue('A janela de pontuação do desafiado foi fechada?', this.step.isChallengedScoreWindowClosed());
    this.expectTrue('A janela de lixo do desafiado foi fechada?', this.step.isChallengedTrashWindowClosed());
    this.expectTrue('O conjunto de cartões do desafiado foi retirado?', this.step.isChallengedCardsetClosed());
    this.expectTrue('A proxima Etapa é DisplayStep?', this.isStep(DisplayStep));
    this.expectTrue('A proxima Fase é LOAD_PHASE?', this.step.getPhase() === GameConst.LOAD_PHASE);
  }
}