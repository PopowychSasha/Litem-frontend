import styles from "./GetStartedPage.module.scss";

import Logo from "../../components/GetStartedPage/Logo";
import FirstAppScreen from "./first-app-screen.png";
import SecondAppScreen from "./second-app-screen.png";

const GetStartedPage = () => {
  return (
    <div className={styles["page-wrapper"]}>
      <Logo />

      <div className={styles["screen-wrapper"]}>
        <img
          className={styles["first-screen"]}
          src={FirstAppScreen}
          alt="screen"
        />
        <img
          className={styles["second-screen"]}
          src={SecondAppScreen}
          alt="screen"
        />
      </div>
    </div>
  );
};

export default GetStartedPage;
