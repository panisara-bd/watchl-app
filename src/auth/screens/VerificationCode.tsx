import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';
import { Auth, Hub } from 'aws-amplify';

export default function VerificationCode() {
  const { username } = useSearchParams();
  const [code, setCode] = useState('');
  const router = useRouter()

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'autoSignIn') {
        router.push('/');
      } else if (event === 'autoSignIn_failure') {
        alert('Failed to auto sign in');
      }
    });
  }, []);

  if (!username || Array.isArray(username)) {
    return null;
  }

  const onSubmit = async () => {
    try {
      const result = await Auth.confirmSignUp(username, code);
      console.log('result onSubmit', { result });
    } catch (e) {
      alert('Invalid code');
    }
  };

  const onResubmitCode = async () => {
    const result = await Auth.resendSignUp(username);
    console.log('result onResubmit', { result });
  };

  return (
    <View>
      <Text>Verify blah blah</Text>
      <TextInput onChangeText={setCode} value={code} placeholder="code" />
      <Button title="Resend verification code" onPress={onResubmitCode} />
      <Button title="Verify" onPress={onSubmit} />
    </View>
  );
}
