import { useState } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { useSearchParams } from 'expo-router';
import { Auth } from 'aws-amplify';
import { CenteredContainer } from '../../design-system/components/CenteredContainer';
import { StyledText } from '../../design-system/components/StyledText';
import { StyledTextInput } from '../../design-system/components/StyledTextInput';
import { StyledButton } from '../../design-system/components/StyledButton';

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
    <CenteredContainer>
      <StyledText size="lg">Enter Verification Code</StyledText>
      <StyledTextInput onChangeText={setCode} value={code} placeholder="code" />
      <Pressable onPress={onResubmitCode}>
        <Text style={resendCode.text}>Resend verification code</Text>
      </Pressable>
      <StyledButton onPress={onSubmit} text="Verify" />
    </CenteredContainer>
  );
}

const resendCode = StyleSheet.create({
  text: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#9B59B6',
    alignSelf: 'flex-end',
  },
});
