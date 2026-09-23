import type { ReactNode } from 'react';
import { Document } from '@/components/shell';
export default function RootLayout({ children }: { children: ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
