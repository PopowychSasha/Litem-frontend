import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SignUpForm.module.scss";
import people from "./people.png";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AuthContext from "../../../context/authCtx";

const SignUpForm = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeNicknameHandler = (e) => setNickname(e.target.value);
  const onChangeEmailHandler = (e) => setEmail(e.target.value);
  const onChangePhoneNumberHandler = (e) => setPhoneNumber(e.target.value);
  const onChangePasswordHandler = (e) => setPassword(e.target.value);
  const onChangeConfirmPasswordHandler = (e) =>
    setConfirmPassword(e.target.value);

  const authCtx = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      nickname.trim() === "" ||
      email.trim() === "" ||
      phoneNumber.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      toast.warning("All fields must be filled");
      return;
    } else if (password !== confirmPassword) {
      toast.warning("Passwords must match");
      return;
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/
      )
    ) {
      toast.warning("Incorrect email format");
      return;
    } else if (!phoneNumber.match(/^[+][0-9]{12}$/)) {
      toast.warning("Incorrect phone number format");
      return;
    } else if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      toast.warning(
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    } else if (!nickname.match(/[а-яА-Яa-zA-Z]/)) {
      toast.warning("The nickname must have at least one letter");
      return;
    }

    axios
      .post("http://localhost:5000/api/auth/register", {
        nickname: nickname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      })
      .then(({ data }) => {
        console.log(data);
        console.log(data[0]);
        console.log(data[1]);

        authCtx.logIn(data[1], data[2]);
        toast.success("You filled all correct. Super!");
        setNickname("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch(() => {
        toast.error("User with this nickname already exist");
      });
  };
  return (
    <div className={styles["form-wrapper"]}>
      <img className={styles.icon} src={people} alt="" width="200px" />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <div class="row">
        <form onSubmit={onSubmitHandler}>
          <div class="input-field col s12">
            <i
              class="medium material-icons prefix"
              style={{ color: "#FFFFFF" }}
            >
              account_circle
            </i>
            <input
              id="icon_prefix"
              type="text"
              class="validate"
              value={nickname}
              style={{ color: "#FFFFFF" }}
              onChange={onChangeNicknameHandler}
            />
            <label for="icon_prefix" style={{ color: "#FFFFFF" }}>
              NickName
            </label>
          </div>

          <div class="input-field col s12">
            <i
              class="medium material-icons prefix"
              style={{ color: "#FFFFFF" }}
            >
              email
            </i>
            <input
              id="email_prefix"
              type="text"
              class="validate"
              value={email}
              style={{ color: "#FFFFFF" }}
              onChange={onChangeEmailHandler}
            />
            <label for="email_prefix" style={{ color: "#FFFFFF" }}>
              Email
            </label>
          </div>

          <div class="input-field col s12">
            <i
              class="medium material-icons prefix"
              style={{ color: "#FFFFFF" }}
            >
              smartphone
            </i>
            <input
              id="phone_prefix"
              type="text"
              class="validate"
              value={phoneNumber}
              style={{ color: "#FFFFFF" }}
              onChange={onChangePhoneNumberHandler}
            />
            <label for="phone_prefix" style={{ color: "#FFFFFF" }}>
              Phone number
            </label>
          </div>

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

          <div class="input-field col s12">
            <i
              class="medium material-icons prefix"
              style={{ color: "#FFFFFF" }}
            >
              lock_outline
            </i>
            <input
              id="confirmPassword"
              type="password"
              class="validate"
              value={confirmPassword}
              onChange={onChangeConfirmPasswordHandler}
            />
            <label for="confirmPassword" style={{ color: "#FFFFFF" }}>
              Confirm password
            </label>
          </div>

          <div class="input-field col s12">
            <div className={styles["submit-link-wrapper"]}>
              <input
                className={styles["submit-btn"]}
                type="submit"
                value="Sign up"
              />
              <div className={styles["link-to-signup"]}>
                Is a member?{" "}
                <span>
                  <NavLink to="/auth/login">Sign in</NavLink>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
