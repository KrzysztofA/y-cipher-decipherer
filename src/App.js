import React, { useState } from "react";

import Footer from "./components/Footer/Footer";
import HillForm from "./components/Form/HillForm";
import CaesarForm from "./components/Form/CaesarForm";
import RailForm from "./components/Form/RailForm";
import OutputWindow from "./components/OutputWindow/OutputWindow";
import Content from "./components/UI/Content/Content";
import TabContainer from "./components/UI/TabContainer";

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

const HillCipher = () => {
	const [output, setOutput] = useState(null);

	return (
		<>
			<h3>Y-Hill Cipher Decipherer</h3>
			<HillForm setOutput={setOutput} />
			<OutputWindow output={output} />
		</>
	);
};

function App() {
	const [currentTab, setCurrentTab] = useState(0);

	return (
		<>
			<Content>
				<TabContainer
					activeTab={currentTab}
					setActiveTab={setCurrentTab}
				/>
				{currentTab === 0 ? (
					<HillCipher />
				) : currentTab === 1 ? (
					<CaesarCipher />
				) : (
					<RailCipher />
				)}
				<Footer />
			</Content>
		</>
	);
}

export default App;
