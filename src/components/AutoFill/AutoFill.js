import React, { useState, useEffect } from "react";

import styles from './AutoFill.module.css';

export default function AutoFill(props) {
    /* 
        Holds a collection of samples to use with the given cipher
        Data fetched from a single json file ideally passed by props.
        Data is divided into code and clue, where clue could be clue phrase,
        but also number of rails or number of letters shifted.
    */
    const [samples, setSamples] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    // Load data on initial component mount, works once 
    useEffect(() => {
        const sampleData = require(`${props.dataSource}`);
        setSamples(sampleData);
    }, [props.dataSource]);

    // Set selected option to the chosen option whenever the options is chosen 
    const fillChangeHandler = (ev) => {
        setSelectedOption(ev.target.value);
    };
    
    // On select change send this data to be set for the inputs, works whenever options is chosen, doesn't work on mount
    useEffect(() => {
        if(selectedOption) {
            props.changeHandler(selectedOption);
        }
    }, [selectedOption]);

    return (
        <select className={styles.autoFill} onChange={fillChangeHandler}>
            <option value=" " defaultValue>
                Select Sample
            </option>
            {
                samples?.map((x, i) => {
                    return (<option 
                        className={styles.sample} 
                        key={["option", i+1].join("")} 
                        value={`${[x.code.toUpperCase(), x.clue.toUpperCase()].join(",")}`}
                    >
                        {x.code.toUpperCase()}, {x.clue.toUpperCase()}
                    </option>);
                })
            }
        </select>
    );
}