class CardAnimationSprite extends Sprite_Animation {
  initMembers() {
    super.initMembers();
    this._quakeEffect = false;
    this._quakeDirection = '';
  }

  setup(targets, animation, mirror, delay) {
    super.setup(targets, animation, mirror, delay);
    this._quakeEffect = animation.quakeEffect;
    this._quakeDirection = '';
  }

  update() {
    super.update();
    console.log('this._started: ' + this._started + 'and' + this.isPlaying());
    if (this.isPlaying()) {
      this.updateQuakeEffect();
    } else {
      for (const target of this._targets) {
        if (this.isNotOriginPosition(target)) {
          this.returnOriginPosition(target);
        }
      }
      this.destroy();
    }
  }

  isNotOriginPosition(target) {
    return target._x !== target.x || target._y !== target.y;
  }

  returnOriginPosition(target, time = 3) {
    if (target._x !== target.x) {
      target.x = target._x > target.x ? target.x + time : target.x - time;
    }
    if (target._y !== target.y) {
      target.y = target._y > target.y ? target.y + time : target.y - time;
    }
  }

  updateQuakeEffect() {
    if (this.isPlaying() && this.isQuakeEffect()) {
      const directions = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT'];
      directions.filter(direction => this._quakeDirection !== direction);
      const direction = directions[Math.randomInt(3)];
      for (const target of this._targets) {
        if (this.isNotOriginPosition(target)) {
          this.returnOriginPosition(target);
        } else {
          this.startQuakeEffect(target, direction);
        }
      }
    }
  }

  startQuakeEffect(target, direction, time = 3) {
    switch (direction) {
      case 'TOP':
        target.y -= time;
        break;
      case 'BOTTOM':
        target.y += time;
        break;
      case 'LEFT':
        target.x -= time;
        break;
      case 'RIGHT':
        target.x += time;
        break;
    }
  }

  isQuakeEffect() {
    return this._quakeEffect;
  }
}

