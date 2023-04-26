import { useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';
import GoogleAuthButton from '../GoogleAuthButton';
import { authStyle } from '../AuthStyle';

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    try {
      await Auth.signIn(username, password);
      router.push('/');
    } catch (error) {
      alert('Could not sign in');
    }
  };

  return (
    <View style={authStyle.container}>
      <Text style={authStyle.textLarge}>Hello again!</Text>
      <Text style={authStyle.textMedium}>
        Welcome back to WatchL, see what's on the scheldule to watch next?
      </Text>
      <TextInput
        style={authStyle.input}
        onChangeText={setUsername}
        value={username}
        placeholder="username"
        placeholderTextColor="#8B8B8B"
      />
      <TextInput
        style={authStyle.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        placeholderTextColor="#8B8B8B"
        secureTextEntry
      />
      <Pressable style={authStyle.pressableMain} onPress={onSignIn}>
        <Text style={authStyle.pressableMainText}>Sign In</Text>
      </Pressable>
      <Text style={authStyle.textSmall}>Or sign in with</Text>
      <GoogleAuthButton />
      <Text style={authStyle.textSmall}>Don't have an account?</Text>
      <Pressable onPress={() => router.push('/signUp')}>
        <Text style={authStyle.pressableText}>Go to Sign Up</Text>
      </Pressable>
    </View>
  );
}
