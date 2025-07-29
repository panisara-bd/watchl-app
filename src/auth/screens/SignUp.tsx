import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Auth } from 'aws-amplify';
import GoogleAuthButton from '../GoogleAuthButton';
import { StyledTextInput } from '../../design-system/components/StyledTextInput';
import { StyledButton } from '../../design-system/components/StyledButton';
import { StyledText } from '../../design-system/components/StyledText';
import { CenteredContainer } from '../../design-system/components/CenteredContainer';
import { StyledLink } from '../../design-system/components/StyledLink';
import PasswordField from '../PasswordField';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        autoSignIn: {
          enabled: true,
        },
      });
      router.push({ pathname: '/verification', params: { username } });
    } catch (error) {
      console.error('Sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Could not sign up: ${errorMessage}`);
    }
  };

  return (
    <CenteredContainer>
      <StyledText size="lg">Welcome to WatchL</StyledText>
      <StyledText size="md">Start scheduling what to watch next!</StyledText>
      <StyledTextInput
        autoCapitalize='none'
        onChangeText={setUsername}
        value={username}
        placeholder="username"
      />
      <PasswordField password={password} setPassword={setPassword} />
      <StyledButton text="Sign Up" onPress={onSignUp} />
      <StyledText size="sm">Or sign up with</StyledText>
      <GoogleAuthButton />
      <StyledText size="sm">Already have an account?</StyledText>
      <StyledLink href="/signIn">Go to Sign In</StyledLink>
    </CenteredContainer>
  );
}
