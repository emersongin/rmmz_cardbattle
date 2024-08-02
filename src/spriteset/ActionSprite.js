// class ActionSprite extends Sprite {
//   _status = null;
//   _wait = 0;
//   _commandQueue = [];
//   _effects = {
//     opacity: 255,
//     intensity: {
//       value: 255,
//       positive: false
//     },
//   };

//   initialize(x, y) { 
//     super.initialize();
//     this.commandSetPosition(x, y);
//   }

//   isCurrentStatus(status) {
//     return this.getStatus() === status;
//   }

//   getStatus() {
//     return this._status;
//   }

//   changeStatus(status, ...params) {
//     this.addCommand(this.commandSetStatus, status, ...params);
//   }

//   commandSetStatus(status, ...params) {
//     this._status = new status(this, ...params);
//   }

//   addWait(seconds = 0.6) {
//     this.addCommand(this.commandWait, seconds);
//   }

//   commandWait(seconds) {
//     this._wait = seconds * GameConst.FPS;
//   }

//   show() {
//     this.addCommand(this.commandShow);
//   }

//   commandShow() {
//     this.visible = true;
//   }

//   hide() {
//     this.addCommand(this.commandHide);
//   }

//   commandHide() {
//     this.visible = false;
//   }

//   alignAboveOf(obj) {
//     const { y } = obj;
//     const receptorX = undefined;
//     const receptorY = ScreenHelper.getPositionAboveOf(y, this.height);
//     this.addCommand(this.commandSetPosition, receptorX, receptorY);
//   }

//   commandSetPosition(x = this.x, y = this.y) {
//     this.x = x;
//     this.y = y;
//   }

//   alignBelowOf(obj) {
//     const { y, height } = obj;
//     const receptorX = undefined;
//     const receptorY = ScreenHelper.getPositionBelowOf(y, height);
//     this.addCommand(this.commandSetPosition, receptorX, receptorY);
//   }

//   alignCentered() {
//     const x = ScreenHelper.getCenterPosition(this.width);
//     const y = ScreenHelper.getMiddlePosition(this.height);
//     this.addCommand(this.commandSetPosition, x, y);
//   }

//   addCommand(fn, ...params) {
//     const command = this.createCommand({ fn, triggerAction: null }, ...params);
//     command = ArrayHelper.toArray(command);
//     this._commandQueue.push(command);
//   }

//   addCommandTrigger(fn, triggerAction, ...params) {
//     const command = this.createCommand({ fn, triggerAction }, ...params);
//     command = ArrayHelper.toArray(command);
//     this._commandQueue.push(command);
//   }

//   createCommand(props, ...params) {
//     const { fn, triggerAction } = props;
//     const command = { 
//       fn: fn.name || 'anonymous',
//       execute: () => {
//         const result = fn.call(this, ...params);
//         if (typeof triggerAction === 'function') triggerAction();
//         return typeof result === 'boolean' ? result : true;
//       }
//     };
//     return command;
//   }

//   addCommands(commands) {
//     // [[fn, ...params], fn, fn]
//     commands = ArrayHelper.toArray(commands);
//     commands = commands.map((fn, ...params) => {
//       if (Array.isArray(fn)) return this.createCommand(fn[0], ...fn.slice(1));
//       return this.createCommand(fn)
//     });
//     this._commandQueue.push(commands);
//   }

//   update() {
//     super.update();
//     if (this.isWaiting()) return this._wait--;
//     if (this.hasCommands() && this.isAvailable()) this.executeCommand();
//     if (this.isVisible()) {
//       this.updateStatus();
//       this.updateEffects();
//     }
//   }

//   isWaiting() {
//     return this._wait > 0;
//   }

//   hasCommands() {
//     return this._commandQueue.length > 0;
//   }

//   isAvailable() {
//     return this.isBusy() === false;
//   }

//   isBusy() {
//     return super.isBusy() || this.isWaiting() || this.someChildrenIsBusy();
//   }

//   someChildrenIsBusy() {
//     return this.children.some(sprite => {
//       return (sprite instanceof ActionSprite) && (sprite.hasCommands() || sprite.isBusy());
//     });
//   }

//   executeCommand() {
//     const commands = this._commandQueue[0];
//     if (commands.length > 0) {
//       const completed = this.processCommands(commands);
//       if (completed) {
//         this._commandQueue.shift();
//       }
//     }
//   }

//   processCommands(commands) {
//     let processed = false;
//     for (const command of commands) {
//       const completed = command.execute();
//       if (completed) {
//         processed = true;
//         continue;
//       }
//       break;
//     }
//     return processed;
//   }

//   isVisible() {
//     return this.visible;
//   }

//   isHidden() {
//     return this.isVisible() === false;
//   }

//   updateStatus() {
//     if (this._status) this._status?.updateStatus();
//   }

//   updateEffects() {
//     this.updateIntensityEffect();
//     this.updateOpacityEffect();
//   }

//   updateIntensityEffect() {
//     if (this._effects.intensity.value <= 255 && !this._effects.intensity.positive) {
//       this._effects.intensity.value += 6;
//       if (this._effects.intensity.value >= 255) {
//         this._effects.intensity.positive = true;
//       }
//     }
//     if (this._effects.intensity.value >= 100 && this._effects.intensity.positive) {
//       this._effects.intensity.value -= 6;
//       if (this._effects.intensity.value <= 100) {
//         this._effects.intensity.positive = false;
//       }
//     }
//   }

//   updateOpacityEffect() {
//     this._effects.opacity -= 32;
//     if (this._effects.opacity <= 0) {
//       this._effects.opacity = 255;
//     }
//   }

//   addChildren(children) {
//     children.forEach(child => this.addChild(child));
//   }

//   indexOfChild(sprite) {
//     for (let i = 0; i < this.numberOfChildren(); i++) {
//       if (ObjectHelper.compareObjects(this.children[i], sprite)) {
//         return i;
//       }
//     }
//     return -1;
//   }

//   clear() {
//     while (this.hasChildren()) {
//       this.removeChildren(this.children);
//     }
//   }

//   hasChildren() {
//     return this.numberOfChildren() > 0;
//   }

//   numberOfChildren() {
//     return this.children.length;
//   }

//   removeChildren(children) {
//     children.forEach(child => this.removeChild(child));
//   }
// }