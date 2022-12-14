/**
 * Is Valid Number
 * Checks whether the given value is a number type
 * Note: isNaN treats `null` as a valid number; this function treats `null` as an invalid number
 * @param val The value to check
 */
export function IsValidNumber(val: any) {
	return !(isNaN(val) || typeof val !== 'number');
}

/**
 * Is Valid Number Greater Than Zero
 * Checks whether the given value is a number type and the number is > 0
 * Note: isNaN will return `true` if given a null value; this function will return `false`
 * @param val The value to check
 */
export function IsValidNumberGreaterThanZero(val: any) {
	return IsValidNumber(val) && val > 0;
}

/**
 * Attempts to parse the value to type Number
 * If the value cannot be parsed, `undefined` is returned
 * @param val The val to parse
 */
export function ToNumber(val: any): number | undefined {
	const num = Number(val);
	if (IsValidNumber(num)) {
		return num;
	}
	return undefined;
}

/**
 * Attempts to parse a value to type Number
 * If the value cannot be parsed, an Error is Thrown
 * @param val The val to parse
 */
export function MustParseNumber(val: any) {
	const num = Number(val);
	if (!IsValidNumber(num)) {
		throw new Error(`Failed to parse ${val} as Number`);
	}
	return num;
}

/**
 * Returns the clamped number given the range
 */
export function Clamp(val: number, min: number, max: number): number {
	if (val < min) {
		return min;
	}
	if (val > max) {
		return max;
	}
	return val;
}

/**
 * Returns true if _value is within the min/max range (inclusive)
 */
export function IsWithin(_value: number, _min: number, _max: number): boolean {
	return _value > _min && _value < _max;
}

/**
 * Returns true if _value is within the min/max range (inclusive)
 */
export function IsWithinInclusive(_value: number, _min: number, _max: number): boolean {
	return _value >= _min && _value <= _max;
}
