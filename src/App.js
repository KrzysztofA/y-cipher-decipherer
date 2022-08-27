import React, { useState } from "react";

import Footer from "./components/Footer/Footer";
import HillForm from "./components/Form/HillForm";
import OutputWindow from "./components/OutputWindow/OutputWindow";
import Content from "./components/UI/Content/Content";
import TabContainer from "./components/UI/Tab/TabContainer";

const RailCipher = () => {
  return (<>
  <h3>Y-Rail Cipher Decipherer</h3>
  <HillForm/>
  <OutputWindow/>
  </>);
}

const CaesarCipher = () => {
  return (<>
  <h3>Y-Caesar Cipher Decipherer</h3>
  <HillForm/>
  <OutputWindow/>
  </>);
}

const HillCipher = () => {
  return (<>
  <h3>Y-Hill Cipher Decipherer</h3>
  <HillForm/>
  <OutputWindow/>
  </>);
}

function App() {
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
  <>
    <Content>
      <TabContainer
        activeTab={currentTab}
        setActiveTab={setCurrentTab}
      />
      {
        currentTab === 0 ? <HillCipher/> : currentTab === 1 ? <CaesarCipher/> : <RailCipher/>
      }
      <Footer/>
    </Content>
  </>
  );
}

export default App;
