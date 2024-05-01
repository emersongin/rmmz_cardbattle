class CardGenerator {
  static generateCards(amount = 1) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(CardGenerator.generateCard());
    }
    return cards;
  }

  static generateCard(type) {
    return {
      type: type ? type : (Math.floor(Math.random() * 3) + 1),
      color: Math.floor(Math.random() * 6) + 1,
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