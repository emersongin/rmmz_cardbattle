class LoadPhaseTurnStepPlayerPlaysNextTest extends SceneTest {
  manager = {
    playerStartTurn: false,
    player: {
      deck: [],
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
    challenged: {
      deck: [],
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
    getChallengedDescription: () => 'Desafie um amigo para uma partida de xadrez.',
    getPlayerDeck: () => this.manager.player.deck,
    getPlayerHand: () => this.manager.player.hand,
    getPlayerEnergies: () => this.manager.player.energies,
    getPlayerDeckLength: () => this.manager.player.deck.length,
    getPlayerHandLength: () => this.manager.player.hand.length,
    getPlayerTrashLength: () => this.manager.player.trash.length,
    getPlayerVictories: () => this.manager.player.victories,
    getChallengedDeck: () => this.manager.challenged.deck,
    getChallengedHand: () => this.manager.challenged.hand,
    getChallengedEnergies: () => this.manager.challenged.energies,
    getChallengedDeckLength: () => this.manager.challenged.deck.length,
    getChallengedHandLength: () => this.manager.challenged.hand.length,
    getChallengedTrashLength: () => this.manager.challenged.trash.length,
    getChallengedVictories: () => this.manager.challenged.victories,
    setPlayerHand: (hand) => this.manager.player.hand = hand,
    setPlayerEnergies: (energies) => this.manager.player.energies = energies,
    setChallengedHand: (hand) => this.manager.challenged.hand = hand,
    setChallengedEnergies: (energies) => this.manager.challenged.energies = energies,
    playerStart: () => this.manager.playerStartTurn = true,
    playerPassed: () => this.manager.player.passed = true,
    challengedPassed: () => this.manager.challenged.passed = true,
    isPlayerStartTurn: () => this.manager.playerStartTurn,
    isPlayerPassed: () => this.manager.player.passed,
    isChallengedPassed: () => this.manager.challenged.passed,
  };
  step;

  create() {
    this.step = new TurnStep(this._scene);
  }

  start() {
    this._scene.setPhase(GameConst.LOAD_PHASE);
    this._scene.setStep(this.step);
    this.step.start(this.manager);
  }

  update() {
    this.step.update(this.manager);
  }
  
  asserts() {
    this.describe('O jogador não deve iniciar a jogada na etapa de jogadas de fase de carregar.');
    this.expectTrue('O jogador não iniciou a jogada?', this.manager.isPlayerStartTurn() === false);
  }
}