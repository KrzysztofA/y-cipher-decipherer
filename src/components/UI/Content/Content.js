import styles from './Content.module.css';

// Default content wrapper with grid

export default function Content({...props}) {
    return (
        <main className={styles.content}>
            {props.children}
        </main>
    );
}