class StartClosedAndOpenCardsCardsetSpriteTest extends SceneTest {
  name = 'StartClosedAndOpenCardsCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addWatched(this.subject);
  }

  start() {
    this.subject.show();
    let times = 1;
    for (let i = 0; i < 6; i++) {
      const cards = CardGenerator.generateCards(times);
      this.test('Deve abrir todos os cartões do set!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.startClosedCards();
        this.subject.showCards();
        this.subject.openCards();
      }, () => {
        this.assertTrue('Estão aberto?', this.subject.allCardsOpened());
      });
      this.test('Deve fechar todos os cartões do set!', () => {
        this.subject.startOpenCards();
        this.subject.closeCards();
      }, () => {
        this.assertTrue('Estão fechados?', this.subject.allCardsClosed());
      });
      times++;
    }
  }
}