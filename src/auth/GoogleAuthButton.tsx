import React from 'react';
import { withOAuth } from 'aws-amplify-react-native';
import { StyledButton } from '../design-system/components/StyledButton';

type Props = {
  googleSignIn: any;
};

function GoogleAuthButton(props: Props) {
  const { googleSignIn } = props;

  return <StyledButton isGoogle text="Google" onPress={googleSignIn} />;
}

export default withOAuth(GoogleAuthButton);
