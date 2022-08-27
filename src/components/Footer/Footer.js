import React from 'react';

import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            Copyright &#169; Krzysztof Siatkowski, check out my portfolio <a href="#">here</a>
        </footer>
    )
}