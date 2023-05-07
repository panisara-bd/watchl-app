import SignIn from '../src/auth/screens/SignIn';
import { useUser } from '../src/auth/UserContext';
import SearchMedia from '../src/media/SearchMedia';

export default function Search() {
  const { user } = useUser();

  if (user) {
    return <SearchMedia />;
  }
  return <SignIn />;
}
