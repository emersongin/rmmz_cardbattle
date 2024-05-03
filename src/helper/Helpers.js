class StringHelper {
  static convertPointsDisplay(value = 0) {
    return value.toString().padStart(2, ' ');
  }

  static convertPointsDisplayPad(value = 0, pad = 2) {
    return value.toString().padStart(pad, '0');
  }
}

class IntegerHelper {
  static findBigger() {
    let bigger = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] > bigger) {
          bigger = arguments[i];
        }
    }
    return bigger;
  }
}

class ObjectHelper {
  static copyObject(obj) {
    const copiedObj = Object.create(Object.getPrototypeOf(obj));
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    Object.defineProperties(copiedObj, descriptors);
    return copiedObj;
  }

  static parseReference(params, reference) {
    let obj = {};
    Object.keys(params).forEach((key, index) => {
      if (reference) return obj[reference[index]] = params[key];
      obj[index] = params[key];
    });
    return obj;
  }
}

