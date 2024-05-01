class SelectedCardSpriteTest extends SceneTest {
  name = 'SelectedCardSpriteTest';

  create() {
    const card = CardGenerator.generateCard();
    this.subject = CardSprite.create(
      card.type,
      card.color,
      card.figureName,
      card.attack,
      card.health
    );
    const centerXPosition = (Graphics.boxWidth / 2 - this.subject.width / 2);
    const centerYPosition = (Graphics.boxHeight / 2 - this.subject.height / 2);
    this.subject.startOpen(centerXPosition, centerYPosition);
    this.addChild(this.subject);
  }

  start() {
    this.subject.show();
    this.test('O cartão deve estar em estado de select!', () => {
      this.subject.select();
    }, () => {
      this.assertTrue('Esta selecioando?', this.subject.isSelected());
    });
    this.test('O cartão deve estar em estado de select!', () => {
      this.subject.unselect();
    }, () => {
      this.assertTrue('Esta normal?', this.subject.isNormal());
    });
  }
}