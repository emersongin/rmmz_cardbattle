class CloseAndOpenCardSpriteTest extends SceneTest {
  name = 'CloseAndOpenCardSpriteTest';

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
    this.test('Deve fechar!', () => {
      this.subject.close();
    }, () => {
      this.assertTrue('Esta fechado?', this.subject.isClosed());
    });
    this.test('Deve abrir o cartão!', () => {
      this.subject.open();
    }, () => {
      this.assertTrue('Esta aberto?', this.subject.isOpened());
    });
  }

  // exemplo de teste de unidade
  // this.update(() => {
  //   this.subject.update();
  // });
  // this.assert(this.subject._status).toBeInstanceof(CardSpriteStoppedState);
  // this.assert(this.subject.width).toBe(0);
}