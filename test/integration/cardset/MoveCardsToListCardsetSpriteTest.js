class MoveCardsToListCardsetSpriteTest extends SceneTest {
  name = 'MoveCardsToListCardsetSpriteTest';

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
      const screenWidth = Graphics.boxWidth;
      const paddingLeft = 97;
      const positions = CardsetSprite.createPositions(6, paddingLeft);
      this.test('Deve mover todos os cartões do set na posição em lista!', () => {
        const sprites = this.subject.setCards(cards);
        this.subject.startPositionCards(screenWidth, 0);
        this.subject.startOpenCards();
        this.subject.showCards();
        this.subject.moveCardsToList();
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.subject.isSpritesPositions(positions));
      });
      times++;
    }
  }
}