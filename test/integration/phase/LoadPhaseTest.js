class LoadPhaseTest extends SceneTest {
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
    playerPassed: () => this.manager.player.passed = true,
    setPlayerHand: (hand) => this.manager.player.hand = hand,
    setPlayerEnergies: (energies) => this.manager.player.energies = energies,
    getCardPlayerHandByIndex: (index) => this.manager.player.hand[index],
    getChallengeDeck: () => this.manager.challenge.deck,
    getChallengeHand: () => this.manager.challenge.hand,
    getChallengeEnergies: () => this.manager.challenge.energies,
    getChallengeDeckLength: () => this.manager.challenge.deck.length,
    getChallengeHandLength: () => this.manager.challenge.hand.length,
    getChallengeTrashLength: () => this.manager.challenge.trash.length,
    getChallengeVictories: () => this.manager.challenge.victories,
    isChallengePassed: () => this.manager.challenge.passed,
    challengePassed: () => this.manager.challenge.passed = true,
    setChallengeHand: (hand) => this.manager.challenge.hand = hand,
    setChallengeEnergies: (energies) => this.manager.challenge.energies = energies,
    getPowerCardParams: (cardId) => {
      return {
        type: GameConst.ADD_ENERGIES,
      };
    },
    moveCardHandToPowerField: (index, player) => {
      const card = this.manager.getCardPlayerHandByIndex(index);
      this.manager.addCardToPowerField(card, player);
      this.manager.removeCardFromPlayerHand(index);
    },
    addCardToPowerField: (card, player) => {
      const cardSlot = { card, player };
      this.manager.powerfield.push(cardSlot);
    },
    removeCardFromPlayerHand: (index) => {
      const newSet = this.manager.player.hand.filter((card, iCard) => iCard !== index);
      this.manager.setPlayerHand(newSet);
    },
    getPowerfieldLength: () => this.manager.powerfield.length,
    resetPlayes: () => {
      this.manager.player.passed = false;
      this.manager.challenge.passed = false;
    },
    isStartPlays: () => {
      return !this.manager.player.passed && !this.manager.challenge.passed;
    },
    isEndPlays: () => {
      return this.manager.player.passed && this.manager.challenge.passed;
    },
    getPowerfieldLastCardSlot: () => {
      return this.manager.powerfield[this.manager.powerfield.length - 1];
    },
    removePowerfieldLastCardSlot: () => {
      return this.manager.powerfield.pop();
    },
    startPlay: false,
    powerfield: [],
    player: {
      deck: [
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
      ],
      hand: [
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
      ],
      trash: [],
      energies: {
        [GameConst.RED]: 1,
        [GameConst.BLUE]: 1,
        [GameConst.GREEN]: 1,
        [GameConst.BLACK]: 1,
        [GameConst.WHITE]: 1,
      },
      victories: 0,
      passed: false,
    },
    challenge: {
      deck: [
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
      ],
      hand: [
        { id: 1, type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { id: 1, type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { id: 1, type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
      ],
      trash: [],
      energies: {
        [GameConst.RED]: 1,
        [GameConst.BLUE]: 1,
        [GameConst.GREEN]: 1,
        [GameConst.BLACK]: 1,
        [GameConst.WHITE]: 1,
      },
      victories: 0,
      passed: false,
    },
  };

  create() {
    this.phase = new LoadPhase(this._scene);
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
    this.describe('Deve apresentar etapas de fase de carregamento.');
    this.expectWasTrue('A janela de título foi apresentada?', this.phase.isTitleWindowVisible);
    this.expectWasTrue('A janela de descrição de sorteio foi apresentada?', this.phase.isDescriptionWindowVisible);
    this.expectWasTrue('A janela de texto de inicio de fase foi apresentada?', this.phase.isTextWindowVisible);
    this.expectWasTrue('A janela de pergunta foi apresentada?', this.phase.isAskWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', this.phase.isPlayerBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', this.phase.isPlayerBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', this.phase.isPlayerTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', this.phase.isPlayerScoreWindowVisible);
    this.expectWasTrue('A janela de tabuleiro do desafiante foi apresentado?', this.phase.isChallengeBoardWindowVisible);
    this.expectWasTrue('A janela de batalha do desafiante foi apresentada?', this.phase.isChallengeBattleWindowVisible);
    this.expectWasTrue('A janela de lixo do desafiante foi apresentada?', this.phase.isChallengeTrashWindowVisible);
    this.expectWasTrue('A janela de pontuação do desafiante foi apresentada?', this.phase.isChallengeScoreWindowVisible);
    this.expectWasTrue('A janela de localização foi apresentada?', this.phase.isLocationWindowVisible);
    this.expectWasTrue('A janela de nome de cartão foi apresentada?', this.phase.isCardNameWindowVisible);
    this.expectWasTrue('A janela de descrição de cartão foi apresentada?', this.phase.isCardDescriptionWindowVisible);
    this.expectWasTrue('A janela de propriedades de cartão foi apresentada?', this.phase.isCardPropsWindowVisible);
    this.expectWasTrue('O campo de mão do jogador foi apresentado?', this.phase.isPlayerHandVisible);
    this.expectWasTrue('O campo de poder foi apresentado?', this.phase.isPowerFieldVisible);
  }
}