class DrawPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = {
    getPlayerDeck: () => this.manager.player.deck,
    getPlayerHand: () => this.manager.player.hand,
    getPlayerEnergies: () => this.manager.player.energies,
    getPlayerDeckLength: () => this.manager.player.deck.length,
    getPlayerHandLength: () => this.manager.player.hand.length,
    getPlayerTrashLength: () => this.manager.player.trash.length,
    getPlayerVictories: () => this.manager.player.victories,
    isPlayerPassed: () => this.manager.player.passed,
    setPlayerHand: (hand) => this.manager.player.hand = hand,
    setPlayerEnergies: (energies) => this.manager.player.energies = energies,
    getChallengeDeck: () => this.manager.challenge.deck,
    getChallengeHand: () => this.manager.challenge.hand,
    getChallengeEnergies: () => this.manager.challenge.energies,
    getChallengeDeckLength: () => this.manager.challenge.deck.length,
    getChallengeHandLength: () => this.manager.challenge.hand.length,
    getChallengeTrashLength: () => this.manager.challenge.trash.length,
    getChallengeVictories: () => this.manager.challenge.victories,
    isChallengePassed: () => this.manager.challenge.passed,
    setChallengeHand: (hand) => this.manager.challenge.hand = hand,
    setChallengeEnergies: (energies) => this.manager.challenge.energies = energies,
    player: {
      deck: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
      ],
      hand: [],
      trash: [],
      energies: {
        [GameConst.RED]: 0,
        [GameConst.BLUE]: 0,
        [GameConst.GREEN]: 0,
        [GameConst.BLACK]: 0,
        [GameConst.WHITE]: 0,
      },
      victories: 0,
      passed: false,
    },
    challenge: {
      deck: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
      ],
      hand: [],
      trash: [],
      energies: {
        [GameConst.RED]: 0,
        [GameConst.BLUE]: 0,
        [GameConst.GREEN]: 0,
        [GameConst.BLACK]: 0,
        [GameConst.WHITE]: 0,
      },
      victories: 0,
      passed: false,
    },
    endPhase: () => {}
  };

  create() {
    this.phase = new DrawPhase(this._scene);
    this.manager.endPhase = this.createHandler();
    this.addAssistedHidden(this.phase);
  }

  start() {
    this._scene.setPhase(this.phase);
    this.phase.start(this.manager);
  }

  update() {
    this.phase.update(this.manager);
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de sorteio e carregamento de energias.');
    this.expectWasTrue('A janela de título foi apresentada?', this.phase.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de sorteio foi apresentada?', this.phase.isDescriptionWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.phase.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.phase.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.phase.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.phase.isPlayerScoreWindowVisible);
    this.expectWasTrue('O campo de batalha do jogador foi apresentado?', this.phase.isPlayerBattlefieldVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiante foi apresentado?', this.phase.isChallengeBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiante foi apresentada?', this.phase.isChallengeBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiante foi apresentada?', this.phase.isChallengeTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiante foi apresentada?', this.phase.isChallengeScoreWindowVisible);
    this.expectWasTrue('O campo de batalha do desafiante foi apresentado?', this.phase.isChallengeBattlefieldVisible);
    this.expectTrue('O total de cards no campo do jogar é?', this.manager.player.deck.length === 34);
    this.expectTrue('O total de cards no campo do desafiante é?', this.manager.challenge.deck.length === 34);
    this.expectTrue('O total de cards na mão do jogador é?', this.manager.player.hand.length === 6);
    this.expectTrue('O total de cards na mão do desafiante é?', this.manager.challenge.hand.length === 6);
  }
}