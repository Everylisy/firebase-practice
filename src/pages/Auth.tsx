import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { authService, provider } from "fbInstance";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.error(
        "Fetch Error:",
        error instanceof Error ? error.message : error,
      );
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const socialLoginClickHanlder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      const { name } = e.currentTarget;
      if (name === "google") {
        await signInWithPopup(authService, provider);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.error(
        "Fetch Error:",
        error instanceof Error ? error.message : error,
      );
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="이메일 입력"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          required
          autoComplete="current-password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">{newAccount ? "회원가입" : "로그인"}</button>
      </form>

      <span>{errorMsg}</span>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>

      <div>
        <button name="google" onClick={socialLoginClickHanlder}>
          구글 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
