class CardBattleManager {
  static folders = [
    {
      name: 'Folder 1',
      energies: [10, 10, 5, 5, 5, 5],
      set: [
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.WHITE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BROWN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.RED, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.GREEN, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.BATTLE, color: GameConst.BLUE, figureName: 'default', attack: 10, health: 10 },
        { type: GameConst.POWER, color: GameConst.BLACK, figureName: 'default', attack: 10, health: 10 },
      ]
    }, {
      name: 'Folder 2',
      energies: [10, 10, 10, 10, 10, 10],
      set: []
    }, {
      name: 'Folder 3',
      energies: [10, 10, 10, 0, 0, 0],
      set: []
  }];

  static folderIndex = -1;

  static miniGameWin = false;

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

  static getChallengeDescription () {
    return 'descrição de desafiado, variando de acordo com o desafio.';
  }

  static setPlayerFolderIndex(index) {
    return CardBattleManager.folderIndex = index;
  }

  static getPlayerFolders() {
    return CardBattleManager.folders;
  }

  static getWin() {
    return CardBattleManager.miniGameWin;
  }

  static getPowerfieldLength() {
    return CardBattleManager.powerfield.length;
  }

  static getPlayerDeck() {
    return CardBattleManager.player.deck;
  }

  static getPlayerHand() {
    return CardBattleManager.player.hand;
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

  static getChallengedDeck() {
    return CardBattleManager.challenged.deck;
  }

  static getChallengedHand() {
    return CardBattleManager.challenged.hand;
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
}