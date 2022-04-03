import styles from "./Logo.module.scss";
import logo from "./logo.ico";
import user from "./user.png";
import userlaptop from "./laptop2.jpg";

const Logo = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["logo-wrapper"]}>
        <img className={styles["logo"]} src={logo} alt="logo" />
        <div className={styles["title"]}>Litem</div>
      </div>
      <img className={styles["user"]} src={user} alt="laptop" />
      <img className={styles["userlaptop"]} src={userlaptop} alt="laptop" />
    </div>
  );
};

export default Logo;
