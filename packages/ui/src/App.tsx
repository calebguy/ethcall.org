import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import {
	RxCornerBottomLeft,
	RxCornerBottomRight,
	RxCornerTopLeft,
	RxCornerTopRight,
} from "react-icons/rx";
import { getRequests } from "./api";
import { abbreviateAddress, splitFunctionSignature } from "./utils";

function App() {
	const { data, isLoading } = useQuery({
		queryKey: ["requests"],
		queryFn: () => getRequests(),
		refetchInterval: 10000,
	});

	return (
		<div
			className={classNames(
				"p-6 text-center md:text-left min-h-screen max-h-screen tracking-normal flex flex-col",
			)}
		>
			<div className="flex flex-col gap-4 items-start grow overflow-y-auto overflow-x-hidden px-2 py-2">
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
									<span className="font-bold text-green">{returnType}</span>
									{args.length > 0 && (
										<span className="text-white font-bold">
											/{args.join(",")}
										</span>
									)}
								</span>
								<span className="hidden break-all text-magenta absolute top-0 left-8 group-hover:flex items-center justify-start w-full h-full  md:text-4xl text-overflow-ellipsis overflow-hidden tracking-tighter">
									<span className="text-wrap">{req.result}</span>
									{/* <span className="inline-flex grow">
										<MdArrowOutward className="w-10 h-10" />
									</span> */}
								</span>
							</a>
						);
					})}
				<div className="text-dark-brown text-center w-full">
					~ eth_call me ~
				</div>
				{isLoading && <div>Loading...</div>}
			</div>
			<div className="absolute bottom-4 left-4 text-center text-dark-brown backdrop-blur-xs rounded-xl p-4 shadow-dark-brown/20">
				<span className="text-4xl md:text-7xl font-bold">ethcall.org</span>
				<span className="text-2xl md:text-4xl font-bold break-all">
					/:chainId/:address/:fnSig/:arg1,:arg2...
				</span>
			</div>
		</div>
	);
}

export default App;
