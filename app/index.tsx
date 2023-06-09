import SignIn from '../src/auth/screens/SignIn';
import { useUser } from '../src/auth/UserContext';
import HomeScreen from '../src/HomeScreen';

export default function Home() {
  const { user } = useUser();

  if (user) {
    return <HomeScreen />
  }
  return <SignIn />;
}
