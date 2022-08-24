import React, { useRef } from 'react';

import { AutoTabProvider } from 'react-auto-tab';

import SingleCharInput from "../UI/SingleCharInput/SingleCharInput";
import TextInput from "../UI/TextInput/TextInput";

import styles from './Form.module.css';

export default function Form() {

    const tabRef = React.createRef();

    return (
        <form>
            <ul className={styles.formList}>
                <li>
                    <TextInput
                        id="code"
                    />
                </li>
                <li>
                    <AutoTabProvider settings={{tabOnMax:true, pasteToFit:true}}>
                    {/* <input
            type="text"
            maxLength={1}
            tabbable="true"
        />
        <input
            type="text"
            maxLength={1}
            tabbable="true"
        />
        <input
            type="text"
            maxLength={1}
            tabbable="true"
        />
        <input
            type="text"
            maxLength={1}
            tabbable="true"
        /> */}
                        <SingleCharInput
                            id="clue#1"
                            ref={tabRef}
                            tabbable="true"
                        />
                        <SingleCharInput
                            id="clue#2"
                            ref={tabRef}
                            tabbable="true"
                        />
                        <SingleCharInput
                            id="clue#3"
                            ref={tabRef}
                            tabbable="true"
                        />
                        <SingleCharInput
                            id="clue#4"
                            ref={tabRef}
                            tabbable="true"
                        />
                    </AutoTabProvider>
                </li>
            </ul>
        </form>
    );
};