class DrawPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = {
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
    },
  };

  create() {
    this.phase = new DrawPhase(this.scene);
    this.endTest = this.createHandler();
  }
  
  start() {
    this.scene.setPhase(this.phase);
    this.phase.createTitleWindow('Draw Phase');
    this.phase.createDescriptionWindow('6 cards will be drawn.');
    this.addHiddenWatched(this.phase.getTitleWindow());
    this.addHiddenWatched(this.phase.getDescriptionWindow());
    this.phase.openTextWindows();
    this.phase.setStep(GameConst.START_PHASE);
  }

  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isCurrentStep(GameConst.START_PHASE) && Input.isTriggered('ok')) {
      this.phase.commandCloseTextWindows();
      this.phase.leaveTextWindows();
      this.createPlayerGameBoard();
      this.createChallengeGameBoard();
      this.phase.openGameBoards();
      this.drawCards();
      this.updateGameBoards();
      this.phase.setStep(GameConst.START_DRAW_CARDS);
    }
    if (this.phase.isCurrentStep(GameConst.START_DRAW_CARDS) && Input.isTriggered('ok')) {
      this.phase.closeGameBoards();
      this.phase.leaveGameBoards();
      this.phase.addAction(this.endTest);
    }
  }

  createPlayerGameBoard() {
    const playerEnergies = Object.values(this.manager.player.energies);
    const playerCardsInDeck = this.manager.player.deck.length;
    const playerCardsInHand = this.manager.player.hand.length;
    const playerCardsInTrash = this.manager.player.trash.length;
    const playerVictories = this.manager.player.victories;
    this.phase.createPlayerBoardWindow(playerEnergies, playerCardsInDeck, playerCardsInHand);
    this.phase.createPlayerBattleWindow();
    this.phase.createPlayerTrashWindow(playerCardsInTrash);
    this.phase.createPlayerScoreWindow(playerVictories);
    this.phase.createPlayerBattlefield();
    this.addHiddenWatched(this.phase.getPlayerBoardWindow());
    this.addHiddenWatched(this.phase.getPlayerBattleWindow());
    this.addHiddenWatched(this.phase.getPlayerTrashWindow());
    this.addHiddenWatched(this.phase.getPlayerScoreWindow());
    this.addHiddenWatched(this.phase.getPlayerBattlefield());
  }

  createChallengeGameBoard() {
    const challengeEnergies = Object.values(this.manager.challenge.energies);
    const challengeCardsInDeck = this.manager.challenge.deck.length;
    const challengeCardsInHand = this.manager.challenge.hand.length;
    const challengeCardsInTrash = this.manager.challenge.trash.length;
    const challengeVictories = this.manager.challenge.victories;
    this.phase.createChallengeBoardWindow(challengeEnergies, challengeCardsInDeck, challengeCardsInHand);
    this.phase.createChallengeBattleWindow();
    this.phase.createChallengeTrashWindow(challengeCardsInTrash);
    this.phase.createChallengeScoreWindow(challengeVictories);
    this.phase.createChallengeBattlefield();
    this.addHiddenWatched(this.phase.getChallengeBoardWindow());
    this.addHiddenWatched(this.phase.getChallengeBattleWindow());
    this.addHiddenWatched(this.phase.getChallengeTrashWindow());
    this.addHiddenWatched(this.phase.getChallengeScoreWindow());
    this.addHiddenWatched(this.phase.getChallengeBattlefield());
  }

  drawCards() {
    const playerNumCardsInDeck = this.manager.player.deck.length;
    const playerCardsDrawed = this.manager.player.deck.splice(0, 6);
    this.manager.player.hand = playerCardsDrawed;
    const playerData = {
      cards: playerCardsDrawed,
      cardsInDeck: playerNumCardsInDeck,
    };
    const challengeNumCardsInDeck = this.manager.challenge.deck.length;
    const challengeCardsDrawed = this.manager.challenge.deck.splice(0, 6);
    this.manager.challenge.hand = challengeCardsDrawed;
    const challengeData = {
      cards: challengeCardsDrawed,
      cardsInDeck: challengeNumCardsInDeck,
    };
    this.phase.drawCards(playerData, challengeData);
  }

  updateGameBoards() {
    const playerCardsInHand = this.manager.player.hand;
    const playerEnergiesClone = Object.assign({}, this.manager.player.energies);
    const playerUpdates = this.createFieldUpdates(playerCardsInHand, playerEnergiesClone);
    const playerFieldUpdates = playerUpdates.fieldUpdates;
    this.manager.player.energies = playerUpdates.energies;
    const challengeCardsInHand = this.manager.challenge.hand;
    const challengeEnergiesClone = Object.assign({}, this.manager.challenge.energies);
    const challengeUpdates = this.createFieldUpdates(challengeCardsInHand, challengeEnergiesClone);
    const challengeFieldUpdates = challengeUpdates.fieldUpdates;
    this.manager.challenge.energies = challengeUpdates.energies;
    this.phase.updateGameBoards(playerFieldUpdates, challengeFieldUpdates);
  }

  createFieldUpdates(cards, energies) {
    const fieldUpdates = cards.map((card, cardIndex) => {
      const { color } = card;
      if (color === GameConst.BROWN) return false;
      energies[color] += 1;
      const points = energies[color];
      const updatePoint = BoardWindow.createValueUpdate(color, points);
      return { cardIndex, updatePoint };
    });
    return { fieldUpdates, energies };
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de sorteio e carregamento de energias.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase.getTitleWindow());
    this.expectWasTrue('A janela de descrição de sorteio foi apresentada?', 'visible', this.phase.getDescriptionWindow());
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', 'visible', this.phase.getPlayerBoardWindow());
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', 'visible', this.phase.getPlayerBattleWindow());
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', 'visible', this.phase.getPlayerTrashWindow());
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', 'visible', this.phase.getPlayerScoreWindow());
    this.expectWasTrue('A janela de tabuleiro do desafiante foi apresentado?', 'visible', this.phase.getChallengeBoardWindow());
    this.expectWasTrue('A janela de batalha do desafiante foi apresentada?', 'visible', this.phase.getChallengeBattleWindow());
    this.expectWasTrue('A janela de lixo do desafiante foi apresentada?', 'visible', this.phase.getChallengeTrashWindow());
    this.expectWasTrue('A janela de pontuação do desafiante foi apresentada?', 'visible', this.phase.getChallengeScoreWindow());
    this.expectTrue('O total de cards no campo do jogar é?', this.manager.player.deck.length === 34);
    this.expectTrue('O total de cards no campo do desafiante é?', this.manager.challenge.deck.length === 34);
    this.expectTrue('O total de cards na mão do jogador é?', this.manager.player.hand.length === 6);
    this.expectTrue('O total de cards na mão do desafiante é?', this.manager.challenge.hand.length === 6);
  }
}