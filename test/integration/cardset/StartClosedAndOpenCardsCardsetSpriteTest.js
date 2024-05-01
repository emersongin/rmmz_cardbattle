class StartClosedAndOpenCardsCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'StartClosedAndOpenCardsCardsetSpriteTest';

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
        await this.test('Deve abrir todos os cartões do set!', async () => {
          await this.testCards(cards);
        }, () => {
          this.assert('Estão aberto?', this.cardset.allCardsOpened()).toBe(true);
        });
        times++;
      }
      times = 40;
      for (let i = 0; i < 1; i++) {
        const cards = Generator.generateCards(times);
        await this.test('Deve abrir todos os cartões do set!', async () => {
          await this.testDelayCards(cards);
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
      this.cardset.startListCards();
      this.cardset.startClosedCards();
      this.cardset.showCards();
      this.cardset.openCards();
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 300);
    });
  }

  testDelayCards(cards) {
    return new Promise(resolve => {
      this.cardset.setCards(cards);
      this.cardset.startListCards();
      this.cardset.startClosedCards();
      this.cardset.showCards();
      this.cardset.openCardsWithDelay();
      setTimeout(() => {
        this.cardset.clear();
        resolve(true);
      }, 30 * cards.length);
    });
  }
}