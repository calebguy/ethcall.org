import { useQuery } from "@tanstack/react-query";
import { getRequests } from "./api";

function App() {
	const { data, isLoading } = useQuery({
		queryKey: ["requests"],
		queryFn: () => getRequests(),
		refetchInterval: 1000,
	});

	return (
		<div className="text-6xl md:text-8xl text-primary p-6 text-center md:text-left">
			<div className="">ethcall.org</div>
			<div className="flex flex-col mt-8">
				{!isLoading &&
					data?.requests?.map((req) => (
						<div key={req.id} className="text-2xl break-words">
							{req.path}
						</div>
					))}
				{isLoading && <div>Loading...</div>}
			</div>
			<div className="mt-8 text-4xl border border-primary rounded-md p-4 border-dashed">
				<code className="text-primary break-all">
					curl https://ethcall.org/:chainId/:address/:fnSig
				</code>
			</div>
		</div>
	);
}

export default App;
