class CardGenerator {
  static generateGameCard(color) {
    const game = 3;
    switch (color) {
      case GameConst.WHITE:
        const white = 3;
        return CardGenerator.generateCardData(game, white);
      case GameConst.BLACK:
        const black = 4;
        return CardGenerator.generateCardData(game, black);
      default:
        return CardGenerator.generateCardData(game);
    }
  }

  static generateCards(amount = 1, type) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(CardGenerator.generateCardData(type));
    }
    return cards;
  }

  static generateCard(type, color, figure, attack, health) {
    return {
      type: CardGenerator.getTypes()[type ? type : (Math.floor(Math.random() * 2) + 1)],
      color: CardGenerator.getColors()[color ? color : Math.floor(Math.random() * 4) + 1],
      figureName: figure || 'default',
      attack: attack || Math.floor(Math.random() * 99) + 1,
      health: health || Math.floor(Math.random() * 99) + 1
    };
  }

  static getTypes() {
    return [GameConst.BATTLE, GameConst.POWER, GameConst.GAME];
  }

  static getColors() {
    return [GameConst.RED, GameConst.GREEN, GameConst.BLUE, GameConst.WHITE, GameConst.BLACK, GameConst.BROWN];
  }
}

class HashGenerator {
  static uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}