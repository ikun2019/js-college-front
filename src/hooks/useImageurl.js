import { useEffect } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log('Fetcher Data =>', data);
  return data.newImageUrl;
};

const useImageUrl = (initialUrl) => {
  console.log('useImageUrl');
  const { data: imageUrl, error, mutate } = useSWR(
    initialUrl,
    async (url) => {
      const headResponse = await fetch(url, { method: 'GET' });
      console.log('headResponse =>', headResponse);
      if (headResponse.ok) {
        return url;
      } else {
        const newUrl = await fetcher(`${process.env.process.env.NEXT_PUBLIC_API_CLIENT_URL}/learnings/get-new-image-url`);
        return newUrl;
      }
    },
    {
      refreshInterval: 3600000,
      revalidateOnFocus: false,
    }
  );

  const checkImageExpiry = async () => {
    const response = await fetch(imageUrl, { method: 'GET' });
    if (!response.ok) {
      const newUrl = await fetcher(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/learnings/get-new-image-url`);
      mutate(newUrl, false);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkImageExpiry, 3600000);
    return () => clearInterval(interval);
  }, [imageUrl]);

  return { imageUrl, error };
};

export default useImageUrl;