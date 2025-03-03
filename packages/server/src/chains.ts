import { mainnet, optimism } from "viem/chains";

export const chains = {
	1: {
		rpc: [
			"https://eth.llamarpc.com",
			"https://virginia.rpc.blxrbdn.com",
			"https://eth.blockrazor.xyz",
		],
		chain: mainnet,
	},
	10: {
		rpc: [
			"https://optimism.llamarpc.com",
			"https://rpc.ankr.com/optimism",
			"https://optimism.lava.build",
		],
		chain: optimism,
	},
};
