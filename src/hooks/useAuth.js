import React, { useState } from 'react'
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import supabase from '@/lib/supabaesClient';

const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // * サインアップ
  const handleSignup = async (email, password, name) => {
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      router.push('/learnings').then(() => router.reload());
    } catch (error) {
      setError(error.message);
    }
  };

  // * Emailログイン
  const handleSignin = async (email, password) => {
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/signin`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log('data =>', data);
      if (!response.ok) {
        setError(data.error);
        return;
      }
      Cookies.set('access_token', data, { expires: 7 });
      router.push('/learnings').then(() => router.reload());
    } catch (error) {
      setError(error.message);
    }
  };

  // * Gmailログイン
  const handleGmailSignin = async () => {
    setError(null)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/gmail`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      };
      window.location.href = data.url;
    } catch (error) {
      setError(error.message);
    }
  };

  // * GitHubログイン
  const handleGitHubSignin = async () => {
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/github`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      window.location.href = data.url;
    } catch (error) {
      setError(error.message);
    }
  };

  // * サインアウト
  const handleSignout = async () => {
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/signout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        setError(response.error);
        return;
      }
      Cookies.remove('access_token');
      router.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  // * パスワードリセットのメール送信
  const handleSendEmail = async (email) => {
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) {
        setError(error.message);
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