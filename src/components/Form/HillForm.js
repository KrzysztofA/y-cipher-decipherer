import React, { useState, useEffect } from 'react';

import SingleCharInput from "../UI/SingleCharInput/SingleCharInput";
import Submit from '../UI/SubmitButton/Submit';
import TextInput from "../UI/TextInput/TextInput";
import AutoFill from '../AutoFill/AutoFill';

import styles from './Form.module.css';

const errorMsgs = {
    MinFour: "Enter minimum four characters",
    InvalidChar: "Only letters from a to z allowed",
};

export default function HillForm() {
    const [codeInput, setCodeInput] = React.useState("");
    const [errorTextInput, setErrorTextInput] = React.useState("");
    const [clueInput, setClueInput] = React.useState(["", "", "", ""]);
    const [errorClueInput, setErrorClueInput] = React.useState("");

    useEffect(() => {
        if(codeInput) {
            if(codeInput.length < 4) {
                setErrorTextInput(errorMsgs.MinFour);
            }
            else if(codeInput.match(/([\d]|[^\w])/m) != null) {
                setErrorTextInput(errorMsgs.InvalidChar);
            }
            else {
                setErrorTextInput("");
            }
        }
    }, [codeInput]);

    useEffect(() => {
        if(clueInput.some(el => el.length > 0)) {
            
            if(clueInput.some(el => el?.match(/([\d]|[^\w])/m) != null)) {
                setErrorClueInput(errorMsgs.InvalidChar);
            }
            else {
                setErrorClueInput("");
            }
        }
    }, [clueInput]);

    const codeInputChangeHandler = (ev) => {
        setCodeInput(ev.target.value);
    };

    const clue1Change = (ev) => {
        setClueInput(clueInput.map((el, i) => i === 0 ? ev.target.value : el ));
    }

    const clue2Change = (ev) => {
        setClueInput(clueInput.map((el, i) => i === 1 ? ev.target.value : el ));
    }

    const clue3Change = (ev) => {
        setClueInput(clueInput.map((el, i) => i === 2 ? ev.target.value : el ));
    }

    const clue4Change = (ev) => {
        setClueInput(clueInput.map((el, i) => i === 3 ? ev.target.value : el ));
    }

    const fillChangeHandler = (value) => {
        let valList = value.split(',');
        valList[1] = valList[1].split('');
        setCodeInput(valList[0]);
        setClueInput(clueInput.map((x, i) => valList[1][i] ? valList[1][i] : ""));
    };   

    return (
        <form>
            <ul className={styles.formList}>
                <li className={styles.codeInput}>
                    <TextInput 
                        id="code"
                        onChange={codeInputChangeHandler}
                        value={codeInput}
                        placeholder="Enter coded text"
                    />
                    <div className={styles.errorMessage}>
                        {errorTextInput}
                    </div>
                </li>
                <li className={styles.lonelySingles}>
                        <SingleCharInput
                            id="clue#1"
                            placeholder="C"
                            value={clueInput[0]}
                            onChange={clue1Change}
                        />
                        <SingleCharInput
                            id="clue#2"
                            placeholder="L"
                            value={clueInput[1]}
                            onChange={clue2Change}
                        />
                        <SingleCharInput
                            id="clue#3"
                            placeholder="U"
                            value={clueInput[2]}
                            onChange={clue3Change}
                        />
                        <SingleCharInput
                            id="clue#4"
                            placeholder="E"
                            value={clueInput[3]}
                            onChange={clue4Change}
                        />
                </li>
                        <div className={styles.errorMessage}>
                            {errorClueInput}
                        </div>
                <li className={styles.choices}>
                    <AutoFill
                        dataSource="./samplesHill.json"
                        changeHandler={fillChangeHandler}
                    />
                    <Submit/>
                </li>
            </ul>
        </form>
    );
};