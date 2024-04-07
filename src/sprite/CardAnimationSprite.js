class CardAnimationSprite extends Sprite_Animation {
  initMembers() {
    super.initMembers();
  }

  setup(targets, animation, mirror, delay) {
    super.setup(targets, animation, mirror, delay);
  }

  update() {
    super.update();
    if (!this.isPlaying()) this.destroy();
  }
}

