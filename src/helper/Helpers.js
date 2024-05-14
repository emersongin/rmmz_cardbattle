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
    const time = Math.abs(duration * 60);
    return (distance / (time || 1)) || (Graphics.width / 30);
  }
}

class ObjectHelper {
  static copyObject(obj, maxDepth = 2, currentDepth = 0) {
    const newObj = Object.create(Object.getPrototypeOf(obj));
    for (const key in obj) {
      if (obj.hasOwnProperty && obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null && currentDepth < maxDepth && !Array.isArray(value)) {
          newObj[key] = ObjectHelper.copyObject(value, maxDepth, currentDepth + 1);
        } else {
          if (Array.isArray(value)) {
            newObj[key] = value.clone();
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
