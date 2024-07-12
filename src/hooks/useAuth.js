import React, { useState } from 'react'
import { useRouter } from 'next/router';

import supabase from '@/lib/supabaesClient';

const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  // * サインアップ
  const handleSignup = async (email, password, name) => {
    setError(null);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { displayName: name }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    router.push('/learnings').then(() => router.reload());

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
  const handleSignin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/learnings').then(() => router.reload());
    }
  };

  // * Gmailログイン
  const handleGmailSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
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
  const handleGitHubSignin = async () => {
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
    handleGmailSignin,
    handleGitHubSignin,
    handleSignin,
    handleSignout,
    handleResetPassword,
    error,
  }
}

export default useAuth