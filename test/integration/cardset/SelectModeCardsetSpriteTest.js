class SelectModeCardsetSpriteTest extends SceneTest {
  name = 'SelectModeCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addChild(this.subject);
  }

  start() {
    return new Promise(async resolve => {
      this.subject.show();
      const cards = CardGenerator.generateCards(10);
      this.test('Deve entrar em modo seleção!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.showCards();
        this.subject.selectMode();
      }, () => {
        this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
      });
      this.test('Deve entrar em modo estático!', () => {
        this.subject.unselectMode();
      }, () => {
        this.assertTrue('esta em modo estático?', this.subject.isStaticMode());
      });
    });
  }
}