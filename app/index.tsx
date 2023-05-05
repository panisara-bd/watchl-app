import { Text } from 'react-native';
import Header from './header';
import SignIn from '../src/auth/screens/SignIn';
import { useUser } from '../src/auth/UserContext';

export default function Home() {
  const { user } = useUser();
  console.log(user?.signInUserSession?.accessToken?.jwtToken);

  if (user) {
    return (
      <>
        <Header />
        <Text>Helloooo {user.attributes.email}</Text>
      </>
    );
  }
  return <SignIn />;
}
