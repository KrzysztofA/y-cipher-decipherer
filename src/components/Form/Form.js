import React, { useState, useEffect } from 'react';

import SingleCharInput from "../UI/SingleCharInput/SingleCharInput";
import TextInput from "../UI/TextInput/TextInput";

import styles from './Form.module.css';

const errorMsgs = {
    MinFour: "Enter minimum four characters",
    InvalidChar: "Only letters from a to z allowed",
};

export default function Form() {
    const [codeInput, setCodeInput] = React.useState("");
    const [errorTextInput, setErrorTextInput] = React.useState("");

    useEffect(() => {

    }, [errorTextInput]);

    const codeInputChangeHandler = (ev) => {
        setCodeInput(ev.target.value);
        console.log(codeInput);
        if(codeInput.length < 4) {
            setErrorTextInput(errorMsgs.MinFour);
        }
        else if(codeInput.match(/([\d]|[^\w])/m) > 0) {
            setErrorTextInput(errorMsgs.InvalidChar);
        }
        else {
            setErrorTextInput("");
        }
    };

    return (
        <form>
            <ul className={styles.formList}>
                <li className={styles.codeInput}>
                    <TextInput 
                        id="code"
                        onChange={codeInputChangeHandler}
                        value={codeInput}
                    />
                    <div className={styles.errorMessage}>
                        {errorTextInput}
                    </div>
                </li>
                <li className={styles.lonelySingles}>
                        <SingleCharInput
                            id="clue#1"
                        />
                        <SingleCharInput
                            id="clue#2"
                        />
                        <SingleCharInput
                            id="clue#3"
                        />
                        <SingleCharInput
                            id="clue#4"
                        />
                        <div className={styles.errorMessage}></div>
                </li>
            </ul>
        </form>
    );
};