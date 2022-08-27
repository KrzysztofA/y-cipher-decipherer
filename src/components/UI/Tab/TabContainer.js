import Tab from "./Tab";

import styles from './Tab.module.css';

export default function TabContainer(props) {
    const handleHillOnClick = () => {
        props.setActiveTab(0);
    }
    const handleCaesarOnClick = () => {
        props.setActiveTab(1);
    }
    const handleRailOnClick = () => {
        props.setActiveTab(2);
    }

    return (
        <nav className={styles.tabContainer}>
            <Tab 
                className={`${props.activeTab === 0 ? styles.active : ''}`} 
                onClick={props.activeTab === 0 ? null : handleHillOnClick}>
                    Hill Cipher
            </Tab>
            <Tab 
                className={`${props.activeTab === 1 ? styles.active : ''}`} 
                onClick={props.activeTab === 1 ? null : handleCaesarOnClick}>
                    Caesar Cipher
                </Tab>
            <Tab 
                className={`${props.activeTab === 2 ? styles.active : ''}`} 
                onClick={props.activeTab === 2 ? null : handleRailOnClick}>
                    Rail Cipher
                </Tab>
        </nav>
    );
}