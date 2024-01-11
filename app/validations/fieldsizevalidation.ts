export function fieldSizeValidation(size: any) {
	if (!size) {
		return "No size specified.";
	}

	if (typeof size === "number") {
		return "Size must be a number.";
	}

	if (size <= 0) {
		return "Size must be greater than zero.";
	}

	if (size > 32) {
		return "Size cannot be greater than 32.";
	}

	return 0;
}
