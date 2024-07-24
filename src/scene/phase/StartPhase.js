// createConfirmWindow(message) {
//   // message = 'confirm the selection?'
//   const confirmHandler = () => {
//     this._onSelectHandler(this._selectedIndexs);
//   };
//   const returnHandler = () => {
//     this.returnToSelection();
//   };
//   const commandYes = CommandWindow.createCommand('Yes', 'YES', confirmHandler);
//   const commandNo = CommandWindow.createCommand('No', 'NO', returnHandler);
//   const text = [message];
//   this._confirmWindow = CommandWindow.create(0, 0, text, [commandYes, commandNo]);
//   this._confirmWindow.alignMiddle();
//   this._cardset.addChild(this._confirmWindow);
// }

// returnToSelection() {
//   if (this.selectIsFull()) {
//     this._selectedIndexs.pop();
//   }
//   this.updateSelectSprites();
//   this.updateHoverSprites();
//   this.closeConfirmWindow();
// }

// openConfirmWindow() {
//   this._confirmWindow.open();
// }

// closeConfirmWindow() {
//   this._confirmWindow.close();
// }

// isWindowBusy() {
//   return this._confirmWindow.isOpen();
// }
