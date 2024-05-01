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
    this.cardset.show();
    let times = 1;
    for (let i = 0; i < 6; i++) {
      const cards = Generator.generateCards(times);
      this.test('Deve abrir todos os cartões do set!', () => {
        this.cardset.setCards(cards);
        this.cardset.startListCards();
        this.cardset.startClosedCards();
        this.cardset.showCards();
        this.cardset.openCards();
      }, () => {
        this.assertTrue('Estão aberto?', this.cardset.allCardsOpened());
      });
      times++;
    }
  }
}