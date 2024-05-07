class AnimateQuakeCardsCardsetSpriteTest extends SceneTest {
  name = 'AnimateQuakeCardsCardsetSpriteTest';

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
    const cards = CardGenerator.generateCards(6);
    this.test('Deve realizar chacoalhar os cartões!', () => {
      this.subject.setCards(cards);
      this.subject.startListCards();
      this.subject.showCards();
      // const sprite = this.subject.getCardIndex(0);
      // this.subject.animateCardQuake(sprite, 3);
      this.subject.animateCardsQuake(9);
    }, () => {
      this.assertWasTrue('Houve um chacoalhar?', this.subject.someSpriteIsMoving);
    });
  }
}