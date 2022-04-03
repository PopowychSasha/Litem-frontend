import SignUpForm from "../../components/SignUpFormPage/SignUpForm";
import styles from "./SignUpFormPage.module.scss";

const SignUpFormPage = () => {
  return (
    <div className={styles["wrapper"]}>
      <SignUpForm />
    </div>
  );
};

export default SignUpFormPage;
