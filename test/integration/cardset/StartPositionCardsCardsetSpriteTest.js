class StartPositionCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'StartPositionCardsCardsetSpriteTest';

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
    const x = 100;
    const y = 0;
    for (let index = 0; index < 2; index++) {
      this.test('Deve mostrar todos os cartões do set na posição definida!', async () => {
        const cards = Generator.generateCard(times);
        this.cardset.setCards(cards);
        this.cardset.startPositionCards(x, y);
        this.cardset.showCards();
        await this.timertoTrue(300);
        this.cardset.clear();
      }, () => {
        this.assert('Estão aberto?', this.cardset.allCardsOpened()).toBe(true);
        const allInPosition = this.cardset.children.every(sprite => sprite.x === x && sprite.y === y);
        this.assert('Estão na posição?', allInPosition).toBe(true);
      });
      times++;
    }
  }
}