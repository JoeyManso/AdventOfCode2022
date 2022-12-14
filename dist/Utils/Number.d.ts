/**
 * Is Valid Number
 * Checks whether the given value is a number type
 * Note: isNaN treats `null` as a valid number; this function treats `null` as an invalid number
 * @param val The value to check
 */
export declare function IsValidNumber(val: any): boolean;
/**
 * Is Valid Number Greater Than Zero
 * Checks whether the given value is a number type and the number is > 0
 * Note: isNaN will return `true` if given a null value; this function will return `false`
 * @param val The value to check
 */
export declare function IsValidNumberGreaterThanZero(val: any): boolean;
/**
 * Attempts to parse the value to type Number
 * If the value cannot be parsed, `undefined` is returned
 * @param val The val to parse
 */
export declare function ToNumber(val: any): number | undefined;
/**
 * Attempts to parse a value to type Number
 * If the value cannot be parsed, an Error is Thrown
 * @param val The val to parse
 */
export declare function MustParseNumber(val: any): number;
/**
 * Returns the clamped number given the range
 */
export declare function Clamp(val: number, min: number, max: number): number;
/**
 * Returns true if _value is within the min/max range (inclusive)
 */
export declare function IsWithin(_value: number, _min: number, _max: number): boolean;
/**
 * Returns true if _value is within the min/max range (inclusive)
 */
export declare function IsWithinInclusive(_value: number, _min: number, _max: number): boolean;
