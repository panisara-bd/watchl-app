import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { UserContextProvider } from '../src/auth/UserContext';
import { configureAmplify } from '../src/auth/configureAmplify';

configureAmplify();

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <UserContextProvider>
        <Slot />
      </UserContextProvider>
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
