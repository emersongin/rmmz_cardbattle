class HoveredCardSpriteTest extends SceneTest {
  name = 'HoveredCardSpriteTest';

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
    this.test('Deve estar em estado de hover!', () => {
      this.subject.hover();
    }, () => {
      this.assertTrue('esta hover?', this.subject.isHovered());
    });
    this.test('Deve retornar ao normal!', () => {
      this.subject.unhover();
    }, () => {
      this.assertTrue('Esta normal?', this.subject.isNormal());
    });
  } 
}