import Logo from "../../components/SignInFormPage/Logo";
import SignInForm from "../../components/SignInFormPage/SignInForm";
import styles from "./SignInFormPage.module.scss";

const SignInFormPage = () => {
  return (
    <div className={styles["sign-in-page"]}>
      <Logo />
      <SignInForm />
    </div>
  );
};

export default SignInFormPage;
