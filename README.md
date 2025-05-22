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
