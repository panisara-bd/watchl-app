import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import { usePathname, useRouter } from 'expo-router';
import SearchMedia from './media/SearchMedia';
import { StyledText } from './design-system/components/StyledText';
import { colors } from './design-system/colors';
import { MaterialIcons } from '@expo/vector-icons';

const getActiveTab = (pathname: string): 'home' | 'search' => {
  if (pathname === '/') return 'home';
  return 'search';
}

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/signIn' || pathname === '/signUp') {
    return null;
  }

  const onSignOut = async () => {
    try {
      await Auth.signOut();
      router.push('/signIn');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const activeTab = getActiveTab(pathname)

  return (
    <View style={stylesheet.container}>
      <Pressable onPress={() => router.push('/')} style={stylesheet.tab}>
        <MaterialIcons name="home" size={24} color={activeTab==='home' ? colors.white : colors.ash} />
        <StyledText size="sm" style={[stylesheet.tabText, activeTab==='home' ? stylesheet.activeTab : null]}>
          Home
        </StyledText>
      </Pressable>
      <Pressable onPress={() => router.push('/search')} style={stylesheet.tab}>
        <MaterialIcons name="search" size={24} color={activeTab==='search' ? colors.white : colors.ash} />
        <StyledText size="sm" style={[stylesheet.tabText, activeTab==='search' ? stylesheet.activeTab : null]}>
          Search
        </StyledText>
      </Pressable>
      <Pressable onPress={onSignOut} style={stylesheet.tab}>
        <MaterialIcons name="exit-to-app" size={24} color={colors.ash} />
        <StyledText size="sm" style={stylesheet.tabText}>
          Sign out
        </StyledText>
      </Pressable>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: colors.dark,
  },
  tabText: {
    color: colors.ash,
    marginVertical: 4
  },
  tab: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    color: colors.white,
  }
});
