"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './page.module.css';

export default function Home() {
  const { login, authenticated, ready } = usePrivy();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (ready && authenticated) {
      router.push(redirect || "/dashboard");
    }
  }, [ready, authenticated, router, redirect]);

  if (!mounted || !ready) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <button
          onClick={login}
          className={styles.button}
        >
          Sign In
        </button>
      </div>
    </main>
  );
}
