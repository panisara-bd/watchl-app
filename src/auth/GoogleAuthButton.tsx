import React from 'react';
import { Text, Pressable } from 'react-native';
import { withOAuth } from 'aws-amplify-react-native';
import { authStyle } from './AuthStyle';

type Props = {
  googleSignIn: any;
};

function GoogleAuthButton(props: Props) {
  const { googleSignIn } = props;

  return <Pressable style={authStyle.google} onPress={googleSignIn} ><Text style={authStyle.pressableMainText}>Google</Text></Pressable>;
}

export default withOAuth(GoogleAuthButton);
