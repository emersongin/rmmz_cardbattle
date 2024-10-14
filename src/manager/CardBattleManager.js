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

  static playerfield = [];
  static challengedfield = [];
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

  static getPlayerEnergies() {
    return CardBattleManager.player.energies;
  }

  static getPlayerDeckLength() {
    return CardBattleManager.player.deck.length;
  }

  static getPlayerHandCards() {
    return CardBattleManager.player.hand;
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

  static getCards(config, indexes) {
    const { player, location } = config;
    if (location === GameConst.POWERFIELD) {
      return CardBattleManager.getCardsByPowerfield(config, indexes);
    }
    if (player === GameConst.CHALLENGED) {
      return CardBattleManager.getChallengedCardsByLocation(location, config, indexes);
    }
    return CardBattleManager.getPlayerCardsByLocation(location, config, indexes);
  }

  static getCardsByPowerfield(config, indexes) {
    const cards = CardBattleManager.powerfield;
    return CardBattleManager.getCardsByIndexes(cards, config, indexes);
  }

  static getChallengedCardsByLocation(location, config, indexes) {
    let cards = [];
    switch (location) {
      case GameConst.HAND:
        cards = CardBattleManager.challenged.hand;
        break;
      case GameConst.DECK:
        cards = CardBattleManager.challenged.deck;
        break;
      case GameConst.TRASH:
        cards = CardBattleManager.challenged.trash;
        break;
      default:
        cards = [];
        break;
    }
    return CardBattleManager.getCardsByIndexes(cards, config, indexes);
  }

  static getPlayerCardsByLocation(location, config, indexes) {
    let cards = [];
    switch (location) {
      case GameConst.HAND:
        cards = CardBattleManager.player.hand;
        break;
      case GameConst.DECK:
        cards = CardBattleManager.player.deck;
        break;
      case GameConst.TRASH:
        cards = CardBattleManager.player.trash;
        break;
      default:
        cards = [];
        break;
    }
    return CardBattleManager.getCardsByIndexes(cards, config, indexes);
  }

  static getCardsByIndexes(cards, config, indexes) {
    const conditions = [
      (typeof indexes !== 'number' && !Array.isArray(indexes)),
      (typeof indexes === 'number' && (indexes < 0 || indexes >= cards.length)),
      (Array.isArray(indexes) && indexes.length === 0),
    ];
    if (conditions.some(x => x === true)) {
      return CardBattleManager.configureCards(cards, config);
    }
    if (Array.isArray(indexes) && indexes.length > 0) {
      cards = indexes.map(i => cards.filter((card, index) => index === i));
      return cards.map(cards => CardBattleManager.configureCards(cards, config));
    }
    cards = cards.filter((card, index) => index === indexes);
    return CardBattleManager.configureCards(cards, config);
  }

  static getChallengedEnergies() {
    return CardBattleManager.challenged.energies;
  }

  static getChallengedDeckLength() {
    return CardBattleManager.challenged.deck.length;
  }

  static getChallengedHandCards() {
    return CardBattleManager.challenged.hand;
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
    CardBattleManager.playerfield = [];
    CardBattleManager.challengedfield = [];
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

  static putPlayerCards(cardsNumber) {
    const cards = CardBattleManager.player.hand.splice(0, cardsNumber);
    CardBattleManager.playerfield.push(...cards);
    return cards;
  }

  static drawChallengedCards(cardsNumber) {
    const cards = CardBattleManager.challenged.deck.splice(0, cardsNumber);
    CardBattleManager.challenged.hand.push(...cards);
    return cards;
  }

  static putChallengedCards(cardsNumber) {
    const cards = CardBattleManager.challenged.hand.splice(0, cardsNumber);
    CardBattleManager.challengedfield.push(...cards);
    return cards;
  }

  static getCardPlayerHandByIndex(index) {
    return CardBattleManager.player.hand[index];
  }

  static getPowerEffect(cardNumber) {
    return {
      type: GameConst.INCRESASE_ENERGY,
    };
  }

  static moveCardToPowerField(cardIndex, player, powerStrategy) {
    const p = player === GameConst.PLAYER ? CardBattleManager.player : CardBattleManager.challenged;
    const card = p.hand.splice(cardIndex, 1);
    const powerCard = {
      player,
      card: card[0],
      powerStrategy,
    };
    CardBattleManager.powerfield.push(powerCard);
    return card;
  }

  static getPlayerfieldCards() {
    return CardBattleManager.playerfield;
  }

  static hasCardsInPlayerfield() {
    return CardBattleManager.getPlayerfieldLength() > 0;
  }

  static getPlayerfieldLength() {
    return CardBattleManager.playerfield.length;
  }

  static getChallengedfieldCards() {
    return CardBattleManager.challengedfield;
  }

  static hasCardsInChallengedfield() {
    return CardBattleManager.getChallengedfieldLength() > 0;
  }

  static getChallengedfieldLength() {
    return CardBattleManager.challengedfield.length;
  }

  static isChallengedWaiting() {
    return CardBattleManager.isChallengedPassed() === false;
  }

  static isPlayerWaiting() {
    return CardBattleManager.isPlayerPassed() === false;
  }
}