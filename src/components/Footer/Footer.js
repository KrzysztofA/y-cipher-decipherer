import styles from "./Footer.module.css";

const Footer = ({ href }) => {
	return (
		<footer className={styles.footer}>
			Copyright &#169; Krzysztof Siatkowski, check out my portfolio{" "}
			<a
				href={href}
				target="_blank"
				rel="noreferrer"
			>
				here
			</a>
		</footer>
	);
};

export default Footer;
