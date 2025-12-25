import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col grow items-center justify-center gap-4">
			<div className="text-2xl font-bold text-dark-brown">¯\_(ツ)_/¯</div>
			<Link href="/" className="text-2xl hover:italic text-green rel">
				HOME
			</Link>
		</div>
	);
}
