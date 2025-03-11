import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Docs } from "./Docs";
import { Home } from "./Home";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/docs" element={<Docs />} />
			</Routes>
		</BrowserRouter>
	);
}
