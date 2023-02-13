import { useState, useEffect, useContext } from "react";
import FormContext from "../../hooks/context/FormContext";

import styles from "./AutoFill.module.css";

const AutoFill = () => {
  /* 
        Holds a collection of samples to use with the given cipher
        Data fetched from a single json file ideally passed by props.
        Data is divided into code and clue, where clue could be clue phrase,
        but also number of rails or number of letters shifted.
    */
  const [samples, setSamples] = useState(null);

  const { dataSource, fillHandle } = useContext(FormContext);

  // Load data on initial component mount, works once
  useEffect(() => {
    const sampleData = require(`/assets/data/${dataSource}`);
    setSamples(sampleData);
  }, [dataSource]);

  // Set selected option to the chosen option whenever the options is chosen
  const fillChangeHandler = (event) => {
    fillHandle(event.target.value);
  };

  return (
    <select
      className={styles.autoFill}
      onChange={fillChangeHandler}
    >
      <option
        value=" "
        defaultValue
      >
        Select Sample
      </option>
      {samples?.map((x, i) => {
        return (
          <option
            className={styles.sample}
            key={["option", i + 1].join("")}
            value={`${[x.code.toUpperCase(), x.clue.toUpperCase()].join(",")}`}
          >
            {x.code.toUpperCase()}, {x.clue.toUpperCase()}
          </option>
        );
      })}
    </select>
  );
};

export default AutoFill;
