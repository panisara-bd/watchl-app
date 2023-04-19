import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsConfig from '../src/aws-exports';

Amplify.configure(awsConfig);

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
