import { useContext, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import axios from "axios";
import logo from "./logo.ico";
import user from "./user.png";
import exit from "./exit.jpg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authCtx";

const Header = () => {
  const [acountData, setAccountData] = useState();
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios
      .post("https://litemback.herokuapp.com/api/auth/account", { _id: localStorage.getItem("_id") })
      .then(({ data }) => setAccountData(data));
  }, []);

  return (
    <div className={styles["header"]}>
      <div className={styles["flex-prop"]}>
        <img className={styles["logo"]} src={logo} alt="logo" />
        <div className={styles["title"]}>Litem</div>
      </div>
      {acountData && (
        <div className={styles["flex-prop"]}>
          <div className={styles["wellcome-title"]}>
            Wellcome,{" "}
            <span style={{ fontSize: "20px" }}>{acountData.nickname} !!!</span>
          </div>
          <img className={styles["user"]} src={user} alt="logo" />
          <img
            src={exit}
            onClick={() => {
              navigation("/");
              authCtx.logOut();
            }}
            alt=""
            width="50px"
            height="50px"
            style={{
              marginLeft: "75px",
              cursor: "pointer",
              borderRadius: "100%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
