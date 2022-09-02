import React, { useState,  useEffect, useReducer } from 'react';

import TextInput from '../UI/TextInput/TextInput';
import AutoFill from '../AutoFill/AutoFill';
import Submit from '../UI/SubmitButton/Submit'; 

import { URL, CAESARENDPOINT, errorMsgs } from '../../Constants';

import styles from './Form.module.css';
import LoadingModal from '../UI/LoadingPortal/LoadingModal';

const codeReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.match(/([\d]|[^\w])/m) == null,
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
    // Shift no. state
    const [shift, setShift] = useState(1);
    
    // Error handling states
    const [codeError, setCodeError] = useState('');
    const [submitError, setSubmitError] = useState('');

    // Loading handler
    const [loading, setLoading] = useState(false);

    // Code input handling dispatcher
    const [codeState, dispatchCode] = useReducer(codeReducer, {
        value: '',
        isValid: true,
    });

    useEffect(() => {
        const codeTimeout = setTimeout(() => {
            if(!codeState.isValid) {
                setCodeError(errorMsgs.InvalidChar);
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

    const shiftChangeHandler = (ev) => {
        setShift(ev.target.value);
    };

    const fillChangeHandler = (value) => {
        if(value !== ' ') {
            let valList = value.split(',');
            dispatchCode({
                type: 'AUTO_FILL', 
                val: valList[0]
            });
            setShift(parseInt(valList[1]));
        }
        else {
            dispatchCode({
                type: 'AUTO_FILL', 
                val: ""
            });
            setShift(parseInt(1));
        }
    };   

    const submitCaesarHandler = (ev) => {
        ev.preventDefault();
        if(!codeState.isValid) {
            setSubmitError(errorMsgs.SubmitCorr);
            return;
        }
        setSubmitError("");
        setLoading(true);
        const query = {
            code: codeState.value,
            shift: shift
        }
        fetch(`${URL}${CAESARENDPOINT}?${new URLSearchParams(query)}`)
        .then(res => {
                setLoading(false);
                if(res.status !== 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then((json) => {
            props.setOutput([{message: json.message},{altMessage: json.altMessage }]);
        }).catch(err => setSubmitError(err.message));
    }

    return (<>
        {loading && <LoadingModal/>}
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
                    <label htmlFor="shift">Shift Value: </label>
                    <input 
                        type="number" 
                        min="1" 
                        max="25" 
                        value={shift} 
                        id="shift"
                        onChange={shiftChangeHandler}
                    />
                </li>
                <li className={styles.choices}>
                    <AutoFill
                        dataSource="./samplesCaesar.json"
                        changeHandler={fillChangeHandler}
                    />
                    <Submit/>
                </li>
                <div className={styles.errorMessage}>
                    {submitError}
                </div>
            </ul>
        </form>
    </>);
}