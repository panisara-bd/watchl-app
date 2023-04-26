import { useState } from 'react';
import { StyleSheet, Pressable, Text, TextInput, View } from 'react-native';
import { useSearchParams } from 'expo-router';
import { Auth, Hub } from 'aws-amplify';
import { FontWeight, authStyle } from '../AuthStyle';

export default function VerificationCode() {
  const { username } = useSearchParams();
  const [code, setCode] = useState('');

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
    <View style={authStyle.container}>
      <Text style={authStyle.textLarge}>Enter Verification Code</Text>
      <TextInput
        style={authStyle.input}
        onChangeText={setCode}
        value={code}
        placeholder="code"
        placeholderTextColor="#8B8B8B"
      />
      <Pressable onPress={onResubmitCode}>
        <Text style={resendCode.text}>Resend verification code</Text>
      </Pressable>
      <Pressable style={authStyle.pressableMain} onPress={onSubmit}>
      <Text style={authStyle.pressableMainText}>Verify</Text>
      </Pressable>
    </View>
  );
}

const resendCode = StyleSheet.create({
  text: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#9B59B6',
    alignSelf: 'flex-end',
  }
})