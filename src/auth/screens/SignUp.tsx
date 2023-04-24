import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Auth } from 'aws-amplify';
import GoogleAuthButton from '../GoogleAuthButton';

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
      alert('Could not sign up');
    }
  };

  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder="username"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry
      />
      <Button title="Sign up" onPress={onSignUp} />
      <Text>
        Already have an account? Go to{' '}
        <Text
          onPress={() => {
            router.push('/signIn');
          }}
        >sign in</Text>
        <GoogleAuthButton />
      </Text>
    </View>
  );
}
