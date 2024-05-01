class StartListCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'StartListCardsCardsetSpriteTest';

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
    let times = 40;
    for (let i = 0; i < 1; i++) {
      const cards = Generator.generateCards(times);
      this.cardset.setCards(cards);
      const positions = this.cardset.startListCards();
      this.test('Deve mostrar todos os cartões em lista!', async () => {
        this.cardset.showCards();
        await this.timertoTrue(600);
      }, () => {
        const validation = this.cardset.children.every((sprite, index) => {
          return sprite.x === positions[index].x && sprite.y === positions[index].y;
        });
        this.assert('Estão em lista?', validation).toBe(true);
      });
      times++;
    }
  }
}