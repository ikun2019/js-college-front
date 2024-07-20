import React, { useState } from 'react'
import { useRouter } from 'next/router';

import supabase from '@/lib/supabaesClient';

const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // * サインアップ
  const handleSignup = async (email, password, name) => {
    setError(null);
    try {
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { displayName: name }
        }
      });
      if (signupError) {
        setError(signupError.message);
        return;
      }
      setMessage('ユーザーが作成されました。トップページにリダイレクトします。');
      setTimeout(() => {
        router.push('/learnings').then(() => router.reload());
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // * Emailログイン
  const handleSignin = async (email, password) => {
    setError(null);
    try {
      const { error: signinError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (signinError) {
        setError(signinError.message);
        return;
      }
      setMessage('ログインしました');
      router.push('/learnings').then(() => router.reload());
    } catch (error) {
      setError(error.message);
    }
  };

  // * Gmailログイン
  const handleGmailSignin = async () => {
    setError(null)
    try {
      const { error: gmailError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/learnings`,
        },
      });
      if (gmailError) {
        setError(gmailError.message);
        return;
      }
      setMessage('ログインしました。トップページにリダイレクトします。');
    } catch (error) {
      setError(error.message);
    }
  };

  // * GitHubログイン
  const handleGitHubSignin = async () => {
    setError(null);
    try {
      const { error: githubError } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/learnings`
        }
      });
      if (githubError) {
        setError(githubError.message);
        return;
      }
      setMessage('ログインしました。トップページにリダイレクトします。');
    } catch (error) {
      setError(error.message);
    }
  };

  // * サインアウト
  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.reload();
  };

  // * パスワードリセットのメール送信
  const handleSendEmail = async (email) => {
    setError(null);
    try {
      const { error: resetPasswordError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (resetPasswordError) {
        setError(resetPasswordError.message);
        return;
      }
      setMessage('パスワードリセットのリンクがメールに送信されました。');
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    handleSignup,
    handleGmailSignin,
    handleGitHubSignin,
    handleSignin,
    handleSignout,
    handleSendEmail,
    error,
    message
  }
}

export default useAuth