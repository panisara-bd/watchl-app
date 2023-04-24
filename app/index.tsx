import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Auth, Hub } from 'aws-amplify';
import Header from './header';
import { useRouter } from 'expo-router';
import SignIn from '../src/auth/screens/SignIn';
import { useUser } from '../src/auth/UserContext';

export default function Home() {
  const { user } = useUser();

  if (user) {
    return (
      <>
        <Header />
        <Text>Helloooo {user.attributes.email}</Text>
      </>
    );
  }
  return <SignIn />;
}
