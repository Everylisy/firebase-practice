import { signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";
import { authService, provider } from "fbInstance";

const Auth = () => {
  const socialLoginClickHanlder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      const { name } = e.currentTarget;
      if (name === "google") {
        await signInWithPopup(authService, provider);
      }
    } catch (error: any) {
      console.error(
        "Fetch Error:",
        error instanceof Error ? error.message : error,
      );
    }
  };

  return (
    <div>
      <div>
        <AuthForm />
        <button name="google" onClick={socialLoginClickHanlder}>
          구글 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
