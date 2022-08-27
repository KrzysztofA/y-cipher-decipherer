import React, { useState } from "react";

import styles from './Tab.module.css';

export default function Tab(props) {
    return (
        <div 
            className={[props.className, styles.tab].join(' ')}
            onClick={props.onClick}
            tabIndex="0"
        >
            {props.children}
        </div>
    );
}