import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
    <div className={styles.footerContainer}>
        <div className={styles.linkSection}>
            <Link to="/quienes-somos">QUIENES SOMOS</Link>
            <Link to="/contacto">CONTACTO</Link>
            <Link to="/ubicacion">UBICACIÓN</Link>
        </div>
    </div>
)};

export default Footer;