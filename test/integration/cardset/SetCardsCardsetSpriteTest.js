class SetCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'SetCardsCardsetSpriteTest';

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
      for (let index = 0; index < 2; index++) {
        await this.test('Deve mostrar todos os cartões abertos do set na mesma posição!', async () => {
          const cards = Generator.generateCard(times);
          await this.testCards(cards);
        }, () => {
          this.assert('Estão aberto?', this.cardset.allCardsOpened()).toBe(true);
        });
        times++;
      }
      return res(this.finish());
    });
  }

  testCards(cards) {
    return new Promise(resolve => {
      this.cardset.setCards(cards);
      this.cardset.showCards();
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 300);
    });
  }
}