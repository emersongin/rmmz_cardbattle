class MoveCardsToPositionCardsetSpriteTest extends SceneTest {
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
      for (let i = 0; i < 1; i++) {
        const cards = Generator.generateCards(times);
        const screenWidth = Graphics.boxWidth;
        this.cardset.setCards(cards);
        this.cardset.startPositionCards(screenWidth, 0);
        this.cardset.startOpenCards();
        this.cardset.showCards();
        const cardWidth = 96;
        const xPosition = (this.cardset.width / 2) - (cardWidth / 2);
        this.cardset.moveCardsToPosition(xPosition, 0);
        await this.test('Deve mover todos os cartões do set na posição!', async () => {
          await this.timertoTrue(600);
          this.cardset.clear();
        }, () => {
          const validation = this.cardset.children.every((sprite, index) => {
            return sprite.x === xPosition && sprite.y === 0;
          });
          this.assert(validation).toBe(true);
        });
        times++;
      }
      res(true);
    });
  }
}