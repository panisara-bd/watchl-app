import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'expo-router';
import React, { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

type UserContextType = {
  user: any;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
});

export const useUser = () => useContext(UserContext);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const fetchUser = () =>
    Auth.currentAuthenticatedUser()
      .then((result: any) => setUser(result))
      .catch(() => {});
    
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'signIn' || event === 'autoSignIn') {
        router.push('/');
        fetchUser();
      }
      if (event === 'signOut') {
        setUser(null);
      }
      if (event === 'autoSignIn_failure') {
        alert('Failed to sign in');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
