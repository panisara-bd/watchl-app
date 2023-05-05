import {
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet
} from 'react-native';
import { searchMedia } from '../helpers/get-media';
import { useState } from 'react';
import { Link } from 'expo-router';
import { StyledTextInput } from '../../design-system/components/StyledTextInput';
import { useToken } from '../../auth/UserContext';
import { StyledText } from '../../design-system/components/StyledText';

type ItemData = {
  id: string;
  title: string;
  type: string;
  year: string;
};

type ItemProps = {
  item: ItemData;
};

const Item = ({ item }: ItemProps) => (
  <Link href={`/media/${item.id}`} asChild>
    <Pressable style={styles.button}>
      {() => (
        <>
          <StyledText isAlignLeft size="md">{item.title}</StyledText>
          <StyledText isAlignLeft size="sm">
            {item.type} ({item.year})
          </StyledText>
        </>
      )}
    </Pressable>
  </Link>
);

export default function SearchMedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const token = useToken();

  const getResult = async () => {
    try {
      const result = await searchMedia(token, searchQuery);
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
    const timeout = setTimeout(getResult, 500);
    setDebounceTimeout(timeout);
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    return <Item item={item} />;
  };

  return (
    <>
      <StyledTextInput
        isSearchBar
        onChangeText={onSearchChange}
        value={searchQuery}
        placeholder="Search here"
      />
      <SafeAreaView>
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#a1a1a1',
  },
  text: {
    color: '#fff',
  },
});