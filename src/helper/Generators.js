class CardGenerator {
  static generateGameCard(color) {
    const game = 2;
    switch (color) {
      case GameConst.WHITE:
        const white = 3;
        return CardGenerator.generateCard(game, white);
      case GameConst.BLACK:
        const black = 4;
        return CardGenerator.generateCard(game, black);
      default:
        return CardGenerator.generateCard(game);
    }
  }

  static generateCards(amount = 1, type) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(CardGenerator.generateCard(type));
    }
    return cards;
  }

  static generateCard(type, color, figure, attack, health) {
    return {
      type: CardGenerator.getTypes()[type >= 0 ? type : Math.floor(Math.random() * 3)],
      color: CardGenerator.getColors()[color >= 0 ? color : Math.floor(Math.random() * 6)],
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