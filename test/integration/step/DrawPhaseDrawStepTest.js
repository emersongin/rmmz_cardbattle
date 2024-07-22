class DrawPhaseDrawStepTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const finish = this.createHandler();
    this.step = new DrawStep(this._scene, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this._scene.setPhase(GameConst.DRAW_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de saque de cartas e carregamento de energias.');
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    this.expectWasTrue('O campo de batalha do jogador foi apresentado?', this.step.isPlayerBattlefieldVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiante foi apresentado?', this.step.isChallengedBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiante foi apresentada?', this.step.isChallengedBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiante foi apresentada?', this.step.isChallengedTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiante foi apresentada?', this.step.isChallengedScoreWindowVisible);
    this.expectWasTrue('O campo de batalha do desafiante foi apresentado?', this.step.isChallengedBattlefieldVisible);
    this.expectTrue('O total de cards no campo do jogar é?', this.manager.getPlayerDeckLength() === 34);
    this.expectTrue('O total de cards no campo do desafiante é?', this.manager.getChallengedDeckLength() === 34);
    this.expectTrue('O total de cards na mão do jogador é?', this.manager.getPlayerHandLength() === 6);
    this.expectTrue('O total de cards na mão do desafiante é?', this.manager.getChallengedHandLength() === 6);
  }
}