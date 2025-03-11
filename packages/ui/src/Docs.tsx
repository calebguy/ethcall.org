export function Docs() {
	return (
		<div className="p-6 text-center md:text-left text-2xl md:text-4xl flex flex-col gap-14 min-h-dvh">
			<section>
				<div>
					<span className="text-dark-brown">Base URL:</span>{" "}
					<span className="text-dark-brown">https://ethcall.org</span>
				</div>
			</section>
			<section>
				<div className="flex items-center gap-2">
					<span>GET</span>
					<div>/:chainId/:address/:fnSig/:arg1,:arg2...</div>
				</div>
				<div className="ml-10">
					{JSON.stringify({ result: "string | object" })}
				</div>
			</section>
			<section>
				<div className="flex items-center gap-2">
					<span>GET</span>
					<div>/chains</div>
				</div>
				<div className="ml-10">
					Array{"<"}
					{JSON.stringify({ chainId: "number", chainName: "string" })}
					{">"}
				</div>
			</section>
		</div>
	);
}
