"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsWithinInclusive = exports.IsWithin = exports.Clamp = exports.MustParseNumber = exports.ToNumber = exports.IsValidNumberGreaterThanZero = exports.IsValidNumber = void 0;
/**
 * Is Valid Number
 * Checks whether the given value is a number type
 * Note: isNaN treats `null` as a valid number; this function treats `null` as an invalid number
 * @param val The value to check
 */
function IsValidNumber(val) {
    return !(isNaN(val) || typeof val !== 'number');
}
exports.IsValidNumber = IsValidNumber;
/**
 * Is Valid Number Greater Than Zero
 * Checks whether the given value is a number type and the number is > 0
 * Note: isNaN will return `true` if given a null value; this function will return `false`
 * @param val The value to check
 */
function IsValidNumberGreaterThanZero(val) {
    return IsValidNumber(val) && val > 0;
}
exports.IsValidNumberGreaterThanZero = IsValidNumberGreaterThanZero;
/**
 * Attempts to parse the value to type Number
 * If the value cannot be parsed, `undefined` is returned
 * @param val The val to parse
 */
function ToNumber(val) {
    const num = Number(val);
    if (IsValidNumber(num)) {
        return num;
    }
    return undefined;
}
exports.ToNumber = ToNumber;
/**
 * Attempts to parse a value to type Number
 * If the value cannot be parsed, an Error is Thrown
 * @param val The val to parse
 */
function MustParseNumber(val) {
    const num = Number(val);
    if (!IsValidNumber(num)) {
        throw new Error(`Failed to parse ${val} as Number`);
    }
    return num;
}
exports.MustParseNumber = MustParseNumber;
/**
 * Returns the clamped number given the range
 */
function Clamp(val, min, max) {
    if (val < min) {
        return min;
    }
    if (val > max) {
        return max;
    }
    return val;
}
exports.Clamp = Clamp;
/**
 * Returns true if _x is within the min/max range (inclusive)
 */
function IsWithin(_x, _min, _max) {
    return _x > _min && _x < _max;
}
exports.IsWithin = IsWithin;
/**
 * Returns true if _x is within the min/max range (inclusive)
 */
function IsWithinInclusive(_x, _min, _max) {
    return _x >= _min && _x <= _max;
}
exports.IsWithinInclusive = IsWithinInclusive;
//# sourceMappingURL=Number.js.map