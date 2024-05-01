class StartClosedAndOpenCardsDelayCardsetSpriteTest extends SceneTest {
  cardset;
  name = 'StartClosedAndOpenCardsDelayCardsetSpriteTest';

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
      const cards = CardGenerator.generateCards(times);
      this.test('Deve abrir todos os cartões do set com delay!', () => {
        this.cardset.setCards(cards);
        this.cardset.startListCards();
        this.cardset.startClosedCards();
        this.cardset.showCards();
        this.cardset.openCardsWithDelay();
      }, () => {
        this.assertTrue('Estão aberto?', this.cardset.allCardsOpened());
      });
      times++;
    }
  }
}