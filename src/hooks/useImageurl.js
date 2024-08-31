import { useEffect } from "react";
import useSWR from "swr";

const useImageUrl = (initialUrl) => {
  console.log('useImageUrl');
  const { data: imageUrl, error, mutate } = useSWR(
    initialUrl,
    async (url) => {
      const headResponse = await fetch(url, { method: 'GET' });
      console.log('headResponse =>', headResponse.ok);
      if (headResponse.ok) {
        return url;
      } else {
        const response = await fetch(`${process.env.process.env.NEXT_PUBLIC_API_CLIENT_URL}/learnings/get-new-image-url`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log('new url =>', data.newImageUrl);
        return data.newImageUrl;
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
      const newUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_URL}/learnings/get-new-image-url`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await newUrlResponse.json();
      console.log(data);
      mutate(data.newImageUrl, false);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkImageExpiry, 3600000);
    return () => clearInterval(interval);
  }, [imageUrl]);

  return { imageUrl, error };
};

export default useImageUrl;