import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
	RxCornerBottomLeft,
	RxCornerBottomRight,
	RxCornerTopLeft,
	RxCornerTopRight,
} from "react-icons/rx";
import { Link } from "react-router-dom";

export function Docs() {
	return (
		<div className="p-6 text-2xl md:text-4xl flex flex-col gap-14 min-h-dvh">
			<section className="text-magenta relative p-6 md:p-8">
				<RxCornerTopLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -left-[10px] text-dark-brown" />
				<RxCornerTopRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -right-[10px] text-dark-brown" />
				<RxCornerBottomLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -left-[10px] text-dark-brown" />
				<RxCornerBottomRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -right-[10px] text-dark-brown" />
				<div className="flex flex-col items-center md:items-start gap-2 break-words overflow-auto text-wrap">
					<span className="bg-dark-brown p-2 rounded-xl text-magenta">GET</span>
					<div
						style={{ overflowWrap: "anywhere" }}
						className="overflow-auto text-wrap break-words text-center md:text-left"
					>
						<span className="text-dark-brown">
							https://ethcall.org/:chainId/:address
						</span>
						<span className="text-orange">/:fnSig</span>
						<span className="text-orange">{"("}</span>
						<span className="text-orange/60">arg1,arg2,...</span>
						<span className="text-orange">{")"}</span>
						<span className="text-green">(returnType...)</span>
						<span className="text-white">/:arg1,:arg2...</span>
					</div>
				</div>
				<div className="mt-14 flex flex-col items-center md:items-start gap-4">
					<span className="bg-dark-brown p-2 rounded-xl italic text-magenta">
						RETURNS
					</span>
					<div className="text-white italic">
						<span>{"{"}</span>
						<span>result:</span>
						<span>"string | array"</span>
						<span>{"}"}</span>
					</div>
				</div>
			</section>
			<section className="relative p-6 md:p-8">
				<RxCornerTopLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -left-[10px] text-dark-brown" />
				<RxCornerTopRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -right-[10px] text-dark-brown" />
				<RxCornerBottomLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -left-[10px] text-dark-brown" />
				<RxCornerBottomRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -right-[10px] text-dark-brown" />
				<div className="flex flex-col items-center md:items-start gap-2 break-words overflow-auto text-wrap">
					<span className="bg-dark-brown text-magenta p-2 rounded-xl">GET</span>
					<div
						style={{ overflowWrap: "anywhere" }}
						className="overflow-auto text-wrap break-words"
					>
						<span className="text-dark-brown">https://ethcall.org</span>
						<span className="text-dark-brown">/chains</span>
					</div>
				</div>
				<div className="mt-14 flex flex-col items-center md:items-start gap-4">
					<span className="bg-dark-brown p-2 rounded-xl text-magenta italic">
						RETURNS
					</span>
					<div
						style={{ overflowWrap: "anywhere" }}
						className="text-white italic overflow-auto text-wrap break-words"
					>
						{JSON.stringify({ chainId: "number", chainName: "string" })}[]
					</div>
				</div>
			</section>
			<footer className="flex items-center justify-center gap-4">
				<Link
					target="_blank"
					rel="noopener noreferrer"
					to="https://github.com/calebguy/ethcall.org"
					className="hover:text-magenta text-dark-brown"
				>
					<FaGithub className="md:w-8 md:h-8 w-6 h-6" />
				</Link>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					to="https://x.com/caleb__guy"
					className="hover:text-magenta text-dark-brown"
				>
					<FaXTwitter className="md:w-8 md:h-8 w-6 h-6" />
				</Link>
			</footer>
		</div>
	);
}
