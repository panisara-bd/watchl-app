import { Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';
import SearchMedia from '../src/media/screens/SearchMedia';
import ConfirmSchedule from '../src/media/screens/ConfirmSchedule';

export default function Header() {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      await Auth.signOut();
      router.push('/signIn');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <>
      <Button title="Sign out" onPress={onSignOut} />
      <ConfirmSchedule />
      <SearchMedia />
    </>
  );
}

