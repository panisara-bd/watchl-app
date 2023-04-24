import React from 'react';
import { Button, Text, View } from 'react-native';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react-native';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

type Props = {
  googleSignIn: any;
};

function GoogleAuthButton(props: Props) {
  const { googleSignIn } = props;

  return <Button title="Google" onPress={googleSignIn} />;
}

export default withOAuth(GoogleAuthButton);
