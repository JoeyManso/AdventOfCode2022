export function AreValuesEqual(_valA: any, _valB: any): boolean {
	const propertyList: any = [
		{
			path: '',
			A: _valA,
			B: _valB,
		},
	];

	while (propertyList.length) {
		const property = propertyList.pop();

		const propertyTypeA: string = (property.A === null || property.A === undefined) ? null : typeof property.A;
		const propertyTypeB: string = (property.B === null || property.B === undefined) ? null : typeof property.B;

		//if the old property type and the new property type differ these objects are not equal
		if (propertyTypeA === propertyTypeB) {
			switch (propertyTypeA) {
				case 'object': {
					if (Array.isArray(property.A)) {
						//if the length of the arrays differ these objects are not equal
						const lengthA = property.A.length;
						if (lengthA !== property.B.length) {
							return false;
						}
						//otherwise, add each array element to our propertyList and continue to the next property
						else {
							for (let i = 0; i < lengthA; ++i) {
								propertyList.push({
									path: property.path + '.' + i,
									A: property.A[i],
									B: property.B[i],
								});
							}
						}
					}
					else {
						const checkedProperties: Set<string> = new Set<string>();

						//go through each property in the valA and determine if we should push each individual property into our propertyList
						for (const propertyName in property.A) {
							if (!property.A.hasOwnProperty(propertyName)) {
								continue;
							}

							let propertyPath = '';
							if (property.path.length > 0) {
								propertyPath = property.path + '.';
							}
							propertyPath += propertyName;

							checkedProperties.add(propertyPath);

							//if the valB doesn't have this property these objects are not equal
							if (!property.B?.hasOwnProperty(propertyName)) {
								return false;
							}

							//add this property to our propertyList and continue to the next property
							propertyList.push({
								path: propertyPath,
								A: property.A[propertyName],
								B: property.B[propertyName],
							});
						}

						//determine if there are any properties on the valB that do not exist in the valA
						for (const propertyName in property.B) {
							if (!property.B.hasOwnProperty(propertyName)) {
								continue;
							}
							let propertyPath = '';
							if (property.path.length > 0) {
								propertyPath = property.path + '.';
							}
							propertyPath += propertyName;

							//don't bother checking this property if we should ignore it
							if (checkedProperties.has(propertyPath)) {
								continue;
							}

							// If this valB property does not exist on valA, these objects are not equal
							if (!property.A.hasOwnProperty(propertyName)) {
								return false;
							}
						}
					}
					break;
				}
				case 'string': {
					// Compare strings as Dates first and break if equal, else fallthrough to basic comparison
					const dateMillisA: number = Date.parse(property.A);
					const dateMillisB: number = Date.parse(property.B);
					if (!isNaN(dateMillisA) && !isNaN(dateMillisB) && dateMillisA === dateMillisB) {
						break;
					}
				}
				// Falls through
				case null:
				default:
					//if the basic values differ these objects are not equal
					if (property.A !== property.B) {
						return false;
					}
					break;
			}
		}
		else {
			return false;
		}
	}
	return true;
}