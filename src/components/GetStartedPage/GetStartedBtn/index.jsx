import { useNavigate } from "react-router-dom";
import styles from "./GetStartedBtn.module.scss";

const GetStartedBtn = () => {
  const navigate = useNavigate();
  const goToSignInFormHandler = () => navigate("/auth/login");
  return (
    <div className={styles["btn"]} onClick={goToSignInFormHandler}>
      <div>GetStarted</div>
    </div>
  );
};

export default GetStartedBtn;
