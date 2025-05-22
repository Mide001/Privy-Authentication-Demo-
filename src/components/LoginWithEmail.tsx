"use client";

import { useState } from "react";
import { useLoginWithEmail } from "@privy-io/react-auth";

export default function LoginWithEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const { sendCode, loginWithCode } = useLoginWithEmail();

  return (
    <div>
      <input onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
      <button onClick={() => sendCode({ email })}>Send Code</button>
      <input onChange={(e) => setCode(e.currentTarget.value)} value={code} />
      <button onClick={() => loginWithCode({ code })}>Login</button>
    </div>
  );
}
