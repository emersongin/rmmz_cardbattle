class FolderWindow extends CommandWindow {
  static create(x, y, text, commands) {
    if (!Array.isArray(text)) {
      throw new Error('text must be an array!');
    }
    const width = Graphics.boxWidth;
    const windowPadding = CommandWindow.windowPadding() * 2;
    const textHeight = CommandWindow.textHeight() * Math.max(text.length, 0);
    const itemsPadding = CommandWindow.itemPadding() * Math.max(commands.length - 1, 0);
    const itemsHeight = CommandWindow.itemHeight() * Math.max(commands.length, 0);
    const height = windowPadding + textHeight + itemsPadding + itemsHeight;
    const rect = new Rectangle(x, y, width, height);
    return new FolderWindow(rect, text, commands);
  }

  static createCommand(name, symbol, handler, energies) {
    if (!name || !symbol) {
      throw new Error('Command name and symbol are required!');
    }
    if (typeof handler !== 'function') {
      throw new Error('Command handler must be a function!');
    }
    if (energies && typeof energies !== 'object') {
      throw new Error('Command energies must be an object!');
    }
    const enabled = FolderWindow.abilityEnergies(energies);
    return { name, symbol, handler, energies, enabled, ext: null };
  }

  static createEnergies(red = 0, green = 0, blue = 0, white = 0, black = 0, brown = 0) {
    return { red, green, blue, white, black, brown };
  }

  static abilityEnergies(energies) {
    return Object.values(energies).reduce((acc, energy) => acc + energy, 0) >= 40;
  }

  drawItem(index) {
    const command = this.getCommand(index);
    const { name, energies } = command;
    const rect = this.itemLineRect(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawFolderName(name, rect);
    this.drawPoints(energies, rect);
    this.drawIcons(rect);
  }

  getCommand(index) {
    return this._commands[index];
  }

  drawFolderName(name, rect) {
    const align = this.itemTextAlign();
    this.drawText(name, rect.x, rect.y, rect.width, align);
  }

  drawPoints(energies, rect) {
    const { red, green, blue, white, black, brown } = energies;
    const  { y, width } = rect;
    const points = [red, green, blue, white, black, brown];
    points.forEach((points, index) => {
      const align = (width - (width / 1.7));
      const spaceBetween = 72;
      const paddingLeft = 36;
      const x = align + (spaceBetween * index) + paddingLeft;
      const textWidth = 100;
      points = StringHelper.convertPointsDisplayPad(points);
      this.drawText(points, x, y, textWidth);
    });
  }

  drawIcons(rect) {
    const  { y, width } = rect;
    const redBox = IconSetConst.REDBOX;
    const greenBox = IconSetConst.GREENBOX;
    const blueBox = IconSetConst.BLUEBOX;
    const whiteBox = IconSetConst.WHITEBOX;
    const blackBox = IconSetConst.BLACKBOX;
    const brownBox = IconSetConst.BROWNBOX;
    const icons = [redBox, greenBox, blueBox, whiteBox, blackBox, brownBox];
    icons.forEach((iconIndex, index) => {
      const align = (width - (width / 1.7));
      const spaceBetween = 72;
      const x = align + (spaceBetween * index);
      this.drawIcon(iconIndex, x, y);
    });
  }
}