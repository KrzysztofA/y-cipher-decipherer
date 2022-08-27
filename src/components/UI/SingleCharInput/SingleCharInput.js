import React, { useRef } from 'react';

import styles from './SingleCharInput.module.css'

const SingleCharInput = (props) => {
    return ( 
        <input
            className={styles.single}
            type="text"
            maxLength={1}
            onChange={props.onChange}
            value={props.value}
            id={props.id}
            placeholder={props.placeholder}
        />
    );
};

export default SingleCharInput;