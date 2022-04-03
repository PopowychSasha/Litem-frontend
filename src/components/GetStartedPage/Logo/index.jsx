import styles from "./Logo.module.scss";
import logo from "./logo.ico";
import GetStartedBtn from "../GetStartedBtn";

const Logo = () => {
  return (
    <div className={styles["logo-wrapper"]}>
      <img className={styles.logo} src={logo} alt="logo" />
      <div className={styles["project-name"]}>Litem Messanger</div>
      <GetStartedBtn />
    </div>
  );
};

export default Logo;
