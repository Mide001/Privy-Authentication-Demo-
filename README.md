# Privy Authentication Demo

## Implementation Guide

### 1. Set Up Privy Provider

Create a `Providers.tsx` component to wrap your application:

```tsx
// src/Providers.tsx
import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#2563eb',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
```

Add the provider to your root layout:

```tsx
// src/app/layout.tsx
import Providers from '@/Providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### 2. Create Login Page

```tsx
// src/app/page.tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { login, authenticated, ready } = usePrivy();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/dashboard");
    }
  }, [ready, authenticated, router]);

  if (!mounted || !ready) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <button onClick={login}>
        Sign in with Email or Wallet
      </button>
    </main>
  );
}
```

### 3. Create Protected Dashboard

```tsx
// src/app/dashboard/page.tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { authenticated, ready, user, logout } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav>
        <h1>Dashboard</h1>
        <button onClick={logout}>Sign Out</button>
      </nav>

      <main>
        <div>
          <h2>Welcome to your Dashboard</h2>
          <p>Signed in as: {user?.email?.address || user?.wallet?.address}</p>
          
          {user?.wallet && (
            <div>
              <h3>Your Wallet</h3>
              <p>Address: {user.wallet.address}</p>
              <p>Type: {user.wallet.walletClientType}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

## Key Concepts

### Authentication State
Use the `usePrivy` hook to access authentication state and methods:
```tsx
const { login, logout, authenticated, ready, user } = usePrivy();
```

### Protected Routes
Protect routes by checking authentication status and redirecting:
```tsx
useEffect(() => {
  if (ready && !authenticated) {
    router.push('/');
  }
}, [ready, authenticated, router]);
```

### User Information
Access user data through the `user` object:
```tsx
// Email
user?.email?.address

// Wallet
user?.wallet?.address
user?.wallet?.walletClientType
```

## Best Practices

1. **Client Components**: Use "use client" directive for components that use Privy hooks
2. **Loading States**: Always check `ready` state before rendering
3. **Hydration**: Use `suppressHydrationWarning` to prevent hydration warnings
4. **Error Handling**: Implement proper error handling for authentication failures

## Resources

- [Privy Documentation](https://docs.privy.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
