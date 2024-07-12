import { useEffect, useState } from 'react';
import { useSession, useUser } from '@supabase/auth-helpers-react';

const useAuthSession = () => {
  const session = useSession();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('session', session);
    console.log('user', user);

    if (session && user) {
      setLoading(false);
    }
  }, [user, session]);

  return {
    session,
    user,
    loading,
  }
}

export default useAuthSession;