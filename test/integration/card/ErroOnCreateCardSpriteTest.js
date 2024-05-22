class ErroOnCreateCardSpriteTest extends SceneTest {
  create() {
    CardSprite.create();
  }

  asserts() {
    this.describe('Deve retornar um erro ao tentar criar um card inválido!');
    this.expectToThrow('Houve um erro ao criar?', new Error('Card inválido!'));
  }
}