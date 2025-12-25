import { getAddress } from "viem";

/**
 * Convert function signature into Solidity format
 * Supports function arguments now.
 */
export function convertToSolidityFunction(signature: string): string {
	const functionPattern = /^(\w+)\((.*?)\)\((.*)\)$/;
	const match = signature.match(functionPattern);

	if (!match) {
		throw new Error(`Invalid function signature format: ${signature}`);
	}

	const functionName = match[1]; // Function name
	const inputTypes = match[2]; // Function input types
	const returnTypes = match[3]; // Return types

	// Ensure return types maintain correct parentheses
	return `function ${functionName}(${inputTypes}) public view returns (${returnTypes})`;
}

/**
 * Extract parameters and cast to correct types
 */
export function extractParams(signature: string, paramsString?: string) {
	if (!paramsString) return [];

	const inputTypes = signature.match(/\((.*?)\)/)?.[1]?.split(",") || [];

	const params = paramsString.split(",").map((param, index) => {
		const type = inputTypes[index]?.trim();

		if (type?.startsWith("uint") || type?.startsWith("int")) {
			return BigInt(param);
		}
		if (type === "bool") {
			return param === "true";
		}
		if (type === "address") {
			return getAddress(param);
		}
		if (type?.endsWith("[]")) {
			return param.split(";"); // Arrays use `;` as separator
		}
		return param;
	});

	return params;
}
