class SelectModeCardsetSpriteTest extends SceneTest {
  name = 'SelectModeCardsetSpriteTest';

  create() {
    const centerXPosition = (Graphics.boxWidth / 2 - CardsetSprite.contentOriginalWidth() / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - CardsetSprite.contentOriginalHeight() / 2);
    this.subject = CardsetSprite.create(centerXPosition, centerYPosition);
    this.subject.show();
    this.addWatched(this.subject);
  }

  start() {
    const numCards = 10;
    const cards = CardGenerator.generateCards(numCards);
    const sprites = this.subject.listCards(cards);
    this.subject.showCards(sprites);
    this.test('Deve entrar em modo seleção!', () => {
      this.subject.selectMode();
    }, () => {
      this.assertTrue('Esta em modo estático?', this.subject.isStaticMode());
    });

    // return new Promise(async resolve => {
    //   this.subject.show();
    //   const cards = CardGenerator.generateCards(10);
    //   this.test('Deve entrar em modo seleção!', () => {
    //     this.subject.setCards(cards);
    //     this.subject.startListCards();
    //     this.subject.showCards();
        
    //   }, () => {
    //     this.assertTrue('Esta em modo seleção?', this.subject.isSelectMode());
    //   });
    //   this.test('Deve entrar em modo estático!', () => {
    //     this.subject.unselectMode();
    //   }, () => {
    //     this.assertTrue('esta em modo estático?', this.subject.isStaticMode());
    //   });
    // });
  }
}