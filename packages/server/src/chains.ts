import { base, baseSepolia, mainnet, optimism } from "viem/chains";

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
	84532: {
		rpc: [
			"https://base-sepolia.gateway.tenderly.co",
			"https://base-sepolia-rpc.publicnode.com",
			"https://sepolia.base.org",
		],
		chain: baseSepolia,
	},
	8453: {
		rpc: [
			"https://base.llamarpc.com",
			"https://base-mainnet.public.blastapi.io",
			"https://base-mainnet.public.blastapi.io",
		],
		chain: base,
	},
};
