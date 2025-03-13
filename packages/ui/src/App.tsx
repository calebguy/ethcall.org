import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Docs } from "./Docs";
import { Home } from "./Home";
import { NotFound } from "./NotFound";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/docs" element={<Docs />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
