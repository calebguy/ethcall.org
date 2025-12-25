import { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
	RxCornerBottomLeft,
	RxCornerBottomRight,
	RxCornerTopLeft,
	RxCornerTopRight,
} from "react-icons/rx";
import Link from "next/link";

export default function Docs() {
	return (
		<div className="p-6 text-2xl md:text-4xl flex flex-col grow gap-14">
			<section className="text-magenta relative p-6 md:p-8">
				<RxCornerTopLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -left-[10px] text-dark-brown" />
				<RxCornerTopRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -right-[10px] text-dark-brown" />
				<RxCornerBottomLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -left-[10px] text-dark-brown" />
				<RxCornerBottomRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -right-[10px] text-dark-brown" />
				<div className="flex flex-col items-center md:items-start gap-2 break-words overflow-auto text-wrap">
					<span className="bg-dark-brown p-2 rounded-xl text-magenta leading-10 pt-2.5 px-3">
						GET
					</span>
					<div
						style={{ overflowWrap: "anywhere" }}
						className="overflow-auto text-wrap break-words text-center md:text-left"
					>
						<span className="text-dark-brown">https://ethcall.org/</span>
						<span className="font-bold">:chainId</span>
						<span className="text-cyan-300 font-bold">/:address</span>
						<span className="text-orange font-bold">/:fnSig</span>
						<span className="text-orange font-bold">{"("}</span>
						<span className="text-orange font-bold">arg1,arg2,...</span>
						<span className="text-orange font-bold">{")"}</span>
						<span className="text-green font-bold">(returnType...)</span>
						<span className="text-white font-bold">/:arg1,:arg2...</span>
					</div>
				</div>
				<div className="mt-14 flex flex-col items-center md:items-start gap-4">
					<span className="bg-dark-brown p-2 rounded-xl italic text-magenta leading-10 pt-2.5 px-3">
						RETURNS
					</span>
					<div className="text-white italic">
						<span>{"{"}</span>
						<span>result:</span>
						<span>{'"string | Array<string | Array<string>>"'}</span>
						<span>{"}"}</span>
					</div>
				</div>
			</section>
			<Section
				method="GET"
				path={
					<span>
						<span className="text-magenta font-bold">:chainId</span>
						<span className="text-cyan-300 font-bold">/:address</span>
						<span className="text-dark-brown font-bold">/balance</span>
					</span>
				}
				returns={JSON.stringify({ result: "string" })}
			/>
			<Section
				method="GET"
				path={
					<span>
						<span className="text-dark-brown font-bold">wei2eth</span>
						<span className="text-white font-bold">/:value</span>
					</span>
				}
				returns={"string"}
			/>
			<Section
				method="GET"
				path={
					<span>
						<span className="text-dark-brown font-bold">eth2wei</span>
						<span className="text-white font-bold">/:value</span>
					</span>
				}
				returns={"string"}
			/>
			<Section
				method="GET"
				path="chains"
				returns={`Array<${JSON.stringify({
					chainId: "number",
					chainName: "string",
				})}>`}
			/>
			<footer className="flex items-end justify-center gap-4 grow">
				<Link
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/calebguy/ethcall.org"
					className="hover:text-magenta text-dark-brown"
				>
					<FaGithub className="md:w-8 md:h-8 w-6 h-6" />
				</Link>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					href="https://x.com/caleb__guy"
					className="hover:text-magenta text-dark-brown"
				>
					<FaXTwitter className="md:w-8 md:h-8 w-6 h-6" />
				</Link>
			</footer>
		</div>
	);
}

function Section({
	method,
	path,
	returns,
}: { method: string; path: string | ReactNode; returns: string }) {
	return (
		<section className="relative p-6 md:p-8">
			<RxCornerTopLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -left-[10px] text-dark-brown" />
			<RxCornerTopRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -right-[10px] text-dark-brown" />
			<RxCornerBottomLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -left-[10px] text-dark-brown" />
			<RxCornerBottomRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -right-[10px] text-dark-brown" />
			<div className="flex flex-col items-center md:items-start gap-2 break-words overflow-auto text-wrap">
				<span className="bg-dark-brown text-magenta p-2 rounded-xl leading-10 pt-2.5 px-3">
					{method}
				</span>
				<div
					style={{ overflowWrap: "anywhere" }}
					className="overflow-auto text-wrap break-words flex items-center"
				>
					<span className="text-dark-brown">https://ethcall.org/</span>
					{typeof path === "string" ? (
						<span className="text-dark-brown font-bold">{path}</span>
					) : (
						path
					)}
				</div>
			</div>
			<div className="mt-14 flex flex-col items-center md:items-start gap-4">
				<span className="bg-dark-brown p-2 rounded-xl text-magenta italic inline-flex leading-10 pt-2.5 px-3">
					RETURNS
				</span>
				<div
					style={{ overflowWrap: "anywhere" }}
					className="text-white italic overflow-auto text-wrap break-words"
				>
					{returns}
				</div>
			</div>
		</section>
	);
}
