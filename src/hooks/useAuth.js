import React, { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [error, setError] = useState(null);

  // * サインアップ
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

  // * Emailログイン
  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/learnings').then(() => router.reload());
    }
  };

  // * Gmailログイン
  const handleGmailLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/learnings`
      }
    });
    if (error) {
      setError(error.message);
    }
  };

  // * GitHubログイン
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/learnings`
      }
    });
    if (error) {
      setError(error.message);
    }
  };

  // * サインアウト
  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.reload();
  };

  // * パスワードリセット
  const handleResetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError(error.message);
    };
  };

  return {
    handleSignup,
    handleGmailLogin,
    handleGitHubLogin,
    handleLogin,
    handleSignout,
    handleResetPassword,
    error,
  }
}

export default useAuth