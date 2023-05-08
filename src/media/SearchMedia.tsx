import {
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { searchMedia } from './helpers/get-media';
import { useState } from 'react';
import { Link } from 'expo-router';
import { StyledTextInput } from '../design-system/components/StyledTextInput';
import { useToken } from '../auth/UserContext';
import { StyledText } from '../design-system/components/StyledText';
import { Image } from 'expo-image';
import { colors } from '../design-system/colors';

type ItemData = {
  id: string;
  title: string;
  image?: {
    url: string;
  };
  titleType: 'movie' | 'tvSeries';
  year: string;
};

type ItemProps = {
  item: ItemData;
};

const Item = ({ item }: ItemProps) => (
  <Link href={`/media/${item.id}`} asChild>
    <Pressable style={styles.searchListItem}>
      {() => (
        <>
          <Image
            source={item?.image?.url}
            style={{ width: 45, height: 60 }}
            contentFit="scale-down"
          />
          <View style={styles.searchListItemContent}>
            <StyledText size="md" style={styles.searchListItemTitle}>
              {item.title}
            </StyledText>
            <StyledText size="sm" style={styles.searchListItemSubtitle}>
              {item.titleType === 'movie' ? 'Movie' : 'TV Series'}{' '}
              {item.year ? `(${item.year})` : ''}
            </StyledText>
          </View>
        </>
      )}
    </Pressable>
  </Link>
);

export default function SearchMedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ItemData[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const token = useToken();

  const getResult = async (query: string) => {
    try {
      const result = await searchMedia(token, query);
      setSearchResults(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchChange = async (query: string) => {
    setSearchQuery(query);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => getResult(query), 500);
    setDebounceTimeout(timeout);
  };

  return (
    <>
      <StyledTextInput style={styles.searchText}
        isSearchBar
        onChangeText={onSearchChange}
        value={searchQuery}
        placeholder="Search here"
      />

      {searchResults.map(item => (<Item key={item.id} item={item} />))}
    </>
  );
}

const styles = StyleSheet.create({
  searchListItem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    color: colors.darker
  },
  searchListItemContent: {
    marginLeft: 10,
  },
  searchListItemTitle: {
    fontWeight: '700',
    marginVertical: 0,
    textAlign: 'left',
    color: colors.white,
  },
  searchListItemSubtitle: {
    marginVertical: 0,
    textAlign: 'left',
    color: colors.ash,
  },
});
