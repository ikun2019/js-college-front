import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useAuthSesseion = () => {
  const supabase = useSupabaseClient();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: user } = await supabase.auth.getSession();
      const session = user.session;
      setSession(session);
      setLoading(false);
    };
    getSession();
  }, [supabase]);

  console.log('session =>', session);
  return {
    session,
    loading
  }
};

export default useAuthSesseion;