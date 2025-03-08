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
			<div className="flex flex-col gap-4 md:gap-8 items-start grow overflow-y-auto">
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
								className="leading-8 md:leading-10 text-2xl md:text-4xl group relative w-full p-6 md:p-8 break-all"
							>
								<RxCornerTopLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute top-0 left-0 text-dark-brown" />
								<RxCornerTopRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute top-0 right-0 text-dark-brown" />
								<RxCornerBottomLeft className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute bottom-0 left-0 text-dark-brown" />
								<RxCornerBottomRight className="group-hover:text-magenta md:w-10 md:h-10 w-8 h-8 absolute bottom-0 right-0 text-dark-brown" />
								<span className="group-hover:hidden inline-block">
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
								<span className="group-hover:inline-block hidden break-all text-magenta">
									{req.result}
								</span>
							</a>
						);
					})}
				<div className="text-dark-brown text-center w-full">
					~ eth_call me ~
				</div>
				{isLoading && <div>Loading...</div>}
			</div>
			<div className="p-4 text-center text-dark-brown relative">
				<span className="text-4xl md:text-7xl font-bold">ethcall.org</span>
				<span className="text-2xl md:text-4xl font-bold break-all">
					/:chainId/:address/:fnSig/:arg1,:arg2...
				</span>
			</div>
		</div>
	);
}

export default App;
