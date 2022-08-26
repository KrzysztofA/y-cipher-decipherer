import styles from './TextInput.module.css';

export default function TextInput(props) {
    return ( 
        <input 
            className={styles.textInput}
            type="text"
            maxLength="256"
            id={props.id}
            onChange={props.onChange}
            value={props.value}
        />
    );
};