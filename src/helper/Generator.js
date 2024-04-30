class Generator {
  static generateCards(amount = 1) {
    const cards = [];
    for (let i = 0; i < amount; i++) {
      cards.push(Generator.generateCard());
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