class DrawStepInDrawPhaseTest extends SceneTest {
  manager = CardBattleManager;
  step;

  create() {
    const phase = GameConst.DRAW_PHASE;
    const finish = this.createHandler();
    this.step = new DrawStep(this._scene, phase, finish);
    this.addAssistedHidden(this.step);
  }

  start() {
    this.manager.setPlayerDeck();
    this.manager.setChallengedDeck();
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapa de saque de cartas e carregamento de energias na fase de saque.');
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.step.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.step.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.step.isPlayerScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.step.isPlayerTrashWindowVisible);
    this.expectWasTrue('O set de cartas do jogador foi apresentado?', this.step.isPlayerCardsetSpriteVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiado foi apresentado?', this.step.isChallengedBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiado foi apresentada?', this.step.isChallengedBattleWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiado foi apresentada?', this.step.isChallengedScoreWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiado foi apresentada?', this.step.isChallengedTrashWindowVisible);
    this.expectWasTrue('O set de cartas do desafiado foi apresentado?', this.step.isChallengedCardsetSpriteVisible);
    this.expectTrue('A proxima Etapa é DisplayStep?', this.isStep(DisplayStep));
    this.expectTrue('A proxima Fase é LOAD_PHASE?', this.step.getPhase() === GameConst.LOAD_PHASE);
    const playerCardsInHand = this.manager.getPlayerHand();
    const playerEnergies = this.reduceEnergies(playerCardsInHand);
    const playerBoardWindowValues = this.step.getPlayerBoardWindowValues();
    const isPlayerEnergyLoaded = this.compareEnergies(playerEnergies, playerBoardWindowValues);
    this.expectTrue('As energias do tabuleiro do jogador foram carregadas?', isPlayerEnergyLoaded === true);
    const challengedCardsInHand = this.manager.getChallengedHand();
    const challengedEnergies = this.reduceEnergies(challengedCardsInHand);
    const challengedBoardWindowValues = this.step.getChallengedBoardWindowValues();
    const isChallengedEnergyLoaded = this.compareEnergies(challengedEnergies, challengedBoardWindowValues);
    this.expectTrue('As energias do tabuleiro do desafiado foram carregadas?', isChallengedEnergyLoaded === true);
  }

  reduceEnergies(cards) {
    return cards.reduce((acc, card) => {
      acc[card.color] = acc[card.color] + 1 || 1;
      return acc;
    }, {});
  }

  compareEnergies(energies, values) {
    return Object.keys(energies).every((color, index) => {
      if (color === GameConst.BROWN) return true;
      return values[color] === energies[color];
    });
  }
}