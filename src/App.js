import React, { useState } from "react";

import Footer from "./components/UI/Footer";
import HillCipher from "./pages/HillCipher";
import CaesarCipher from "./pages/CaesarCipher";
import RailCipher from "./pages/RailCipher";

import Content from "./components/UI/Content";
import TabContainer from "./components/TabContainer";

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [<HillCipher />, <CaesarCipher />, <RailCipher />];

  return (
    <>
      <Content>
        <TabContainer activeTab={currentTab} setActiveTab={setCurrentTab} />
        {tabs[currentTab]}
        <Footer href="#" />
      </Content>
    </>
  );
}

export default App;
