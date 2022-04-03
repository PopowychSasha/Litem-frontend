import axios from "axios";

import styles from "./SignInForm.module.scss";
import people from "./people.png";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authCtx";
import { toast, ToastContainer } from "react-toastify";

const SignInForm = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  
  const onChangeNameHandler = (e) => setNickname(e.target.value);
  const onChangePasswordHandler = (e) => setPassword(e.target.value);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (nickname.trim() === "" && password.trim() === "") {
      toast.warning("Nickname and password are not filled");
      return;
    } else if (nickname.trim() === "") {
      toast.warning("Nickname are not filled");
      return;
    } else if (password.trim() === "") {
      toast.warning("Password are not filled");
      return;
    }
    axios
      .post("/api/auth/login", {
        nickname: nickname,
        password: password,
      })
      .then(({ data }) => {
        authCtx.logIn(data[1], data[2]);
        setNickname("");
        setPassword("");
        navigate("/chats");
      })
      .catch(() => {
        toast.error("Name or password is incorrect");
      });
  };
  return (
    <div className={styles["form-wrapper"]}>
      <img className={styles.icon} src={people} alt="" />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div class="row">
        <form onSubmit={onSubmitHandler}>
          <div>
            <div class="input-field col s6">
              <i class="material-icons prefix" style={{ color: "#FFFFFF" }}>
                account_circle
              </i>
              <input
                id="icon_prefix"
                type="text"
                class="validate"
                style={{ width: "400px", color: "white" }}
                value={nickname}
                onChange={onChangeNameHandler}
              />
              <label for="icon_prefix" style={{ color: "#FFFFFF" }}>
                Name
              </label>
            </div>
          </div>
          <div>
            <div class="input-field col s12">
              <i
                class="medium material-icons prefix"
                style={{ color: "#FFFFFF" }}
              >
                lock_outline
              </i>
              <input
                id="password"
                type="password"
                class="validate"
                value={password}
                onChange={onChangePasswordHandler}
              />
              <label for="password" style={{ color: "#FFFFFF" }}>
                Password
              </label>
            </div>
          </div>
          <div class="input-field col s12">
            <div className={styles["submit-link-wrapper"]}>
              <input
                className={styles["submit-btn"]}
                type="submit"
                value="Sign in"
              />
              <div className={styles["link-to-signup"]}>
                Not a member?{" "}
                <span>
                  <NavLink to="/auth/register">Sign up</NavLink>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
