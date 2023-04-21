import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import SignUp from '../src/auth/screens/SignUp';
import { Auth } from 'aws-amplify';
import Header from './header';
import SearchBar from './search';

const useUser = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((result: any) => setUser(result));
  }, []);
  return user;
};

export default function Home() {
  const user = useUser();

  if (user) {
    return (
      <>
        <Header />
        <Text>Helloooo {user.attributes.email}</Text>
       <SearchBar />
      </>
    );
  }
  return <SignUp />;
}
