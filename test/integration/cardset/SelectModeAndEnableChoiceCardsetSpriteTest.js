class SelectModeAndEnableChoiceCardsetSpriteTest extends SceneTest {
  name = 'SelectModeAndEnableChoiceCardsetSpriteTest';

  create() {
    this.subject = CardsetSprite.create();
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startPosition(centerXPosition, centerYPosition);
    this.subject.setBackgroundColor('white');
    this.addWatched(this.subject);
  }

  start() {
    return new Promise(async resolve => {
      this.subject.show();
      const cards = CardGenerator.generateCards(10);
      this.test('Deve entrar em modo seleção!', () => {
        this.subject.setCards(cards);
        this.subject.startListCards();
        this.subject.showCards();
        const sprites = this.subject.getCardIndexs([4, 5]);
        this.subject.disableCards();
        this.subject.enableCards(sprites);
        this.subject.selectMode();
        this.subject.enableChoice();
      }, () => {
        this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
        this.assertTrue('Esta em modo escolha?', this.subject.isEnableChoice());
      });
    });
  }
}