class DrawPhaseTest extends SceneTest {
  phase;
  endTest;

  create() {
    this.phase = new DrawPhase(this.scene);
    this.phase.createTitleWindow('Draw Phase');
    this.phase.createDescriptionWindow('6 cards will be drawn.');
    this.playerCardsInHand = [];
    this.playerCardsInDeck = CardGenerator.generateCards(40, 1);
    this.playerEnergies = {
      [GameConst.RED]: 0,
      [GameConst.BLUE]: 0,
      [GameConst.GREEN]: 0,
      [GameConst.BLACK]: 0,
      [GameConst.WHITE]: 0,
    };
    const playerEnergies = Object.values(this.playerEnergies);
    const playerData = { 
      cardsInTrash: 0, 
      cardsInDeck: this.playerCardsInDeck.length, 
      cardsInHand : 0, 
      victories: 0 
    };
    this.phase.createPlayerGameBoard(playerData, playerEnergies);
    this.challengeCardsInHand = [];
    this.challengeCardsInDeck = CardGenerator.generateCards(40, 1);
    this.challengeEnergies = {
      [GameConst.RED]: 0,
      [GameConst.BLUE]: 0,
      [GameConst.GREEN]: 0,
      [GameConst.BLACK]: 0,
      [GameConst.WHITE]: 0,
    };
    const challengeEnergies = Object.values(this.challengeEnergies);
    const challengeData = { 
      cardsInTrash: 0, 
      cardsInDeck: this.challengeCardsInDeck.length, 
      cardsInHand : 0, 
      victories: 0 
    };
    this.phase.createChallengeGameBoard(challengeData, challengeEnergies);
    this.phase.createPlayerBattlefield();
    this.phase.createChallengeBattlefield();
    this.addHiddenWatched(this.phase.getTitleWindow());
    this.addHiddenWatched(this.phase.getDescriptionWindow());
    this.addHiddenWatched(this.phase.getPlayerBoardWindow());
    this.addHiddenWatched(this.phase.getPlayerBattleWindow());
    this.addHiddenWatched(this.phase.getPlayerTrashWindow());
    this.addHiddenWatched(this.phase.getPlayerScoreWindow());
    this.addHiddenWatched(this.phase.getChallengeBoardWindow());
    this.addHiddenWatched(this.phase.getChallengeBattleWindow());
    this.addHiddenWatched(this.phase.getChallengeTrashWindow());
    this.addHiddenWatched(this.phase.getChallengeScoreWindow());
    this.endTest = this.createHandler();
  }
  
  start() {
    this.scene.setPhase(this.phase);
    this.phase.addChildren();
    this.phase.openTextWindows();
    this.phase.stepStart();
  }

  update() {
    if (this.phase.isBusy()) return false;
    if (this.phase.isStepStart() && Input.isTriggered('ok')) {
      this.phase.closeTextWindows();
      this.phase.stepDrawCards();
      this.phase.openGameBoards();
      
      const playerCardsInDeck = this.playerCardsInDeck.length;
      const challengeCardsInDeck = this.challengeCardsInDeck.length;
      const playerCards = this.playerCardsInDeck.splice(0, 6);
      const challengeCards = this.challengeCardsInDeck.splice(0, 6);
      this.playerCardsInHand = playerCards;
      this.challengeCardsInHand = challengeCards;
      const playerData = {
        cards: playerCards,
        cardsInDeck: playerCardsInDeck,
      };
      const challengeData = {
        cards: challengeCards,
        cardsInDeck: challengeCardsInDeck,
      };
      this.phase.drawCards(playerData, challengeData);

      const playerEnergies = Object.assign({}, this.playerEnergies);
      const { 
        fieldUpdates: playerFieldUpdates, 
        energies: playerEnergiesUpdated 
      } = this.createFieldUpdates(playerCards, playerEnergies);
      this.playerEnergies = playerEnergiesUpdated;

      const challengeEnergies = Object.assign({}, this.challengeEnergies);
      const { 
        fieldUpdates: challengeFieldUpdates, 
        energies: challengeEnergiesUpdated 
      } = this.createFieldUpdates(challengeCards, challengeEnergies);
      this.challengeEnergies = challengeEnergiesUpdated;

      this.phase.updateGameBoards(playerFieldUpdates, challengeFieldUpdates);
    }
    if (this.phase.isStepDrawCards() && Input.isTriggered('ok')) {
      this.phase.closeGameBoards();
      this.phase.addAction(this.endTest);
    }
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
    this.expectTrue('O total de cards no campo do jogar é?', this.playerCardsInDeck.length === 34);
    this.expectTrue('O total de cards no campo do desafiante é?', this.challengeCardsInDeck.length === 34);
    this.expectTrue('O total de cards na mão do jogador é?', this.playerCardsInHand.length === 6);
    this.expectTrue('O total de cards na mão do desafiante é?', this.challengeCardsInHand.length === 6);
  }
}