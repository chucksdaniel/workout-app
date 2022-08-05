import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and Components
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
