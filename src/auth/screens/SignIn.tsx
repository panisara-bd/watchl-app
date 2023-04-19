import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { useRouter } from 'expo-router';

export default function SignIn() {
    const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    try {
     await Auth.signIn(username, password);
     router.push('/');
    } catch (error) {
        alert('Could not sign in')
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
