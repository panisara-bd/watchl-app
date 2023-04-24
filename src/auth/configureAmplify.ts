import { Platform } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsConfig from '../aws-exports';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import 'react-native-gesture-handler';

const isLocalhost = Boolean(__DEV__);

const [productionRedirectSignIn, localRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(',');

const [productionRedirectSignOut, localRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(',');

const urlOpener = async (url: string, redirectUrl: string) => {
  const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

  if ('url' in result && result.type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(result.url);
  }
};

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
    urlOpener,
  },
};

export const configureAmplify = () => Amplify.configure(updatedAwsConfig);
