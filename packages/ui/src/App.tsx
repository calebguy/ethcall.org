import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { getRequests } from "./api";

function App() {
	const { data, isLoading } = useQuery({
		queryKey: ["requests"],
		queryFn: () => getRequests(),
		refetchInterval: 10000,
	});

	return (
		<div
			className={classNames(
				"text-6xl md:text-8xl text-primary p-6 text-center md:text-left min-h-svh relative",
			)}
		>
			<div className="">ethcall.org</div>
			<div className="flex flex-col mt-8 gap-8 md:gap-0">
				{!isLoading &&
					data?.requests?.map((req) => {
						return (
							<div key={req.id} className="leading-3">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={`${import.meta.env.VITE_API_BASE_URL}${req.path}`}
									className="text-2xl break-words hover:underline hover:text-blue-700 text-center md:text-left"
								>
									{req.path}
								</a>
								<div className="text-center md:text-right text-gray-500 text-lg break-words">
									{req?.result}
								</div>
							</div>
						);
					})}
				{isLoading && <div>Loading...</div>}
			</div>
			<div className="fixed bottom-0 left-0 w-full p-4 flex">
				<div className="grow mt-8 backdrop-blur-2xl text-4xl border border-primary rounded-md p-4 border-dashed flex items-center justify-center">
					<code className="text-primary break-all text-xl md:text-3xl grow text-center inline-block">
						<span>
							curl https://ethcall.org/:chainId/:address/:fnSig/(arg1,arg2...)
						</span>
					</code>
				</div>
			</div>
		</div>
	);
}

export default App;
