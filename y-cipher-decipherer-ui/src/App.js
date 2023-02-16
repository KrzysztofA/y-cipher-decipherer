import { useState } from "react";

import TabContext from "./hooks/context/TabContext";

import HillCipher from "./pages/HillCipher";
import RailCipher from "./pages/RailCipher";
import CaesarCipher from "./pages/CaesarCipher";
import Content from "./components/UI/Content";
import TabContainer from "./components/Containers/TabContainer";
import Footer from "./components/Compound/Footer";

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
				<TabContainer
					tabLabels={["Hill Cipher", "Caesar Cipher", "Rail Cipher"]}
				/>
				{tabs.map((section, i) => {
					const hide = tab !== i;
					return (
						<span
							role="tabpanel"
							aria-labelledby={`tab${i}`}
							id={`form${i}`}
							key={`form${i}`}
							className={hide ? "tabPanel hidden" : "tabPanel"}
							aria-hidden={hide}
							hidden={hide}
						>
							{!hide && section}
						</span>
					);
				})}

				<Footer href="https://krzysztof-siatkowski.vercel.app" />
			</Content>
		</TabContext.Provider>
	);
}

export default App;
