class CardBattleManager {
  static folders = [
    {
      name: 'Folder 1',
      energies: [10, 10, 5, 5, 5, 5],
      set: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: false },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10, isActiveInLoadPhase: true },
      ]
    }, {
      name: 'Folder 2',
      energies: [0, 0, 0, 0, 0, 0],
      set: []
    }, {
      name: 'Folder 3',
      energies: [0, 0, 0, 0, 0, 0],
      set: []
  }];

  static folderIndex = -1;

  static playerStartTurn = false;

  static player = {
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
  };

  static challenged = {
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
  };

  static powerfield = [];

  static getChallengeDescription() {
    return [
      ['Descrição de Desafiado'],
      ['O jogador que é desafiado por você.'],
    ];
  }

  static setPlayerFolderIndex(index) {
    return CardBattleManager.folderIndex = index;
  }

  static getPlayerFolders() {
    return CardBattleManager.folders;
  }

  static getPowerfieldLength() {
    return CardBattleManager.powerfield.length;
  }

  static getPlayerDeck(config) {
    const cards = CardBattleManager.player.deck;
    return CardBattleManager.configureCards(cards, config);
  }

  static configureCards(cards, config) {
    return cards.map(card => {
      card.disabled = false;
      const type = card.type;
      const load = card.isActiveInLoadPhase;
      const conditions = [
        type === GameConst.BATTLE && config?.blockBattleCards,
        type === GameConst.POWER && config?.blockPowerCardsInLoadPhase && !load,
      ];
      if (conditions.some(disable => disable)) {
        card.disabled = true;
      }
      return card;
    });
  }

  static getPlayerHand(config) {
    const cards = CardBattleManager.player.hand;
    return CardBattleManager.configureCards(cards, config);
  }


  static getPlayerEnergies() {
    return CardBattleManager.player.energies;
  }

  static getPlayerDeckLength() {
    return CardBattleManager.player.deck.length;
  }

  static getPlayerHandLength() {
    return CardBattleManager.player.hand.length;
  }

  static getPlayerTrashLength() {
    return CardBattleManager.player.trash.length;
  }

  static getPlayerVictories() {
    return CardBattleManager.player.victories;
  }

  static getChallengedDeck(config) {
    const cards = CardBattleManager.challenged.deck;
    return CardBattleManager.configureCards(cards, config);
  }

  static getChallengedHand(config) {
    const cards = CardBattleManager.challenged.hand;
    return CardBattleManager.configureCards(cards, config);
  }

  static getChallengedEnergies() {
    return CardBattleManager.challenged.energies;
  }

  static getChallengedDeckLength() {
    return CardBattleManager.challenged.deck.length;
  }

  static getChallengedHandLength() {
    return CardBattleManager.challenged.hand.length;
  }

  static getChallengedTrashLength() {
    return CardBattleManager.challenged.trash.length;
  }

  static getChallengedVictories() {
    return CardBattleManager.challenged.victories;
  }

  static setPlayerHand(hand) {
    CardBattleManager.player.hand = hand;
  }

  static setPlayerEnergies(energies) {
    CardBattleManager.player.energies = energies;
  }

  static setChallengedHand(hand) {
    CardBattleManager.challenged.hand = hand;
  }

  static setChallengedEnergies(energies) {
    CardBattleManager.challenged.energies = energies;
  }

  static playerStart() {
    CardBattleManager.playerStartTurn = true;
  }

  static playerPassed() {
    CardBattleManager.player.passed = true;
  }

  static challengedPassed() {
    CardBattleManager.challenged.passed = true;
  }

  static isPlayerStartTurn() {
    return CardBattleManager.playerStartTurn;
  }

  static isPlayerPassed() {
    return CardBattleManager.player.passed;
  }

  static isChallengedPassed() {
    return CardBattleManager.challenged.passed;
  }

  static reset() {
    CardBattleManager.folderIndex = -1;
    CardBattleManager.miniGameWin = false;
    CardBattleManager.playerStartTurn = false;
    CardBattleManager.player = {
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
    };
    CardBattleManager.challenged = {
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
    };
    CardBattleManager.powerfield = [];
  }

  static setPlayerDeck(folderIndex = 0) {
    CardBattleManager.player.deck = CardBattleManager.folders[folderIndex].set.clone();
  }

  static setChallengedDeck(folderIndex = 0) {
    CardBattleManager.challenged.deck = CardBattleManager.folders[folderIndex].set.clone();
  }

  static addPowerCardToPowerfield(card) {
    CardBattleManager.powerfield.push(card);
  }

  static isChallengedHasPowerCardInHand() {
    return CardBattleManager.challenged.hand.some(card => card.type === GameConst.POWER);
  }

  static isPlayerHasPowerCardInHand() {
    return CardBattleManager.player.hand.some(card => card.type === GameConst.POWER);
  }

  static drawPlayerCards(cardsNumber) {
    const cards = CardBattleManager.player.deck.splice(0, cardsNumber);
    CardBattleManager.player.hand.push(...cards);
    return cards;
  }

  static drawChallengedCards(cardsNumber) {
    const cards = CardBattleManager.challenged.deck.splice(0, cardsNumber);
    CardBattleManager.challenged.hand.push(...cards);
    return cards;
  }

  static getCardPlayerHandByIndex(index) {
    return CardBattleManager.player.hand[index];
  }
}