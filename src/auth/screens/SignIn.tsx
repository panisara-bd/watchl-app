import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';
import GoogleAuthButton from '../GoogleAuthButton';
import { StyledText } from '../../design-system/components/StyledText';
import { StyledTextInput } from '../../design-system/components/StyledTextInput';
import { StyledButton } from '../../design-system/components/StyledButton';
import { CenteredContainer } from '../../design-system/components/CenteredContainer';
import { StyledLink } from '../../design-system/components/StyledLink';
import PasswordField from '../PasswordField';

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const onSignIn = async () => {
    try {
      await Auth.signIn(username, password);
      router.push('/');
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Could not sign in: ${errorMessage}`);
    }
  };

  return (
    <CenteredContainer>
      <StyledText size="lg">Hello again!</StyledText>
      <StyledText size="md">
        Welcome back to WatchL, see what's on the scheldule to watch next?
      </StyledText>
      <StyledTextInput
        autoCapitalize="none"
        onChangeText={setUsername}
        value={username}
        placeholder="username"
      />
      <PasswordField password={password} setPassword={setPassword} />
      <StyledButton onPress={onSignIn} text="Sign In" />
      <StyledText size="sm">Or sign in with</StyledText>
      <GoogleAuthButton />
      <StyledText size="sm">Don't have an account?</StyledText>
      <StyledLink href="/signUp">Go to Sign Up</StyledLink>
    </CenteredContainer>
  );
}
