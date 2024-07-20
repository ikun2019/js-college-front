import { useEffect, useState } from 'react';
import { useSession, useUser } from '@supabase/auth-helpers-react';

const useAuthSession = () => {
  const session = useSession();
  const user = useUser();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
    const fetchUserProfile = async () => {
      if (!session) {
        setLoading(true);
        return;
      }
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

      console.log(data.profile);
      setProfile(data.profile);
    };
    fetchUserProfile();
  }, [session, user]);


  return {
    session,
    user,
    loading,
    profile,
    error,
  }
}

export default useAuthSession;