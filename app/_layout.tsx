import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { StyleSheet, View, Linking, Platform } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsConfig from '../src/aws-exports';
import * as WebBrowser from "expo-web-browser";

const isLocalhost = Boolean(__DEV__);

const [localRedirectSignIn, productionRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(',');

const [localRedirectSignOut, productionRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(',');

const urlOpener = async (url: string, redirectUrl: string) => {
  const result = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if ("url" in result && result.type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(result.url);
  }
}

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

Amplify.configure(updatedAwsConfig);

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
