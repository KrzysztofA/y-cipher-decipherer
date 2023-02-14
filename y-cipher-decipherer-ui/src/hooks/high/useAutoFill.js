import { useState, useContext, useEffect, useRef } from "react";

import FormContext from "../context/FormContext";

// Controls logic for use of autofilled values
const useAutoFill = () => {
  const [samples, setSamples] = useState(null);

  const { dataSource, fillHandle } = useContext(FormContext);

  const previousSelection = useRef(null);

  // Load autofill data on initial component mount, works once
  useEffect(() => {
    const sampleData = require(`/assets/data/${dataSource}`);
    setSamples(sampleData);
  }, [dataSource]);

  // Set selected option to the chosen option whenever the options is chosen
  const fillChangeHandler = (event) => {
    if (previousSelection.current)
      previousSelection.current.setAttribute("aria-selected", false);
    event.target.setAttribute("aria-selected", true);
    previousSelection.current = event.target;
    fillHandle(event.target.value);
  };

  return [samples, fillChangeHandler];
};

export default useAutoFill;
