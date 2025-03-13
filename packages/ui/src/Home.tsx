import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import {
	RxCornerBottomLeft,
	RxCornerBottomRight,
	RxCornerTopLeft,
	RxCornerTopRight,
} from "react-icons/rx";
import { Link } from "react-router-dom";
import { getRequests } from "./api";
import { abbreviateAddress, splitFunctionSignature } from "./utils";

export function Home() {
	const { data, isLoading } = useQuery({
		queryKey: ["requests"],
		queryFn: () => getRequests(),
		refetchInterval: 10000,
	});

	return (
		<div
			className={classNames(
				"p-6 text-center md:text-left tracking-normal flex flex-col grow",
			)}
		>
			<div className="flex flex-col gap-4 items-start grow px-2 py-2 order-last md:order-first">
				{!isLoading &&
					data?.requests?.map((req) => {
						const [, chainId, address, fnSig, ...args] = req.path.split("/");
						const { signature, returnType } = splitFunctionSignature(fnSig);
						return (
							<a
								key={req.id}
								target="_blank"
								rel="noopener noreferrer"
								href={`${import.meta.env.VITE_API_BASE_URL}${req.path}`}
								className="leading-8 md:leading-10 text-2xl md:text-4xl group relative w-full p-6 md:p-8 break-all hover:bg-magenta/15 rounded-[10px] border border-transparent hover:border-magenta transition-all duration-100"
							>
								<RxCornerTopLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -left-[10px] text-dark-brown" />
								<RxCornerTopRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -right-[10px] text-dark-brown" />
								<RxCornerBottomLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -left-[10px] text-dark-brown" />
								<RxCornerBottomRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -right-[10px] text-dark-brown" />
								<span className="group-hover:opacity-0 inline-block">
									<span className="font-light text-dark-brown">/{chainId}</span>
									<span className="font-light text-dark-brown">
										/{abbreviateAddress(address)}
									</span>
									<span className="font-bold text-orange">/{signature}</span>
									<span className="font-bold text-green italic">
										{returnType}
									</span>
									{args.length > 0 && (
										<span className="text-white font-medium">
											/{args.join(",")}
										</span>
									)}
								</span>
								<span className="hidden break-all text-magenta absolute top-0 left-0 p-8 group-hover:flex items-center justify-start w-full h-full  md:text-4xl text-overflow-ellipsis overflow-hidden tracking-tighter">
									<span className="text-wrap overflow-hidden">
										{req.result}
									</span>
								</span>
							</a>
						);
					})}
				{isLoading && (
					<div
						className="w-full h-full grow flex items-center justify-center relative
					"
					>
						<span className="text-4xl animate-spin">☎️</span>
						<RxCornerTopLeft className="md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -left-[10px] text-dark-brown" />
						<RxCornerTopRight className="md:w-10 md:h-10 w-8 h-8 absolute -top-[10px] -right-[10px] text-dark-brown" />
						<RxCornerBottomLeft className="md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -left-[10px] text-dark-brown" />
						<RxCornerBottomRight className="md:w-10 md:h-10 w-8 h-8 absolute -bottom-[10px] -right-[10px] text-dark-brown" />
					</div>
				)}
			</div>
			<div className="group order-first md:order-last md:fixed bottom-0 left-0 text-dark-brown backdrop-blur-[1.5px] p-4 text-center md:text-left w-full">
				<span className="md:group-hover:hidden text-4xl md:text-7xl font-bold break-all">
					ethcall.org
				</span>
				<span className="md:group-hover:hidden md:block text-2xl md:text-4xl font-bold break-all hidden md:visible">
					/:chainId/:address/:fnSig/:arg...
				</span>
				<Link
					to="/docs"
					className="block md:hidden md:group-hover:block md:text-magenta text-dark-brown hover:italic hover:text-magenta mt-4 text-2xl md:text-7xl md:italic md:uppercase text-center md:text-left "
				>
					docs
					<span className="hidden md:inline-block">
						{"->->->->->->->->->->"}
					</span>
				</Link>
			</div>
			<footer className="order-last md:hidden flex items-center justify-center gap-4">
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
