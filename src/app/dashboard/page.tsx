"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from './page.module.css';

export default function Dashboard() {
  const { authenticated, ready, user, logout } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      // If user is not authenticated, redirect them to login
      router.push('/');
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.navBar}>
            <div className={styles.navTitle}>
              <h1>Dashboard</h1>
            </div>
            <div className={styles.navActions}>
              <button
                onClick={logout}
                className={styles.logoutButton}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Welcome to your Dashboard</h2>
            <div className={styles.cardContent}>
              <p className={styles.userInfo}>
                You are signed in as: {user?.email?.address || user?.wallet?.address}
              </p>
              
              <div className={styles.walletSection}>
                <h3 className={styles.walletTitle}>Your Wallet</h3>
                {user?.wallet && (
                  <div className={styles.walletContainer}>
                    <div className={styles.walletInfo}>
                      <p>Address: {user.wallet.address}</p>
                      <p>Type: {user.wallet.walletClientType}</p>
                    </div>
                
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 