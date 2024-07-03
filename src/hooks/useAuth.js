import React, { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignup = async (email, password, name) => {
    setError(null);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const user = signUpData?.user;

    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name: name })
        .eq('id', user.id);

      if (profileError) {
        setError(profileError.message);
      } else {
        router.push('/learnings').then(() => router.reload());
      }
    }
  };

  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/learnings').then(() => router.reload());
    }
  };

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.reload();
  };

  return {
    handleSignup,
    handleLogin,
    handleSignout,
    error,
  }
}

export default useAuth