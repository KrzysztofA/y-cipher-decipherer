import { useState } from "react";

import TabContext from "./hooks/context/TabContext";

import HillCipher from "./pages/HillCipher";
import RailCipher from "./pages/RailCipher";
import CaesarCipher from "./pages/CaesarCipher";
import Content from "./components/UI/Content";
import TabContainer from "./components/TabContainer";
import Footer from "./components/Footer";

const tabs = [<HillCipher />, <CaesarCipher />, <RailCipher />];

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
				{tabs[tab]}
				<Footer href="https://krzysztof-siatkowski.vercel.app" />
			</Content>
		</TabContext.Provider>
	);
}

export default App;
