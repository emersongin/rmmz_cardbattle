class StringHelper {
  static convertPointsDisplay(value = 0) {
    return value.toString().padStart(2, ' ');
  }

  static convertPointsDisplayPad(value = 0, pad = 2) {
    return value.toString().padStart(pad, '0');
  }
}

class NumberHelper {
  static findBigger() {
    let bigger = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] > bigger) {
          bigger = arguments[i];
        }
    }
    return bigger;
  }

  static calculateTimeInterval(origin = 0, destiny = 0, duration = 0) {
    const distance = Math.abs(origin - destiny);
    const time = Math.abs(duration * 60);
    return (distance / (time || 1)) || (Graphics.width / 30);
  }
}

class ObjectHelper {
  static copyObject(obj) {
    const copiedObj = Object.create(Object.getPrototypeOf(obj));
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    for (let key in descriptors) {
        if (typeof descriptors[key].value === 'function') {
            copiedObj[key] = descriptors[key].value.call(obj);
        } else {
            Object.defineProperty(copiedObj, key, descriptors[key]);
        }
    }
    return copiedObj;
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

    // static parseReference(params, reference) {
  //   let obj = {};
  //   Object.keys(params).forEach((key, index) => {
  //     if (reference) return obj[reference[index]] = params[key];
  //     obj[index] = params[key];
  //   });
  //   return obj;
  // }
}
