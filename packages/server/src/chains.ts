import { createPublicClient, http } from "viem";
import {
	arbitrum,
	arbitrumNova,
	arbitrumSepolia,
	base,
	baseSepolia,
	holesky,
	mainnet,
	optimism,
	optimismSepolia,
} from "viem/chains";

export const chains = {
	17000: {
		rpc: [
			"https://holesky.gateway.tenderly.co",
			"https://holesky.drpc.org",
			"https://1rpc.io/holesky",
		],
		chain: holesky,
	},
	1: {
		rpc: [
			"https://eth.llamarpc.com",
			"https://virginia.rpc.blxrbdn.com",
			"https://eth.blockrazor.xyz",
		],
		chain: mainnet,
	},
	11155420: {
		rpc: [
			"https://sepolia.optimism.io",
			"https://endpoints.omniatech.io/v1/op/sepolia/public",
			"https://api.zan.top/opt-sepolia",
		],
		chain: optimismSepolia,
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
	421614: {
		rpc: [
			"https://arbitrum-sepolia-rpc.publicnode.com",
			"https://api.zan.top/arb-sepolia",
			"https://arbitrum-sepolia.gateway.tenderly.co",
		],
		chain: arbitrumSepolia,
	},
	42161: {
		rpc: [
			"https://arbitrum.llamarpc.com",
			"https://endpoints.omniatech.io/v1/arbitrum/one/public",
			"https://arb-pokt.nodies.app",
		],
		chain: arbitrum,
	},
	42170: {
		rpc: [
			"https://docs-demo.nova-mainnet.quiknode.pro",
			"https://arbitrum-nova.gateway.tenderly.co",
			"https://nova.arbitrum.io/rpc",
		],
		chain: arbitrumNova,
	},
};

export class InvalidChainError extends Error {
	constructor(chainId: number) {
		super(`Chain ${chainId} not found`);
	}
}

export function getClient(chainId: number) {
	const chain = chains[chainId as keyof typeof chains];
	if (!chain) {
		throw new InvalidChainError(chainId);
	}
	const rpcs = chain.rpc;
	const rpcUrl = rpcs[Math.floor(Math.random() * rpcs.length)];
	return createPublicClient({
		chain: chain.chain,
		transport: http(rpcUrl),
	});
}
