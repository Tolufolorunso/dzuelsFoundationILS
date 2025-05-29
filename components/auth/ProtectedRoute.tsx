import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

import useAuthStore from '@/store/auth.store';
import FullLoadingActivityIndicator from '../shared/FullLoadingActivityIndicator';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, token, isCheckingAuth } = useAuthStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && !user && !token) {
      router.replace('/(auth)/login');
    }
  }, [user, token, isCheckingAuth]);

  if (isCheckingAuth || !user || !token) {
    return <FullLoadingActivityIndicator />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
