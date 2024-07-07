import { useSession, useUser } from '@supabase/auth-helpers-react';

const useAuthSesseion = () => {
  const session = useSession();
  const user = useUser();

  return {
    session,
    user,
  }
};

export default useAuthSesseion;