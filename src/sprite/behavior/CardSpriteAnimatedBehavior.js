// include ../CardAnimationSprite.js

class CardSpriteAnimatedBehavior {
  _card;
  _animation;
  _animationSprite;
  _times;
  
  constructor(sprite, animation, times) {
    this._card = sprite;
    this._animation = animation;
    this._times = times;
  }

  updateBehavior() {
    const that = this._card;
    if (this.hasTimes() || this.isPlayingAnimation()) {
      if (this.noHasAnimationSprite()) {
        this._animationSprite = new CardAnimationSprite();
        this._animationSprite.setup([that], this._animation);
        that.parent.addChild(this._animationSprite);
        this._times--;
      } else {
        if (this.isNoPlayingAnimation()) this._animationSprite = null;
      }
    } else {
      that.removeBehavior(this);
    }
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