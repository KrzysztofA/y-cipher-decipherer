import React, { useRef } from 'react';

import styles from './SingleCharInput.module.css'

const SingleCharInput = React.forwardRef((props, ref) => {
    return ( 
        <input
            ref={ref}
            className={styles.single}
            type="text"
            maxLength={1}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            onPaste={props.onPaste}
            id={props.id}
        />
    );
})

export default SingleCharInput;