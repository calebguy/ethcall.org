import { Link } from "react-router-dom";

export function NotFound() {
	return (
		<div className="flex flex-col grow items-center justify-center gap-4">
			<div className="text-2xl font-bold text-dark-brown">¯\_(ツ)_/¯</div>
			<Link to="/" className="text-2xl hover:italic text-green">
				HOME
			</Link>
		</div>
	);
}
