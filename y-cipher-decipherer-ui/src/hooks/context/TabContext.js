import { createContext } from "react";

const TabContext = createContext({
	tab: 0,
	setTab: () => {},
});

export default TabContext;
