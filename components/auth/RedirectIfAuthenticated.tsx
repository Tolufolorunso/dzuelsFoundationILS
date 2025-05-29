import useAuthStore from '@/store/auth.store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import FullLoadingActivityIndicator from '../shared/FullLoadingActivityIndicator';

interface Props {
  children: React.ReactNode;
}

export function RedirectIfAuthenticated({ children }: Props) {
  const { token, isCheckingAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && token) {
      router.replace('/(tabs)');
    }
  }, [token, isCheckingAuth]);

  if (isCheckingAuth) {
    return <FullLoadingActivityIndicator />;
  }

  return <>{children}</>;
}
