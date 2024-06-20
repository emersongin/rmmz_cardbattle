class LoadPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = {
    startPlay: false,
    player: {
      deck: [
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
      hand: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
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
      hand: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
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
    this.phase = new LoadPhase(this.scene);
    this.endTest = this.createHandler();
  }
  
  start() {
    this.scene.setPhase(this.phase);
    this.phase.createTitleWindow('Load Phase');
    this.phase.createDescriptionWindow('Select and use a Program Card.');
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
      this.phase.createTextWindow('Begin Load Phase');
      this.phase.openBeginLoadPhaseWindow();
      this.addHiddenWatched(this.phase.getTextWindow());
      this.phase.setStep(GameConst.BEGIN_LOAD_PHASE);
    }
    if (this.phase.isCurrentStep(GameConst.BEGIN_LOAD_PHASE) && Input.isTriggered('ok')) {
      this.phase.closeBeginLoadPhaseWindow();
      this.phase.leaveBeginLoadPhaseWindow();
      if (this.manager.startPlay) {
        this.phase.setStep(GameConst.PLAYER_LOAD_PHASE);
      } else {
        this.phase.setStep(GameConst.CHALLENGE_LOAD_PHASE);
      }
    }
    if (this.phase.isCurrentStep(GameConst.CHALLENGE_LOAD_PHASE)) {
      this.manager.challenge.passed = true;
      this.phase.challengePass();
      this.phase.stepWainting();
      if (this.manager.player.passed === false) this.phase.setStep(GameConst.PLAYER_LOAD_PHASE);
    }
    if (this.phase.isCurrentStep(GameConst.PLAYER_LOAD_PHASE)) {
      const commandYes = () => {
        this.phase.commandCloseAskWindow();
        this.phase.leaveAskWindow();
        this.phase.closeGameBoards();
        this.phase.leaveGameBoards();
        this.commandPlayerHand();
      };
      const commandNo = () => {
        this.phase.commandCloseAskWindow();
        this.phase.leaveAskWindow();
        this.commandPlayerPassed();
      };
      this.phase.createAskWindow('Use a Program Card?', commandYes, commandNo);
      this.phase.openAskWindow();
      this.phase.stepWainting();
    }

    if (this.phase.isCurrentStep(GameConst.ACTIVE_POWER_CARD) && Input.isTriggered('cancel')) {
      this.phase.closeGameBoards();
      this.phase.leaveGameBoards();
      this.phase.closePowerCard();
      this.phase.leavePowerCard();
      this.commandPlayerHand();
      this.phase.stepWainting();
    }

    if ((this.manager.player.passed && this.manager.challenge.passed) && 
        this.phase.isCurrentStep(GameConst.END_PHASE) === false) {
      this.phase.addWait();
      this.phase.closeGameBoards();
      this.phase.leaveGameBoards();
      this.phase.addAction(this.endTest);
      this.phase.stepEnd();
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

  commandPlayerHand() {
    const onChangeCursor = index => {
      const card = this.manager.player.hand[index];
      this.phase.commandSetTextCardNameWindow(['card.name' + index]);
      this.phase.commandSetTextCardDescriptionWindow(['card.description' + index]);
      this.phase.commandSetTextCardPropsWindow(['card.props' + index]);
    };
    const onSelectHandler = cardIndexs => {
      const sprite = this.phase.commandGetSprites(cardIndexs);
      this.phase.selectPowerCard(sprite);
      this.phase.closePlayerHand();
      this.phase.leavePlayerHand();
      this.createPlayerGameBoard();
      this.createChallengeGameBoard();
      this.phase.openGameBoards();
      const cards = CardGenerator.generateCards(1, 1);
      this.phase.activatePowerCard(cards);
      this.phase.setStep(GameConst.ACTIVE_POWER_CARD);
    };
    const onCancelHandler = () => {
      this.phase.closePlayerHand();
      this.phase.leavePlayerHand();
      this.createPlayerGameBoard();
      this.createChallengeGameBoard();
      this.phase.openGameBoards();
      this.phase.setStep(GameConst.PLAYER_LOAD_PHASE);
    };

    const playerEnergies = Object.values(this.manager.player.energies);
    const playerCardsInDeck = this.manager.player.deck.length;
    const playerCardsInHand = this.manager.player.hand.length;
    this.phase.createPlayerBoardWindow(playerEnergies, playerCardsInDeck, playerCardsInHand);

    this.phase.createPlayerHandset(this.manager.player.hand);
    this.phase.openPlayerHand(onSelectHandler, onChangeCursor, onCancelHandler);
  }

  commandPlayerPassed() {
    this.manager.player.passed = true;
    this.phase.playerPass();
    this.phase.stepWainting();
    if (this.manager.challenge.passed === false) this.phase.setStep(GameConst.CHALLENGE_LOAD_PHASE);
  }
  
  asserts() {
    this.describe('Deve apresentar etapas de fase de carregamento.');
    this.expectWasTrue('A janela de texto foi apresentada?', 'visible', this.phase.getTextWindow());
  }
}