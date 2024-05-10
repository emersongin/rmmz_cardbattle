// include ../CardAnimationSprite.js

class CardSpriteAnimatedBehavior {
  _card;
  _parent;
  _animation;
  _animationSprite;
  _times;
  
  constructor(sprite, animation, times, anchorParent) {
    this._card = sprite;
    this._parent = anchorParent || sprite.parent;
    this._animation = animation;
    this._times = times;
  }

  updateBehavior() {
    const that = this._card;
    if (this.hasTimes() || this.isPlayingAnimation()) {
      if (this.noHasAnimationSprite()) {
        this.startAnimation();
        this._times--;
      }
    } else {
      that.removeBehavior(this);
    }
  }

  startAnimation() {
    const that = this._card;
    this._animationSprite = new Sprite_Animation();
    const targets = [that];
    const mirror = true;
    const delay = 8;
    const previus = this._parent.getLastAnimationSprite() || null;
    this._animationSprite.setup(targets, this._animation, mirror, delay, previus);
    this._parent.addChild(this._animationSprite);
    this._parent.addAnimationSprite(this._animationSprite);
  }

  isNoPlayingAnimation() {
    return !this.isPlayingAnimation();
  }

  isPlayingAnimation() {
    return this.hasAnimationSprite() && this._animationSprite.isPlaying();
  }

  hasAnimationSprite() {
    return this._animationSprite;
  }

  noHasAnimationSprite() {
    return !this.hasAnimationSprite();
  }

  hasTimes() {
    return this._times > 0;
  }
}