import styles from "./Footer.module.css";

const Footer = ({ href }) => {
  return (
    <footer className={styles.footer}>
      Copyright &#169; Krzysztof Siatkowski, check out my portfolio{" "}
      <a
        aria-label="Krzysztof Siatkowski Portfolio"
        tabIndex={0}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        here
      </a>
    </footer>
  );
};

export default Footer;
