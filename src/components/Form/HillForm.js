import React, { useState, useEffect, useReducer } from 'react';

import ClueInput from "../ClueInput/ClueInput";
import Submit from '../UI/SubmitButton/Submit';
import TextInput from "../UI/TextInput/TextInput";
import AutoFill from '../AutoFill/AutoFill';

import { URL, HILLENDPOINT, errorMsgs } from '../../Constants';

import styles from './Form.module.css';

const codeReducer = (state, action) => {
    /* Function containing coded text input logic, validates whether code has 
     more than 4 characters and contains only valid letters */

    // Validates on user input
    if(action.type === 'USER_INPUT') {
        const checkFour = action.val.length < 4;
        const checkValidIpt = action.val.match(/([\d]|[^\w])/m) != null;
        const checkValid = !checkValidIpt && !checkFour;
        return { 
            value: action.val,
            fourMore: checkFour,
            nonValidIpt: checkValidIpt,
            isValid: checkValid,
        }
    }
    // Doesn't have to validate on auto fill
    else if(action.type === 'AUTO_FILL') {
        return { 
            value: action.val,
            fourMore: false,
            nonValidIpt: false,
            isValid: true,
        }
    }
    // Default values
    return { 
        value: '', 
        fourMore: true, 
        nonValidIpt: false, 
        isValid: true,
    };
};

const clueReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: (action.val.some(el => el.length > 0) && !action.val.some(el => el?.match(/([\d]|[^\w])/m) != null)) || action.val.forEach(el => el.length === 0),
        }
    }
    else if(action.type === 'AUTO_FILL') {
        return {
            value: action.val,
            isValid: true,
        }
    }
    // Default Values
    return {
        value: ['', '', '', ''],
        isValid: true,
    }
}



export default function HillForm(props) {
    /* Function containing the form and logic behind the form for the hill cipher
     decoding. */

    // States for the Error Messages
    const [errorTextInput, setErrorTextInput] = useState("");
    const [errorClueInput, setErrorClueInput] = useState("");
    const [errorSubmit, setErrorSubmit] = useState("");
    
    // Reducer for the code input and clue input
    const [clueState, dispatchClue] = useReducer(clueReducer, {
        value: ["", "", "", ""],
        isValid: true,
    })
    const [codeState, dispatchCode] = useReducer(codeReducer, {
        value: '',
        isValid: true,
        fourMore: true,
        nonValidIpt: false,
    });

    useEffect(() => {
        const clueTimeout = setTimeout(() => {
            setErrorClueInput(clueState.isValid ? "" : errorMsgs.InvalidChar);
        }, 500);
        return () => { clearTimeout(clueTimeout); };
    }, [clueState.isValid]);

    useEffect(() => {
        const codeTimeout = setTimeout(() => {
            if(!codeState.isValid) {
                setErrorTextInput(
                    codeState.fourMore ? errorMsgs.MinFour 
                    : errorMsgs.InvalidChar 
                );
            }
            else {
                setErrorTextInput("");
            }
        }, 500);
        return () => { clearTimeout(codeTimeout); }
    }, [codeState.isValid, codeState.fourMore])

    const codeInputChangeHandler = (ev) => {
        dispatchCode({
            type: 'USER_INPUT', 
            val: ev.target.value
        });
    };

    const fillChangeHandler = (value) => {
        if(value !== ' ') {
            let valList = value.split(',');
            valList[1] = valList[1].split('');
            dispatchCode({
                type: 'AUTO_FILL', 
                val: valList[0]
            });
            dispatchClue({
                type: 'AUTO_FILL',
                val: clueState.value.map((x, i) => valList[1][i] ? valList[1][i] : "")
            });
        }
        else {
            dispatchCode({
                type: 'AUTO_FILL', 
                val: ""
            });
            dispatchClue({
                type: 'AUTO_FILL',
                val: ["", "", "", ""],
        });
    }};   

    const submitHillHandler = (ev) => {
        ev.preventDefault();
        if(!codeState.isValid || !clueState.isValid) {
            setErrorSubmit(errorMsgs.SubmitCorr);
            return;
        }
        setErrorSubmit("");
        const query = {
            code: codeState.value,
            clue: clueState.value.map((el) => el ? el : "_").join("")
        }
        fetch(`${URL}${HILLENDPOINT}?${new URLSearchParams(query)}`)
        .then(res => {
                if(res.status !== 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then((json) => {
            props.setOutput(json.possibleMessages);
        }).catch(err => setErrorSubmit(err.message));
    }

    return (
        <form onSubmit={submitHillHandler}>
            <ul className={styles.formList}>
                <li className={styles.codeInput}>
                    <TextInput 
                        id="code"
                        onChange={codeInputChangeHandler}
                        value={codeState.value}
                        placeholder="Enter coded text"
                    />
                    <div className={styles.errorMessage}>
                        {errorTextInput}
                    </div>
                </li>
                <li>
                    <ClueInput
                        value={clueState.value}
                        dispatchClue={dispatchClue}
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
                <div className={styles.errorMessage}>
                    {errorSubmit}
                </div>
            </ul>
        </form>
    );
};