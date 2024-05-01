class AddCardAndMoveToListCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'AddCardAndMoveToListCardsetSpriteTest';

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
    this.addChild(this.cardset);
  }

  start() {
    this.cardset.show();
    let times = 1;
    for (let i = 0; i < 3; i++) {
      const cards = Generator.generateCards(3);
      const newCards = Generator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = newCards.map((card, index) => {
        index = cards.length + index;
        const { x, y } = this.cardset.getSpritePosition(index, cards.length);
        return { index, x, y };
      });
      this.test('Deve mover todos os cartões do set na posição em lista!', async () => {
        const sprites = this.cardset.setCards(cards);
        this.cardset.startListCards(sprites);
        this.cardset.showCards(sprites);
        const newSprites = this.cardset.addCards(newCards);
        this.cardset.startPositionCards(screenWidth, 0, newSprites);
        this.cardset.showCards(newSprites);
        // const delay = 10;
        this.cardset.moveCardsToList(newSprites);
        await this.timertoTrue(1000 * times);
        this.cardset.clear();
      }, () => {
        const validation = positions.every(({ index, x, y }) => {
          const sprite = this.cardset.children[index];
          return sprite.x === x && sprite.y === y;
        });
        this.assert('Foram movidos em lista?', validation).toBe(true);
      });
      times++;
    }
    times = 1;
    for (let i = 0; i < 3; i++) {
      const cards = Generator.generateCards(3);
      const newCards = Generator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = newCards.map((card, index) => {
        index = cards.length + index;
        const { x, y } = this.cardset.getSpritePosition(index, cards.length);
        return { index, x, y };
      });
      this.test('Deve mover todos os cartões do set na posição em lista!', async () => {
        const sprites = this.cardset.setCards(cards);
        this.cardset.startListCards(sprites);
        this.cardset.showCards(sprites);
        const newSprites = this.cardset.addCards(newCards);
        this.cardset.startPositionCards(screenWidth, 0, newSprites);
        this.cardset.showCards(newSprites);
        const delay = 10;
        this.cardset.moveCardsToListDelay(delay, newSprites);
        await this.timertoTrue(1000 * times);
        this.cardset.clear();
      }, () => {
        const validation = positions.every(({ index, x, y }) => {
          const sprite = this.cardset.children[index];
          return sprite.x === x && sprite.y === y;
        });
        this.assert('Foram movidos em lista?', validation).toBe(true);
      });
      times++;
    }
  }

  testDelayCards(sprites) {
    return new Promise(resolve => {
      const screenWidth = Graphics.boxWidth;
      this.cardset.startPositionCards(screenWidth, 0, sprites);
      this.cardset.showCards(sprites);
      const delay = 10;
      this.cardset.moveCardsToListDelay(delay, sprites);
      setTimeout(async () => {
        this.cardset.clear();
        resolve(true);
      }, 500 * sprites.length);
    });
  }
}