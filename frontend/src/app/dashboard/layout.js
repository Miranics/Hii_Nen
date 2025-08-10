'use client';

import { UserProgressProvider } from '@/contexts/UserProgressContext';

export default function DashboardLayout({ children }) {
  return (
    <UserProgressProvider>
      {children}
    </UserProgressProvider>
  );
}
