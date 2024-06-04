class CardGenerator {
  static generateCards(amount = 1, type) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(CardGenerator.generateCard(type));
    }
    return cards;
  }

  static generateGameCard(color) {
    switch (color) {
      case 'white':
        return CardGenerator.generateCard(3, 4);
      case 'black':
        return CardGenerator.generateCard(3, 5);
      default:
        return CardGenerator.generateCard(3);
    }
  }

  static generateCard(type, color) {
    return {
      type: type ? type : (Math.floor(Math.random() * 3) + 1),
      color: color ? color : Math.floor(Math.random() * 6) + 1,
      figureName: 'default',
      attack: Math.floor(Math.random() * 99) + 1,
      health: Math.floor(Math.random() * 99) + 1
    };
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