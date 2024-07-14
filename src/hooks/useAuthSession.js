import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSession, useUser } from '@supabase/auth-helpers-react';

const useAuthSession = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('access_token');
      if (!token) {
        setLoading(false);
        return;
      }
      setSession(token);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.error);
          setProfile(null);
          setUser(null);
        } else {
          setProfile(data.profile);
          setUser(data.user);
        }
      } catch (error) {
        setError(error.message);
        setProfile(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);


  return {
    session,
    user,
    profile,
    loading,
    error,
  }
}

export default useAuthSession;