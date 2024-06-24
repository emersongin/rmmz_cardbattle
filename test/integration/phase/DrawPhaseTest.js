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
    const titleWindow = this.phase.createTitleWindow('Draw Phase');
    const descriptionWindow = this.phase.createDescriptionWindow('6 cards will be drawn.');
    this.addHiddenWatched(titleWindow);
    this.addHiddenWatched(descriptionWindow);
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
    const energies = Object.values(this.manager.player.energies);
    const cardsInDeck = this.manager.player.deck.length;
    const cardsInHand = this.manager.player.hand.length;
    const cardsInTrash = this.manager.player.trash.length;
    const victories = this.manager.player.victories;
    const passed = this.manager.player.passed;
    const boardWindow = this.phase.createPlayerBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.phase.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = this.phase.createPlayerTrashWindow(cardsInTrash);
    const scoreWindow = this.phase.createPlayerScoreWindow(victories, boardWindowHeight);
    const battlefield = this.phase.createPlayerBattlefield();
    this.addHiddenWatched(boardWindow);
    this.addHiddenWatched(battleWindow);
    this.addHiddenWatched(trashWindow);
    this.addHiddenWatched(scoreWindow);
    this.addHiddenWatched(battlefield);
  }

  createChallengeGameBoard() {
    const energies = Object.values(this.manager.challenge.energies);
    const cardsInDeck = this.manager.challenge.deck.length;
    const cardsInHand = this.manager.challenge.hand.length;
    const cardsInTrash = this.manager.challenge.trash.length;
    const victories = this.manager.challenge.victories;
    const passed = this.manager.challenge.passed;
    const boardWindow = this.phase.createChallengeBoardWindow(energies, cardsInDeck, cardsInHand, passed);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.phase.createChallengeBattleWindow(boardWindowHeight);
    const trashWindow = this.phase.createChallengeTrashWindow(cardsInTrash);
    const scoreWindow = this.phase.createChallengeScoreWindow(victories, boardWindowHeight);
    const battlefield = this.phase.createChallengeBattlefield();
    this.addHiddenWatched(boardWindow);
    this.addHiddenWatched(battleWindow);
    this.addHiddenWatched(trashWindow);
    this.addHiddenWatched(scoreWindow);
    this.addHiddenWatched(battlefield);
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