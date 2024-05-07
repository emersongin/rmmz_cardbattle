class SetCardsCardsetSpriteTest extends SceneTest {
  name = 'SetCardsCardsetSpriteTest';

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
    for (let index = 0; index < 2; index++) {
      const cards = CardGenerator.generateCard(times);
      this.test('Deve mostrar todos os cartões abertos do set na mesma posição!', () => {
        this.subject.setCards(cards);
        this.subject.showCards();
      }, () => {
        this.assertTrue('Estão aberto?', this.subject.allCardsOpened());
      }, 0.3);
      times++;
    }
  }
}