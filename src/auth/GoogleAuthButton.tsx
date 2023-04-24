import React from 'react';
import { Button } from 'react-native';
import { withOAuth } from 'aws-amplify-react-native';

type Props = {
  googleSignIn: any;
};

function GoogleAuthButton(props: Props) {
  const { googleSignIn } = props;

  return <Button title="Google" onPress={googleSignIn} />;
}

export default withOAuth(GoogleAuthButton);
