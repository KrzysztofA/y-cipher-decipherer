import React, { useState,  useEffect, useReducer } from 'react';

import TextInput from '../UI/TextInput/TextInput';
import AutoFill from '../AutoFill/AutoFill';
import Submit from '../UI/SubmitButton/Submit'; 

import { URL, errorMsgs, RAILENDPOINT } from '../../Constants';

import styles from './Form.module.css';

const codeReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.length > 2,
        };
    }
    else if(action.type === 'AUTO_FILL') {
        return {
            value: action.val,
            isValid: true,
        };
    }
    return {
        value: '',
        isValid: true,
    };
};

export default function CaesarForm(props) {
    const [rails, setRails] = useState(1);
    const [codeError, setCodeError] = useState('');
    const [submitError, setSubmitError] = useState('');

    const [codeState, dispatchCode] = useReducer(codeReducer, {
        value: '',
        isValid: true,
    });

    useEffect(() => {
        const codeTimeout = setTimeout(() => {
            if(!codeState.isValid) {
                setCodeError(errorMsgs.MinTwo);
            }
            else {
                setCodeError("");
            }
        }, 500);
        return () => {
            clearTimeout(codeTimeout);
        };
    }, [codeState.isValid]);

    const codeChangeHandler = (ev) => {
        dispatchCode({
            type: "USER_INPUT",
            val: ev.target.value,
        });
    };

    const railsChangeHandler = (ev) => {
        setRails(ev.target.value);
    };

    const fillChangeHandler = (value) => {
        if(value !== ' ') {
            const lastIdx = value.lastIndexOf(',');
            let valList = [];
            valList.push(value.slice(0, lastIdx));
            valList.push(value.slice(lastIdx + 1));
            dispatchCode({
                type: 'AUTO_FILL', 
                val: valList[0]
            });
            setRails(parseInt(valList[1]));
        }
        else {
            dispatchCode({
                type: 'AUTO_FILL', 
                val: ""
            });
            setRails(parseInt(2));
        }
    };   

    const submitCaesarHandler = (ev) => {
        ev.preventDefault();
        if(!codeState.isValid) {
            setSubmitError(errorMsgs.SubmitCorr);
            return;
        }
        setSubmitError("");
        const query = {
            code: codeState.value,
            rails: rails
        }
        fetch(`${URL}${RAILENDPOINT}?${new URLSearchParams(query)}`)
        .then(res => {
                if(res.status !== 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then((json) => {
            props.setOutput([{message: json.message}]);
        }).catch(err => setSubmitError(err.message));
    }

    return (
        <form onSubmit={submitCaesarHandler}>
            <ul className={styles.formList}>
                <li className={styles.codeInput}>
                    <TextInput 
                        id="code"
                        onChange={codeChangeHandler}
                        value={codeState.value}
                        placeholder="Enter coded text"
                    />
                    <div className={styles.errorMessage}>
                        {codeError}
                    </div>
                </li>
                <li className={styles.numberInput}>
                    <label htmlFor="rails">No. of Rails: </label>
                    <input 
                        type="number" 
                        min="2" 
                        max="9999" 
                        value={rails} 
                        id="rails"
                        onChange={railsChangeHandler}
                    />
                </li>
                <li className={styles.choices}>
                    <AutoFill
                        dataSource="./samplesRail.json"
                        changeHandler={fillChangeHandler}
                    />
                    <Submit/>
                </li>
                <div className={styles.errorMessage}>
                    {submitError}
                </div>
            </ul>
        </form>
    );
}