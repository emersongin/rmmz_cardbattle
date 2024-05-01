class AddCardAndMoveToListDelayCardsetSpriteTest extends SceneTest {
  name = 'AddCardAndMoveToListDelayCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    let times = 1;
    for (let i = 0; i < 3; i++) {
      const cards = CardGenerator.generateCards(3);
      const newCards = CardGenerator.generateCards(times);
      const screenWidth = Graphics.boxWidth;
      const positions = CardsetSprite.createPositions(6, 97);
      positions.shift();
      positions.shift();
      positions.shift();
      this.test('Deve adicionar e mover novos para set na posição em lista com delay!', () => {
        const sprites = this.subject.setCards(cards);
        this.subject.startListCards(sprites);
        this.subject.showCards(sprites);
        const newSprites = this.subject.addCards(newCards);
        this.subject.startPositionCards(screenWidth, 0, newSprites);
        this.subject.showCards(newSprites);
        const delay = 10;
        this.subject.moveCardsToListDelay(delay, newSprites);
      }, () => {
        this.assertTrue('Foram movidos em lista?', this.subject.isSpritesPositions(positions));
      });
      times++;
    }
  }
}