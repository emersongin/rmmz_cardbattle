class MoveCardsToListCardsetSpriteTest extends SceneTest {
  cardset;

  create() {
    this.cardset = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.cardset.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.cardset.height / 2);
    this.cardset.startPosition(centerXPosition, centerYPosition);
    this.cardset.setBackgroundColor('white');
    this.addChild(this.cardset);
  }

  start() {
    return new Promise(async res => {
      this.cardset.show();
      let times = 1;
      for (let i = 0; i < 6; i++) {
        const cards = Generator.generateCards(times);
        const screenWidth = Graphics.boxWidth;
        this.cardset.setCards(cards);
        this.cardset.startPositionCards(screenWidth, 0);
        this.cardset.startOpenCards();
        this.cardset.showCards();
        const positions = this.cardset.moveCardsToList();
        await this.test('Deve mover todos os cartões do set na posição em lista!', async () => {
          await this.timertoTrue(600);
          this.cardset.clear();
        }, () => {
          const validation = this.cardset.children.every((sprite, index) => {
            return sprite.x === positions[index].x && sprite.y === positions[index].y;
          });
          this.assert(validation).toBe(true);
        });
        times++;
      }
      times = 40;
      for (let i = 0; i < 1; i++) {
        const cards = Generator.generateCards(times);
        const screenWidth = Graphics.boxWidth;
        this.cardset.setCards(cards);
        this.cardset.startOpenCards();
        const positions = this.cardset.startListCards();
        this.cardset.startPositionCards(screenWidth, 0);
        this.cardset.showCards();
        this.cardset.moveCardsToListDelay(10);
        const timeout = 8;
        await this.test('Deve mover todos os cartões do set na posição em lista!', async () => {
          await this.timertoTrue(200 * cards.length);
          this.cardset.clear();
        }, () => {
          const validation = this.cardset.children.every((sprite, index) => {
            return sprite.x === positions[index].x && sprite.y === positions[index].y;
          });
          this.assert(validation).toBe(true);
        }, timeout);
        times++;
      }
      res(true);
    });
  }
}