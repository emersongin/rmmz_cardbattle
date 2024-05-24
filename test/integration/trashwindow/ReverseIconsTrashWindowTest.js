class ReverseIconsTrashWindowTest extends SceneTest {
  create() {
    this.subject = TrashWindow.create(0, 0);
    this.addWatched(this.subject);
    this.subject.alignCenterMiddle();
    this.subject.reverseIcons();
    this.subject.open();
  }

  asserts() {
    this.describe('Deve abrir com os icones ordenados.');
    this.expectTrue('Esta em ordem normal?', this.subject.isIconsReverse());
  }
}