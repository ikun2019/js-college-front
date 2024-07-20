import { useEffect, useState } from 'react';
import { useSession, useUser } from '@supabase/auth-helpers-react';

const useAuthSession = () => {
  const session = useSession();
  const user = useUser();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
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
    if (session) {
      setLoading(true);
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [session]);


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