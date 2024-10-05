class ScreenHelper {
  static getOneFourthWidth() {
    return Graphics.boxWidth / 4;
  }

  static getHalfWidth() {
    return Graphics.boxWidth / 2;
  }

  static getFullWidth() {
    return Graphics.boxWidth;
  }

  static getFieldWidth() {
    return ScreenHelper.getFullWidth() - (ScreenHelper.getOneFourthWidth() / 2);
  }

  static getFullHeight() {
    return Graphics.boxHeight;
  }
  
  static getTopPosition() {
    return 0;
  }

  static getAboveMiddlePosition(objHeight) {
    return (Graphics.boxHeight / 2) - objHeight;
  }

  static getMiddlePosition(objHeight) {
    return Graphics.boxHeight / 2 - objHeight / 2;
  }

  static getBelowMiddlePosition(objHeight) {
    return Graphics.boxHeight / 2;
  }

  static getBottomPosition(objHeight) {
    return Graphics.boxHeight - objHeight;
  }

  static getStartPosition() {
    return 0;
  }

  static getStartCenterPosition(objWidth) {
    return Graphics.boxWidth / 2 - objWidth;
  }

  static getCenterPosition(objWidth) {
    return Graphics.boxWidth / 2 - objWidth / 2;
  }

  static getEndCenterPosition(objWidth) {
    return Graphics.boxWidth / 2;
  }

  static getEndPosition(objWidth) {
    return Graphics.boxWidth - objWidth;
  }

  static getPositionInFrontOf(xAgent, widthReceptor) {
    return xAgent - widthReceptor;
  }

  static getPositionInBackOf(xAgent, widthAgent) {
    return xAgent + widthAgent;
  }

  static getPositionInCenterOf(baseWidth, subjectWidth) {
    return baseWidth / 2 - subjectWidth / 2;
  }

  static getPositionAboveOf(yAgent, heightReceptor) {
    return yAgent - heightReceptor;
  }

  static getPositionBelowOf(yAgent, heightAgent) {
    return yAgent + heightAgent;
  }
} 

class StringHelper {
  static convertPointsDisplay(value = 0) {
    return value.toString().padStart(2, ' ');
  }

  static convertPointsDisplayPad(value = 0, pad = 2) {
    return value.toString().padStart(pad, '0');
  }
}

class NumberHelper {
  static calculateTimeInterval(origin = 0, destiny = 0, duration = 0) {
    const distance = Math.abs(origin - destiny);
    const time = Math.abs(duration * GameConst.FPS);
    return (distance / (time || 1)) || (Graphics.width / 30);
  }
}

class ArrayHelper {
  static moveToStartByIndex(array, index) {
    const newArray = array.slice();
    if (index < 0 || index >= newArray.length) return newArray;
    const item = newArray.splice(index, 1)[0];
    newArray.unshift(item);
    return newArray;
  }

  static shuffle(array) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  static toArray(array = []) {
    return Array.isArray(array) ? array : [array];
  }
}

class ObjectHelper {
  static copyObject(obj, maxDepth = 3, currentDepth = 0) {
    const propsToCopy = [
      '_actionsQueue',
      '_actionsQueueWithDelay',
      '_status',
      '_type',
      '_color',
      '_figure',
      '_backImage',
      '_behaviors',
      '_turned',
      '_disabled',
      '_attackPoints',
      '_healthPoints',
      '_contentLayer',
      '_disabledLayer',
      '_flashedLayer',
      '_hoveredLayer',
      '_selectedLayer',
      '_sprites',
      '_enableSelected',
      '_selectedIndexs',
      '_openness',
      '_titleWindow',
      '_descriptionWindow',
      '_foldersWindow',
      '_resultWindow',
      '_cardsetSprite',
      'visible',
      'width',
    ];
    const newObj = Object.create(Object.getPrototypeOf(obj));
    for (const key in obj) {
      if (obj.hasOwnProperty && obj.hasOwnProperty(key) && propsToCopy.includes(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null && currentDepth < maxDepth && !Array.isArray(value)) {
          newObj[key] = ObjectHelper.copyObject(value, maxDepth, currentDepth + 1);
        } else {
          if (Array.isArray(value)) {
            newObj[key] = value.map(item => ObjectHelper.copyObject(item, maxDepth, currentDepth + 1));
          } else {
            newObj[key] = value;
          }
        }
      }
    }
    return newObj;
  }

  static mergeObjects(originalObj, dataToAdd) {
    if (typeof originalObj !== 'object' || originalObj === null ||
      typeof dataToAdd !== 'object' || dataToAdd === null) {
      throw new Error('Os argumentos devem ser objetos');
    }
    for (const key in dataToAdd) {
      if (dataToAdd.hasOwnProperty(key)) {
        originalObj[key] = dataToAdd[key];
      }
    }
    return originalObj;
  }

  static compareObjects(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }
}

class ColorHelper {
  static getColorIndex(color) {
    switch (color) {
      case GameColors.DEFAULT:
        return 0;
      case GameColors.LIGHTBLUE:
        return 1;
      case GameColors.LIGHTRED:
        return 2;
      case GameColors.LIGHTGREEN:
        return 3;
      case GameColors.LIGHTBLUE2:
        return 4;
      case GameColors.LIGHTPURPLE:
        return 5;
      case GameColors.LIGHTYELLOW:
        return 6;
      case GameColors.LIGHTGRAY:
        return 7;
      case GameColors.GRAY:
        return 8;
      case GameColors.BLUE:
        return 9;
      case GameColors.RED:
        return 10;
      case GameColors.GREEN:
        return 11;
      case GameColors.BLUE2:
        return 12;
      case GameColors.PURPLE:
        return 13;
      case GameColors.YELLOW:
        return 14;
      case GameColors.BLACK:
        return 15;
      case GameColors.BLUE3:
        return 16;
      case GameColors.YELLOW2:
        return 17;
      case GameColors.RED2:
        return 18;
      case GameColors.BLACK2:
        return 19;
      case GameColors.ORANGE:
        return 20;
      case GameColors.YELLOW3:
        return 21;
      case GameColors.GREEN2:
        return 22;
      case GameColors.GREEN3:
        return 23;
      case GameColors.LIGHTGREEN2:
        return 24;
      case GameColors.BROWN:
        return 25;
      case GameColors.BLUE4:
        return 26;
      case GameColors.PINK:
        return 27;
      case GameColors.GREEN4:
        return 28;
      case GameColors.LIGHTGREEN3:
        return 29;
      case GameColors.VIOLET:
        return 30;
      case GameColors.LIGHTVIOLET:
        return 31;
      default:
        return 0;
    }
  }

  static getColorHex(color) {
    switch (color) {
      case GameColors.RED:
        return '#ff0000';
      case GameColors.GREEN:
        return '#00ff00';
      case GameColors.BLUE:
        return '#0000ff';
      case GameColors.WHITE:
        return '#e5e5e5';
      case GameColors.BLACK:
        return '#191919';
      case GameColors.BROWN:
        return '#a52a2a';
      case GameColors.FADEDRED: 
        return '#990000';
      case GameColors.FADEDGREEN: 
        return '#009900';
      case GameColors.FADEDBLUE: 
        return '#000099';
      case GameColors.FADEDWHITE: 
        return '#959595';
      case GameColors.FADEDBLACK: 
        return '#101010';
      case GameColors.FADEDBROWN: 
        return '#852828';
      case GameColors.DEFAULT:
        return '#ffffff';
      default:
        return '#ffffff';
    }
  }
}