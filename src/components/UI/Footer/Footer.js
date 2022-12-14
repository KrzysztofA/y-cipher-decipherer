import styles from "./Footer.module.css";

const Footer = ({ href }) => {
  return (
    <footer className={styles.footer}>
      Copyright &#169; Krzysztof Siatkowski, check out my portfolio{" "}
      <a href={href} target="blank">
        here
      </a>
    </footer>
  );
};

export default Footer;
