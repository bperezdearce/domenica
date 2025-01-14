import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import { useSelector } from "react-redux";

const NavBar = () => {

    const login = useSelector(state => state.actualUser.userData.login);

    return (
    <div className={styles.navContainer}>
        <div className={styles.logoSection}>
            <Link to="/">
                <img src={logo}/>
            </Link>
        </div>
        <div className={styles.linkSection}>
            <NavLink to="/menu">MENÚ</NavLink>
            <NavLink to="/users/register">REGISTRO</NavLink>
            <NavLink to="/users/login">LOGIN</NavLink>
            {login && (
                <NavLink to="/appointments">MIS RESERVAS</NavLink>
            )}
            {login && (
                <NavLink to="/appointmentsForm">NUEVA RESERVA</NavLink>
            )}

        </div>
        <div className={styles.avatarSection}>
            <img src={avatar} alt="avatar"/>
        </div>
    </div>
)};

export default NavBar;