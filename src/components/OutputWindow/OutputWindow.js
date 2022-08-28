import React, { useEffect } from "react";

import styles from "./OutputWindow.module.css"

export default function OutputWindow(props) {
    useEffect(() => {
        if(props.output) {
        }
    }, [props.output]);

    return (<>
        <div className={styles.window}>
            {props.output?.map((el, i) => {
                if(el.decodedMsg) {
                    return <div key={`line${i}`} className={styles.line}>{el.decodedMsg}</div>
                }
                else if(el.message) {
                    return <div key={`line${i}`} className={styles.line}>{el.message}</div>
                }
                else if(el.altMessage) {
                    return <div key={`line${i}`} className={styles.line}>{el.altMessage}</div>
                }
            })}
        </div>
        </>
    )
}