class MoveCardsToListCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'MoveCardsToListCardsetSpriteTest';

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
    for (let i = 0; i < 6; i++) {
      const cards = Generator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = cards.map((card, index) => {
        const { x, y } = this.cardset.getSpritePosition(index, cards.length);
        return { index, x, y };
      });
      this.test('Deve mover todos os cartões do set na posição em lista!', async () => {
        const sprites = this.cardset.setCards(cards);
        this.cardset.startPositionCards(screenWidth, 0);
        this.cardset.startOpenCards();
        this.cardset.showCards();
        this.cardset.moveCardsToList();
        await this.timertoTrue(600 * times);
        this.cardset.clear();
      }, () => {
        const validation = this.cardset.children.every((sprite, index) => {
          return sprite.x === positions[index].x && sprite.y === positions[index].y;
        });
        this.assert('Foram movidos em lista?', validation).toBe(true);
      });
      times++;
    }
    times = 40;
    for (let i = 0; i < 1; i++) {
      const cards = Generator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = cards.map((card, index) => {
        const { x, y } = this.cardset.getSpritePosition(index, cards.length);
        return { index, x, y };
      });
      const timeout = 8;
      this.test('Deve mover todos os cartões do set na posição em lista!', async () => {
        this.cardset.setCards(cards);
        this.cardset.startOpenCards();
        this.cardset.startListCards();
        this.cardset.startPositionCards(screenWidth, 0);
        this.cardset.showCards();
        this.cardset.moveCardsToListDelay(10);
        await this.timertoTrue(600 * cards.length);
        this.cardset.clear();
      }, () => {
        const validation = this.cardset.children.every((sprite, index) => {
          return sprite.x === positions[index].x && sprite.y === positions[index].y;
        });
        this.assert('Foram movidos em lista?', validation).toBe(true);
      }, timeout);
      times++;
    }
  }
}