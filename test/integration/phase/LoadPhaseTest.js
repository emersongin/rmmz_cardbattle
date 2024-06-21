class LoadPhaseTest extends SceneTest {
  phase;
  endTest;
  manager = {
    startPlay: false,
    player: {
      deck: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
      ],
      hand: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
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
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
      ],
      hand: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
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
    const titleWindow = this.phase.createTitleWindow('Load Phase');
    const descriptionWindow = this.phase.createDescriptionWindow('Select and use a Program Card.');
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
      const textWindow = this.phase.createTextWindow('Begin Load Phase');
      this.addHiddenWatched(textWindow);
      this.phase.openBeginLoadPhaseWindow();
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
    const boardWindow = this.phase.createPlayerBoardWindow(playerEnergies, playerCardsInDeck, playerCardsInHand);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.phase.createPlayerBattleWindow(boardWindowHeight);
    const trashWindow = this.phase.createPlayerTrashWindow(playerCardsInTrash);
    const scoreWindow = this.phase.createPlayerScoreWindow(playerVictories, boardWindowHeight);
    const battlefield = this.phase.createPlayerBattlefield();
    this.addHiddenWatched(boardWindow);
    this.addHiddenWatched(battleWindow);
    this.addHiddenWatched(trashWindow);
    this.addHiddenWatched(scoreWindow);
    this.addHiddenWatched(battlefield);
  }

  createChallengeGameBoard() {
    const challengeEnergies = Object.values(this.manager.challenge.energies);
    const challengeCardsInDeck = this.manager.challenge.deck.length;
    const challengeCardsInHand = this.manager.challenge.hand.length;
    const challengeCardsInTrash = this.manager.challenge.trash.length;
    const challengeVictories = this.manager.challenge.victories;
    const boardWindow = this.phase.createChallengeBoardWindow(challengeEnergies, challengeCardsInDeck, challengeCardsInHand);
    const boardWindowHeight = boardWindow.height;
    const battleWindow = this.phase.createChallengeBattleWindow(boardWindowHeight);
    const trashWindow = this.phase.createChallengeTrashWindow(challengeCardsInTrash);
    const scoreWindow = this.phase.createChallengeScoreWindow(challengeVictories, boardWindowHeight);
    const battlefield = this.phase.createChallengeBattlefield();
    this.addHiddenWatched(boardWindow);
    this.addHiddenWatched(battleWindow);
    this.addHiddenWatched(trashWindow);
    this.addHiddenWatched(scoreWindow);
    this.addHiddenWatched(battlefield);
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
      const cards = cardIndexs.map(index => this.manager.player.hand[index]);
      const powerfield = this.phase.createPowerfield(cards);
      this.addHiddenWatched(powerfield);
      this.phase.openPowerfield();
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
    const cardsInHand = this.manager.player.hand;
    const disableCards = cardsInHand.map((card, index) => {
      return {
        index,
        disable: card.type !== GameConst.POWER || card.isActiveInLoadPhase === false,
      };
    });
    const disableIndexes = disableCards.filter(card => card.disable).map(card => card.index);
    console.log(disableIndexes);
    this.phase.createPlayerHandset(cardsInHand, disableIndexes);
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