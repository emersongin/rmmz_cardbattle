class DrawPhaseTest extends SceneTest {
  phase;
  endTest;

  create() {
    this.phase = new DrawPhase(this.scene);
    this.phase.createTitleWindow('Draw Phase');
    this.phase.createDescriptionWindow('6 cards will be drawn.');
    const playerCardsInTrash = 0;
    const playerCardsInDeck = 0;
    const playerCardsInHand = 0;
    const playerEnergies = [0, 0, 0, 0, 0, 0];
    const playerVictories = 0;
    this.phase.createPlayerGameBoard(playerCardsInTrash, playerCardsInDeck, playerCardsInHand, playerEnergies, playerVictories);
    const challengeEnergies = [0, 0, 0, 0, 0, 0];
    const challengeCardsInTrash = 0;
    const challengeCardsInDeck = 0;
    const challengeCardsInHand = 0;
    const challengeVictories = 0;
    this.phase.createChallengeGameBoard(challengeCardsInTrash, challengeCardsInDeck, challengeCardsInHand, challengeEnergies, challengeVictories);
    this.addHiddenWatched(this.phase._titleWindow);
    this.addHiddenWatched(this.phase._descriptionWindow);
    this.addHiddenWatched(this.phase._playerBoardWindow);
    this.addHiddenWatched(this.phase._playerBattleWindow);
    this.addHiddenWatched(this.phase._playerTrashWindow);
    this.addHiddenWatched(this.phase._playerScoreWindow);
    this.addHiddenWatched(this.phase._challengeBoardWindow);
    this.addHiddenWatched(this.phase._challengeBattleWindow);
    this.addHiddenWatched(this.phase._challengeTrashWindow);
    this.addHiddenWatched(this.phase._challengeScoreWindow);
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
    }
    if (this.phase.isStepDrawCards() && Input.isTriggered('ok')) {
      this.phase.addAction(this.endTest);
    }
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de sorteio e carregamento de energias.');
    this.expectWasTrue('A janela de título foi apresentada?', 'visible', this.phase._titleWindow);
    this.expectWasTrue('A janela de descrição de sorteio foi apresentada?', 'visible', this.phase._descriptionWindow);
    this.expectWasTrue('A janela de tabuleiro do jogador foi apresentado?', 'visible', this.phase._playerBoardWindow);
    this.expectWasTrue('A janela de batalha do jogador foi apresentada?', 'visible', this.phase._playerBattleWindow);
    this.expectWasTrue('A janela de lixo do jogador foi apresentada?', 'visible', this.phase._playerTrashWindow);
    this.expectWasTrue('A janela de pontuação do jogador foi apresentada?', 'visible', this.phase._playerScoreWindow);
    this.expectWasTrue('A janela de tabuleiro do desafiante foi apresentado?', 'visible', this.phase._challengeBoardWindow);
    this.expectWasTrue('A janela de batalha do desafiante foi apresentada?', 'visible', this.phase._challengeBattleWindow);
    this.expectWasTrue('A janela de lixo do desafiante foi apresentada?', 'visible', this.phase._challengeTrashWindow);
    this.expectWasTrue('A janela de pontuação do desafiante foi apresentada?', 'visible', this.phase._challengeScoreWindow);
  }
}