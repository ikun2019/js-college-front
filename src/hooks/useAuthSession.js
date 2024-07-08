import { useSession, useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

const useAuthSesseion = () => {
  const session = useSession();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      setLoading(false);
    }
  }, [session]);

  return {
    session,
    user,
    loading,
  }
};

export default useAuthSesseion;