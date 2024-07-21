import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaesClient';
// import { useSession, useUser } from '@supabase/auth-helpers-react';

const useAuthSession = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    setLoading(true);
    if (!session) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) {
        throw new Error('プロフィールの取得ができませんでした。');
      };
      const data = await response.json();
      setProfile(data.profile);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const supabaseSession = await supabase.auth.getSession();
      if (supabaseSession) {
        setSession(supabaseSession);
        setUser(supabaseSession.user);
        fetchUserProfile();
      } else {
        setLoading(false);
      }
      const { data: authListener } = await supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session) {
          fetchUserProfile();
        }
      });

      return () => {
        authListener.unsubscribe();
      };
    })();
  }, []);


  return {
    session,
    user,
    loading,
    profile,
    error,
    fetchUserProfile,
  }
}

export default useAuthSession;