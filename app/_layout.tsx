import { StatusBar } from 'expo-status-bar';
import { Slot, Tabs } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import { UserContextProvider } from '../src/auth/UserContext';
import { configureAmplify } from '../src/auth/configureAmplify';
import { colors } from '../src/design-system/colors';
import Footer from '../src/Footer';

configureAmplify();

export default function MainLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <UserContextProvider>
        <ScrollView style={styles.content}>
          <Slot />
        </ScrollView>
        <Footer />
      </UserContextProvider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darker,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
});
