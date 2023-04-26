import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Auth } from 'aws-amplify';
import GoogleAuthButton from '../GoogleAuthButton';
import { authStyle } from '../AuthStyle';

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
    <View style={authStyle.container}>
      <Text style={authStyle.textLarge}>Welcome to WatchL</Text>
      <Text style={authStyle.textMedium}>
        Start scheduling what to watch next!
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
      <Pressable style={authStyle.pressableMain} onPress={onSignUp}>
        <Text style={authStyle.pressableMainText}>Sign Up</Text>
      </Pressable>
      <Text style={authStyle.textSmall}>Or sign up with</Text>
      <GoogleAuthButton />
      <Text style={authStyle.textSmall}>Already have an account?</Text>
      <Pressable onPress={() => router.push('/signIn')}>
        <Text style={authStyle.pressableText}>Go to Sign In</Text>
      </Pressable>
    </View>
  );
}
