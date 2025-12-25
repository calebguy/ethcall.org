export function abbreviateAddress(address: string) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function splitFunctionSignature(funcStr: string): {
	signature: string;
	returnType: string;
} {
	// Regular expression to extract function name, parameters, and return type
	const match = funcStr.match(/^(.+?)\((.*?)\)(\((.*)\))$/);

	if (match) {
		const functionSignature = `${match[1]}(${match[2]})`;
		const returnType = match[3]; // Includes parentheses
		return { signature: functionSignature, returnType };
	}

	return { signature: "", returnType: "" }; // Return null if parsing fails
}
