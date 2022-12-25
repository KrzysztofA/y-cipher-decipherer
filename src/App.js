import { useState } from "react";

import TabContext from "./hooks/context/TabContext";

import Footer from "./components/Footer";
import HillCipher from "./pages/HillCipher";
import CaesarForm from "./components/Form/CaesarForm";
import RailForm from "./components/Form/RailForm";
import OutputWindow from "./components/OutputWindow";
import Content from "./components/UI/Content";
import TabContainer from "./components/TabContainer";

const RailCipher = () => {
	const [output, setOutput] = useState(null);
	return (
		<>
			<h3>Y-Rail Cipher Decipherer</h3>
			<RailForm setOutput={setOutput} />
			<OutputWindow output={output} />
		</>
	);
};

const CaesarCipher = () => {
	const [output, setOutput] = useState(null);

	return (
		<>
			<h3>Y-Caesar Cipher Decipherer</h3>
			<CaesarForm setOutput={setOutput} />
			<OutputWindow output={output} />
		</>
	);
};

function App() {
	const [tab, setTab] = useState(0);

	return (
		<TabContext.Provider
			value={{
				tab: tab,
				setTab: setTab,
			}}
		>
			<Content>
				<TabContainer />
				{tab === 0 ? (
					<HillCipher />
				) : tab === 1 ? (
					<CaesarCipher />
				) : (
					<RailCipher />
				)}
				<Footer href="https://krzysztof-siatkowski.vercel.app" />
			</Content>
		</TabContext.Provider>
	);
}

export default App;
