module.exports = class Guard {
  static againstNullOrUndefined(argument, argumentName) {
    if (argument === null || argument === undefined) {
      return { succeeded: false, message: `${argumentName} is null or undefined` };
    } else {
      return { succeeded: true };
    }
  }

  static againstNullOrUndefinedBulk(args) {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  static isNumber(argument, argumentName) {
    if (typeof argument !== 'number') {
      return { succeeded: false, message: `${argumentName} is not a number` };
    } else {
      return { succeeded: true };
    }
  }

  static valueBetween(argument, argumentName, min, max) {
    if (argument < min || argument > max) {
      return { succeeded: false, message: `${argumentName} must be between ${min} and ${max}` };
    } else {
      return { succeeded: true };
    }
  }

  static isNaN(argument, argumentName) {
    if (isNaN(argument)) {
      return { succeeded: false, message: `${argumentName} is not a number` };
    } else {
      return { succeeded: true };
    }
  }

  static isOneOf(value, validValues, argumentName) {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true };
    } else {
      return {
        succeeded: false,
        message: `${argumentName} '${value}' isn't a correct value.`,
      };
    }
  }

  static isArray(argument, argumentName){
    if (Array.isArray(argument)) {
      return { succeeded: true };
    } else {
      return { succeeded: false, message: `${argumentName} is not an array` };
    }
  }

  static checkArrayValues(argument, argumentName, validValues) {
    if (Array.isArray(argument)) {
      for (let value of argument) {
        const result = this.isOneOf(value, validValues, argumentName);
        if (!result.succeeded) return result;
      }

      return { succeeded: true };
    } else {
      return { succeeded: false, message: `${argumentName} is not an array` };
    }
  }
}
