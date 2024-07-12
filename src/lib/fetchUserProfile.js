import React from 'react'

const fetchUserProfile = async (token) => {
  if (!token) {
    throw new Error('Access token is missing');
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Contetn-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    const profileData = await response.json();
    return profileData.profile;
  } catch (error) {
    console.error('Error', error);
  }
}

export default fetchUserProfile