class ShouldLoadBattlefieldsDrawPhaseTest extends SceneTest {
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
    this.describe('Deve realizar carregamento de energias nas janelas de tabuleiros na fase de saque.');
    const playerConfig = { player: GameConst.PLAYER };
    const playerCardsInHand = CardBattleManager.getCards(playerConfig);
    const playerEnergies = this.reduceEnergies(playerCardsInHand);
    const playerBoardWindowValues = this.step.getPlayerBoardWindowValues();
    const isPlayerEnergyLoaded = this.compareEnergies(playerEnergies, playerBoardWindowValues);
    this.expectTrue('As energias do tabuleiro do jogador foram carregadas?', isPlayerEnergyLoaded === true);
    const challengedConfig = { player: GameConst.CHALLENGED };
    const challengedCardsInHand = CardBattleManager.getCards(challengedConfig);
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