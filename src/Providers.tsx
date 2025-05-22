"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID || !process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID) {
    throw new Error('Missing required environment variables for Privy');
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID}
      config={{
        loginMethods: ['email', 'wallet'],
        defaultChain: baseSepolia,
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
